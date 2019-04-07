package com.github.godnsheeps.mychat.web.handler;

import com.github.godnsheeps.mychat.MyChatServerApplication;
import com.github.godnsheeps.mychat.config.props.OAuthConfigProps;
import com.github.godnsheeps.mychat.domain.User;
import com.github.godnsheeps.mychat.domain.UserRepository;
import com.google.common.collect.ImmutableMap;
import com.google.common.collect.Maps;
import io.jsonwebtoken.Jwts;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;
import reactor.util.Logger;
import reactor.util.Loggers;

import java.util.Date;
import java.util.HashMap;

/**
 * @author jcooky
 */
@Component
public class OpenAuthHandler {
    private static final Logger log = Loggers.getLogger(OpenAuthHandler.class);

    private WebClient webClient = WebClient.builder()
            .baseUrl("https://github.com")
            .defaultHeader("Accept", MediaType.APPLICATION_JSON_VALUE)
            .build();

    private WebClient githubRest = WebClient.builder()
            .baseUrl("https://api.github.com")
            .defaultHeader("Accept", "application/vnd.github.v3+json")
            .build();

    private OAuthConfigProps configProps;
    private UserRepository userRepository;

    @Autowired
    public OpenAuthHandler(OAuthConfigProps configProps, UserRepository userRepository) {
        this.configProps = configProps;
        this.userRepository = userRepository;
    }

    public Mono<ServerResponse> getAccessTokenForGithub(ServerRequest request) {
        val code = request.queryParam("code").orElseThrow();
        val clientId = configProps.getGithub().getClientId();
        val clientSecret = configProps.getGithub().getClientSecret();

        Mono<HashMap> result = webClient.post()
                .uri("/login/oauth/access_token")
                .body(BodyInserters.fromFormData("client_id", clientId)
                        .with("client_secret", clientSecret)
                        .with("code", code))
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .flatMap(r -> r.bodyToMono(HashMap.class))
                .map(t -> (String)t.get("access_token"))
                .zipWhen(accessToken -> githubRest.get()
                        .uri("/user?access_token={accessToken}", accessToken)
                        .exchange()
                        .flatMap(r -> r.bodyToMono(HashMap.class))
                        .flatMap(t1 -> {
                            var id = (Integer)t1.get("id");
                            return userRepository.findByGithubId(id)
                                    .switchIfEmpty(userRepository.save(User.builder()
                                            .githubId(id)
                                            .name((String)t1.get("login"))
                                            .build()));
                        })
                        .log(log)
                        .map(user -> Jwts.builder()
                                .setId(user.getId())
                                .setIssuedAt(new Date())
                                .signWith(MyChatServerApplication.SECRET_KEY)
                                .compact()))
                .map(t -> ImmutableMap.of("token", t.getT2(), "access_token", t.getT1()))
                .map(Maps::newHashMap);

        return ServerResponse.ok().body(result, HashMap.class);
    }
}
