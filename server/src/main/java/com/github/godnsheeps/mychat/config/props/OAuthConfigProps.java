package com.github.godnsheeps.mychat.config.props;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * @author jcooky
 */
@Component
@ConfigurationProperties(prefix = "mychat.oauth")
public class OAuthConfigProps {
    private Github github;

    public Github getGithub() {
        return github;
    }

    public OAuthConfigProps setGithub(Github github) {
        this.github = github;
        return this;
    }

    public static class Github {
        private String clientId, clientSecret;

        public String getClientId() {
            return clientId;
        }

        public Github setClientId(String clientId) {
            this.clientId = clientId;
            return this;
        }

        public String getClientSecret() {
            return clientSecret;
        }

        public Github setClientSecret(String clientSecret) {
            this.clientSecret = clientSecret;
            return this;
        }
    }
}
