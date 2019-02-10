package com.github.godnsheeps.mychat.domain;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @author jcooky
 */
@Document
@Data
public class User {
    private String id;

    private String email;
}
