package com.github.godnsheeps.mychat.web.handler;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.godnsheeps.mychat.domain.UserRepository;
import com.github.godnsheeps.mychat.util.Functions;
import com.mongodb.connection.Server;
import lombok.Builder;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.util.Logger;
import reactor.util.Loggers;


@Component
public class MentionableUsersHandler {
    private static Logger log = Loggers.getLogger(MentionableUsersHandler.class);
    private UserRepository userRepository;
    private ObjectMapper objectMapper;

    @Autowired
    public MentionableUsersHandler(ObjectMapper objectMapper, UserRepository userRepository){
        this.userRepository = userRepository;
        this.objectMapper = objectMapper;
    }

    public Mono<ServerResponse> getMentionableUsers(ServerRequest request) {
        var keyword = request.queryParam("keyword");
        var page = request.queryParam("page");

        return userRepository.findTop5ByNameStartingWith(keyword.orElse(""), PageRequest.of(Integer.parseInt(page.orElse("0")), 4))
                .map(user -> MentionableUserResponsePayload.builder().name(user.getName()).build())
                .collectList()
                .flatMap(Functions.wrapError(response -> ServerResponse.ok().syncBody(objectMapper.writeValueAsString(response))))
                .switchIfEmpty(ServerResponse.ok().syncBody("{}"))
                .onErrorResume(IllegalArgumentException.class, e -> ServerResponse.status(HttpStatus.INTERNAL_SERVER_ERROR).syncBody(e.getMessage()));
    }

    public Mono<ServerResponse> checkMentionableKeyword(ServerRequest request){
        return request.bodyToMono(MentionableUsersHandler.checkMentionableKeywordRequestPayload.class)
                .flatMap(r -> userRepository.findByName(r.keyword))
                .map(user -> checkMentionableKeywordResponsePayload.builder().iseffective(true).build())
                .switchIfEmpty(Mono.just(MentionableUsersHandler.checkMentionableKeywordResponsePayload.builder().iseffective(false).build()))
                .flatMap(Functions.wrapError(response -> ServerResponse.ok().syncBody(objectMapper.writeValueAsString(response))))
                .onErrorResume(IllegalArgumentException.class, e-> ServerResponse.status(HttpStatus.INTERNAL_SERVER_ERROR).syncBody(e.getMessage()));
    }

    @Data
    @Builder
    public static class MentionableUserResponsePayload{
        String name;
    }

    @Data
    public static class checkMentionableKeywordRequestPayload{
        String keyword;
    }

    @Data
    @Builder
    public static class checkMentionableKeywordResponsePayload{
        boolean iseffective;
    }

}
