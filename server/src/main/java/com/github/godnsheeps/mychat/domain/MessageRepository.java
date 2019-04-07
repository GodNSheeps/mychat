package com.github.godnsheeps.mychat.domain;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;

/**
 * @author jcooky
 */
public interface MessageRepository extends ReactiveMongoRepository<Message, String> {
    Flux<Message> findByChat(Chat chat);
}
