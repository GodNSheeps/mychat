package com.github.godnsheeps.mychat.domain;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
@Builder
public class Mention {
    @Id
    private String id;

    @DBRef
    private User user;

    @DBRef
    private Message message;

    private boolean isRead;

    public void read() {
        isRead = true;
    }
}
