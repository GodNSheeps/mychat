package com.github.godnsheeps.mychat;

import com.github.godnsheeps.mychat.web.handler.ChatWebSocketHandler;
import com.github.godnsheeps.mychat.web.handler.OpenAuthHandler;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.HandlerMapping;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.web.reactive.handler.SimpleUrlHandlerMapping;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.server.support.WebSocketHandlerAdapter;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.web.reactive.function.server.RouterFunctions.route;

@SpringBootApplication
public class MyChatServerApplication {

    @Bean
    public RouterFunction<ServerResponse> routes(OpenAuthHandler openAuthHandler) {
        return route()
                .GET("/", (req) -> ServerResponse.ok().render("index"))
                .GET("/user/{id}", openAuthHandler::getUser)
                .GET("/oauth/github/access-token", openAuthHandler::getAccessTokenForGithub)
                .build();
    }

    @Bean
    public HandlerMapping webSocketMapping() {
        Map<String, WebSocketHandler> map = new HashMap<>();
        map.put("/chat", new ChatWebSocketHandler());

        SimpleUrlHandlerMapping mapping = new SimpleUrlHandlerMapping();
        mapping.setUrlMap(map);
        mapping.setOrder(-1);
        return mapping;
    }

    @Bean
    public WebSocketHandlerAdapter handlerAdapter() {
        return new WebSocketHandlerAdapter();
    }

    public static void main(String[] args) {
        SpringApplication.run(MyChatServerApplication.class, args);
    }
}
