package com.github.godnsheeps.mychat.web.handler;

import com.github.godnsheeps.mychat.config.props.OAuthConfigProps;
import com.github.godnsheeps.mychat.domain.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import java.util.HashMap;

/**
 * @author jcooky
 */
@Component
public class OpenAuthHandler {

    private WebClient webClient = WebClient.builder()
            .baseUrl("https://github.com")
            .defaultHeader("Accept", MediaType.APPLICATION_JSON_VALUE)
            .build();
    private OAuthConfigProps configProps;
    private UserRepository userRepository;

    @Autowired
    public OpenAuthHandler(OAuthConfigProps configProps, UserRepository userRepository) {
        this.configProps = configProps;
        this.userRepository = userRepository;
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

    public Mono<ServerResponse> getAccessTokenForGithub(ServerRequest request) {
        String code = request.queryParam("code").orElseThrow();
        String clientId = configProps.getGithub().getClientId();
        String clientSecret = configProps.getGithub().getClientSecret();

        var result = webClient.post()
                .uri("/login/oauth/access_token")
                .body(BodyInserters.fromFormData("client_id", clientId)
                        .with("client_secret", clientSecret)
                        .with("code", code))
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .flatMap(r -> r.bodyToMono(HashMap.class));

        return ServerResponse.ok().body(result, HashMap.class);
    }
}
