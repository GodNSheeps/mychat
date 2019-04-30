package com.github.godnsheeps.mychat.domain;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.awt.print.Pageable;

/**
 * @author jcooky
 */
public interface UserRepository extends ReactiveMongoRepository<User, String> {
    Mono<User> findByGithubId(Integer githubId);
    Mono<User> findByName(String name);
    Flux<User> findTop5ByNameStartingWith(String keyword, PageRequest pageable);

}
