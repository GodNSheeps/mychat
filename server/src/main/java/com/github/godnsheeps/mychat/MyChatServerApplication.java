package com.github.godnsheeps.mychat;

import com.github.godnsheeps.mychat.domain.Chat;
import com.github.godnsheeps.mychat.domain.ChatRepository;
import com.github.godnsheeps.mychat.web.handler.ChatWebSocketHandler;
import com.github.godnsheeps.mychat.web.handler.MentionHandler;
import com.github.godnsheeps.mychat.web.handler.OpenAuthHandler;
import com.github.godnsheeps.mychat.web.handler.UserHandler;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.HandlerMapping;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.web.reactive.handler.SimpleUrlHandlerMapping;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.server.support.WebSocketHandlerAdapter;
import reactor.core.publisher.Mono;

import java.security.Key;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.web.reactive.function.server.RouterFunctions.route;

@SpringBootApplication
public class MyChatServerApplication implements CommandLineRunner {
    public static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public static String rootChatId;
    private ChatRepository chatRepository;

    @Autowired
    public MyChatServerApplication(ChatRepository chatRepository) {
        this.chatRepository = chatRepository;
    }

    @Bean
    public RouterFunction<ServerResponse> routes(OpenAuthHandler openAuthHandler, UserHandler userHandler, MentionHandler mentionHandler) {
        return route()
                .GET("/", (req) -> ServerResponse.ok().render("index"))
//                .GET("/users/{id}/chats", userHandler::getChatsByUser)
                .GET("/oauth/github/access-token", openAuthHandler::getAccessTokenForGithub)
                .GET("/mentions", mentionHandler::getMention)
                .PUT("/mentions", mentionHandler::readMention)
                .POST("/mentions", mentionHandler::createMention)
                .build();
    }

    @Bean
    public HandlerMapping webSocketMapping(ChatWebSocketHandler chatWebSocketHandler) {
        Map<String, WebSocketHandler> map = new HashMap<>();
        map.put("/chat", chatWebSocketHandler);

        SimpleUrlHandlerMapping mapping = new SimpleUrlHandlerMapping();
        mapping.setUrlMap(map);
        mapping.setOrder(-1);
        return mapping;
    }

    @Bean
    public WebSocketHandlerAdapter handlerAdapter() {
        return new WebSocketHandlerAdapter();
    }

    @Override
    public void run(String... args) throws Exception {
        rootChatId = chatRepository.findAll()
                .singleOrEmpty()
                .switchIfEmpty(Mono.defer(() -> chatRepository.save(new Chat())))
                .blockOptional()
                .orElseThrow()
                .getId();
    }

    public static void main(String[] args) {
        SpringApplication.run(MyChatServerApplication.class, args);
    }

}
