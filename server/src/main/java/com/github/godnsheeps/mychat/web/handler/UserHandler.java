package com.github.godnsheeps.mychat.web.handler;

import com.github.godnsheeps.mychat.domain.MessageRepository;
import com.github.godnsheeps.mychat.domain.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

@Component
public class UserHandler {

    private UserRepository userRepository;
    private MessageRepository messageRepository;

    @Autowired
    public UserHandler(UserRepository userRepository, MessageRepository messageRepository) {
        this.userRepository = userRepository;
        this.messageRepository = messageRepository;
    }

    public Mono<ServerResponse> getUser(ServerRequest request) {
        var id = request.pathVariable("id");

        return userRepository.findById(id)
                .flatMap(user -> ServerResponse.ok().syncBody(user))
                .switchIfEmpty(ServerResponse.notFound().build())
                .onErrorResume(IllegalArgumentException.class, e -> {
                    return ServerResponse.status(HttpStatus.INTERNAL_SERVER_ERROR).syncBody(e.getMessage());
                });
    }

//    public Mono<ServerResponse> getChatsByUser(ServerRequest req) {
//        val id = req.pathVariable("id");
//    }
}
