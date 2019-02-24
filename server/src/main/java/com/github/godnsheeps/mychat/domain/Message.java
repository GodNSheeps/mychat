package com.github.godnsheeps.mychat.domain;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @author jcooky
 */
@Document
@Data
@Builder
public class Message {
    @Id
    private String id;

    @DBRef
    private User from;

    private String text;
    private Long timestamp = System.currentTimeMillis();

    @DBRef
    private Chat chat;
}
