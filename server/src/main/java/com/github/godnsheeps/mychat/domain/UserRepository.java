package com.github.godnsheeps.mychat.domain;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

/**
 * @author jcooky
 */
public interface UserRepository extends ReactiveMongoRepository<User, String> {
}
