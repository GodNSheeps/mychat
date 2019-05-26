package com.github.godnsheeps.mychat.domain;

import com.mongodb.lang.Nullable;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
@Builder
public class Content {

    @Id
    private String id;

    private boolean isUser;

    @DBRef
    @Nullable
    private User user;

    @Nullable
    private String text;

}
