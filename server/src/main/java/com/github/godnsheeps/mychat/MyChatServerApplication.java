package com.github.godnsheeps.mychat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.web.reactive.function.server.RouterFunctions.route;

@SpringBootApplication
public class MyChatServerApplication {
    @Bean
    public RouterFunction<ServerResponse> routes() {
        return route()
                .GET("/", (req) -> ServerResponse.ok().render("index"))
                .build();
    }

    public static void main(String[] args) {
        SpringApplication.run(MyChatServerApplication.class, args);
    }
}
