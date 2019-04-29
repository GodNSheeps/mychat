package com.github.godnsheeps.mychat.domain;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;

public interface MentionRepository extends ReactiveMongoRepository<Mention, String> {
    Flux<Mention> findAllByUserAndIsReadIsFalse(User user);
}
