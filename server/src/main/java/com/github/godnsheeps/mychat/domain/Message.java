package com.github.godnsheeps.mychat.domain;

import com.mongodb.lang.Nullable;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

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

    private Long timestamp = System.currentTimeMillis();

    @DBRef
    private Chat chat;

    private List<Content> contents;
}
