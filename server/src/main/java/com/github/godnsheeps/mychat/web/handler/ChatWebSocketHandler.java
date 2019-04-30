package com.github.godnsheeps.mychat.web.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.godnsheeps.mychat.MyChatServerApplication;
import com.github.godnsheeps.mychat.domain.*;
import com.github.godnsheeps.mychat.util.Functions;
import com.github.godnsheeps.mychat.util.StreamUtils;
import io.jsonwebtoken.Jwts;
import lombok.Builder;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketSession;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.util.Logger;
import reactor.util.Loggers;

import java.util.*;
import java.util.regex.*;
import java.util.stream.Stream;

/**
 * ChatWebSocketHandler
 *
 * @author jcooky
 * @since 2019-01-27
 */
@Component
public class ChatWebSocketHandler implements WebSocketHandler {
    private static Logger log = Loggers.getLogger(ChatWebSocketHandler.class);

    private List<WebSocketSession> sessions = Collections.synchronizedList(new ArrayList<>());

    private ObjectMapper objectMapper;
    private MessageRepository messageRepository;
    private ChatRepository chatRepository;
    private UserRepository userRepository;
    private ContentRepository contentRepository;

    private String mentionRegex = "\\B@([\\S]+)";
    private Pattern pattern = Pattern.compile(mentionRegex);

    @Autowired
    public ChatWebSocketHandler(ObjectMapper objectMapper,
                                MessageRepository messageRepository,
                                ChatRepository chatRepository,
                                UserRepository userRepository,
                                ContentRepository contentRepository) {
        this.objectMapper = objectMapper;
        this.messageRepository = messageRepository;
        this.chatRepository = chatRepository;
        this.userRepository = userRepository;
        this.contentRepository = contentRepository;
    }

    @Override
    public Mono<Void> handle(WebSocketSession session) {
        sessions.add(session);

        log.trace("sessions: {}", sessions.size());

        return session.send(
                chatRepository.findById(MyChatServerApplication.rootChatId)
                        .flux()
                        .flatMap(chat -> messageRepository.findByChat(chat))
                        .flatMap(message -> Flux.fromIterable(message.getContents())
                                .map(content ->
                                        ResponseContent.builder()
                                                .isUser(content.isUser())
                                                .text(content.isUser() ? content.getUser().getName() : content.getText())
                                                .build())
                                .collectList()
                                .map(content ->
                                        ResponsePayload.builder()
                                                .username(message.getFrom().getName())
                                                .contents(content)
                                                .build())
                                .single())
                        .map(Functions.wrapError(objectMapper::writeValueAsString))
                        .map(session::textMessage))
                .then(session
                        .receive()
                        .doOnComplete(() -> {
                            sessions.remove(session);
                        })
                        .map(Functions.wrapError(m -> objectMapper.readValue(m.getPayloadAsText(), RequestPayload.class)))
                        .flatMap(payload -> {
                            var userId = Jwts.parser().setSigningKey(MyChatServerApplication.SECRET_KEY)
                                    .parseClaimsJws(payload.fromToken)
                                    .getBody().getId();
                            return Mono.zip(userRepository.findById(userId),
                                    chatRepository.findById(MyChatServerApplication.rootChatId),
                                    Mono.just(payload));
                        })
                        .flatMap(t -> {
                            var message = t.getT3().message;
                            var m = pattern.matcher(message);
                            var messageBuilder = Message.builder()
                                    .chat(t.getT2())
                                    .from(t.getT1());
                            var tokens = message.split(mentionRegex);

                            Stream<String> regexMatched = m.results().map(MatchResult::group);
                            Stream<String> regexNotMatched = Arrays.stream(tokens);
                            Stream<String> result = StreamUtils.zip(regexMatched, regexNotMatched,
                                    (name, token) -> {
                                        if (token.length() == 0) return Stream.of(name);
                                        else return Stream.of(token, name);
                                    },
                                    (name) -> Stream.of(name),
                                    (token) -> Stream.of(token)
                                    ).flatMap(s -> s);

                            return Flux.fromStream(result)
                                .flatMapSequential(text -> {
                                    if (text.startsWith("@")) {
                                        return userRepository.findByName(text.substring(1))
                                                .map(user -> Content.builder().isUser(true).user(user).build())
                                                .switchIfEmpty(Mono.defer(() -> Mono.just(Content.builder().text(text).build())))
                                                .flatMap(content -> contentRepository.save(content));
                                    }
                                    return contentRepository.save(Content.builder().text(text).build());
                                })
                                .collectList()
                                .map(contentList -> messageBuilder.contents(contentList).build());
                        })
                        .flatMap(message -> messageRepository.save(message))
                        .flatMap(t -> Flux.fromIterable(t.getContents())
                                            .map(content ->
                                                ResponseContent.builder()
                                                    .isUser(content.isUser())
                                                    .text(content.isUser() ? content.getUser().getName() : content.getText())
                                                    .build())
                                            .collectList()
                                            .map(content ->
                                                    ResponsePayload.builder()
                                                    .username(t.getFrom().getName())
                                                    .contents(content)
                                                    .build())
                        )
                        .map(Functions.wrapError(objectMapper::writeValueAsString))
                        .flatMap(m -> Flux.fromStream(sessions.stream())
                                .flatMap(s -> {
                                       return s.send(Mono.just(s.textMessage(m)));
                                }))
                        .log(log)
                        .collectList()
                )
                .then();
    }

    @Data
    public static class RequestPayload {
        String fromToken;
        String message;
    }

    @Data
    @Builder
    public static class ResponsePayload {
        String username;
        List<ResponseContent> contents;
    }

    @Data
    @Builder
    public static class ResponseContent {
        boolean isUser;
        String text;
    }
}
