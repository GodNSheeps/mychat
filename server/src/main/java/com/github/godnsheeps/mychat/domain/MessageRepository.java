package com.github.godnsheeps.mychat.domain;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

/**
 * @author jcooky
 */
public interface MessageRepository extends ReactiveMongoRepository<Message, String> {
}
