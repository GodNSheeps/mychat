package com.github.godnsheeps.mychat.domain;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Data
@Builder
public class Mention {

    @DBRef
    private User user;

    private boolean isRead;

    public void read() {
        isRead = true;
    }
}
