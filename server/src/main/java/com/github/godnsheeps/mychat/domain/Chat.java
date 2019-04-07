package com.github.godnsheeps.mychat.domain;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @author jcooky
 */
@Document
@Data
public class Chat {
    @Id
    private String id;
}
