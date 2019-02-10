package com.github.godnsheeps.mychat.web.handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.WebSocketSession;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.util.Logger;
import reactor.util.Loggers;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * ChatWebSocketHandler
 *
 * @author jcooky
 * @since 2019-01-27
 */
@Slf4j
public class ChatWebSocketHandler implements WebSocketHandler {
    private List<WebSocketSession> sessions = Collections.synchronizedList(new ArrayList<>());

    @Override
    public Mono<Void> handle(WebSocketSession session) {
        sessions.add(session);

        log.trace("sessions: {}", sessions.size());

        return session.receive()
                .doOnComplete(() -> {
                    sessions.remove(session);
                })
                .map(WebSocketMessage::getPayloadAsText)
                .flatMap(m -> Flux.fromStream(sessions.stream())
                        .flatMap(s -> s.send(Mono.just(s.textMessage(m)))))
                .collectList()
                .then();
    }
}
