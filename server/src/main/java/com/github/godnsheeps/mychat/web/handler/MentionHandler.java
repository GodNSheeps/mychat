package com.github.godnsheeps.mychat.web.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.godnsheeps.mychat.MyChatServerApplication;
import com.github.godnsheeps.mychat.domain.Mention;
import com.github.godnsheeps.mychat.domain.MentionRepository;
import com.github.godnsheeps.mychat.domain.MessageRepository;
import com.github.godnsheeps.mychat.domain.UserRepository;
import com.github.godnsheeps.mychat.util.Functions;
import com.google.common.collect.ImmutableMap;
import io.jsonwebtoken.Jwts;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@Component
public class MentionHandler {

    ObjectMapper objectMapper;
    MentionRepository mentionRepository;
    UserRepository userRepository;
    MessageRepository messageRepository;

    @Autowired
    public MentionHandler(ObjectMapper objectMapper, MentionRepository mentionRepository, UserRepository userRepository, MessageRepository messageRepository) {
        this.objectMapper = objectMapper;
        this.mentionRepository = mentionRepository;
        this.userRepository = userRepository;
        this.messageRepository = messageRepository;
    }

    public Mono<ServerResponse> getMention(ServerRequest request) {
        var userId = request.queryParam("token")
                .map(fromToken -> Jwts.parser().setSigningKey(MyChatServerApplication.SECRET_KEY)
                        .parseClaimsJws(fromToken)
                        .getBody().getId())
                .orElseThrow();

        return userRepository.findById(userId)
                .flatMap(user -> mentionRepository.findAllByUserAndIsReadIsFalse(user)
                        .flatMap(mention ->
                                Flux.zip(Flux.just(mention.getId()), Flux.just(mention.getMessage().getFrom().getName()), Flux.just(mention.getMessage().getId()), Flux.just(mention.getUser().getId())))
                        .map(t -> ImmutableMap.of("id", t.getT1(), "from", t.getT2(), "messageId", t.getT3(), "userId", t.getT4()))
                        .collectList()
                )
                .flatMap(t -> ServerResponse.ok().syncBody(t))
                .switchIfEmpty(ServerResponse.noContent().build())
                .onErrorResume(IllegalArgumentException.class, e -> {
                    return ServerResponse.status(HttpStatus.INTERNAL_SERVER_ERROR).syncBody(e.getMessage());
                });
    }

    public Mono<ServerResponse> createMention(ServerRequest request) {
        var userId = request.queryParam("token")
                .map(fromToken -> Jwts.parser().setSigningKey(MyChatServerApplication.SECRET_KEY)
                        .parseClaimsJws(fromToken)
                        .getBody().getId())
                .orElseThrow();

        return userRepository.findById(userId)
                .flatMap(user -> messageRepository.findAllById(List.of("5ca9aa5d9fa1a570ace64a3f", "5ca9a9ea9fa1a570ace64a3c", "5c8e0bc05eb70d9bcfa8be9f"))
                        .flatMap(message -> mentionRepository.save(Mention.builder().user(user).message(message).build()))
                        .collectList())
                .flatMap(mention -> ServerResponse.ok().syncBody(mention))
                .switchIfEmpty(ServerResponse.notFound().build())
                .onErrorResume(IllegalArgumentException.class,
                        e -> ServerResponse.status(HttpStatus.INTERNAL_SERVER_ERROR).syncBody(e.getMessage()));
    }

    public Mono<ServerResponse> readMention(ServerRequest request) {
        return request.bodyToMono(ReadMentionPayload.class)
                .flatMap(mentionPayload -> {
                            String token = mentionPayload.getToken();
                            String userId = Jwts.parser().setSigningKey(MyChatServerApplication.SECRET_KEY)
                                    .parseClaimsJws(token)
                                    .getBody().getId();
                            return userRepository.findById(userId)
                                    .flatMap(user -> mentionRepository.findById(mentionPayload.getMentionId()));
                        }
                ).flatMap(mention -> {
                    mention.read();
                    return mentionRepository.save(mention);
                }).flatMap(mention -> ServerResponse.ok().syncBody(mention))
                .switchIfEmpty(ServerResponse.notFound().build())
                .log();
    }

    @Data
    public static class ReadMentionPayload {
        String token;
        String mentionId;
    }
}
