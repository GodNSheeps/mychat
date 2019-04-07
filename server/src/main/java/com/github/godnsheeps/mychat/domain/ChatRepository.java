package com.github.godnsheeps.mychat.domain;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

/**
 * @author jcooky
 */
public interface ChatRepository extends ReactiveMongoRepository<Chat, String> {
}
