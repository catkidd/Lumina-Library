package com.example.library_management_system.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "refresh_tokens")
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(nullable = false, unique = true, length = 512)
    private String token;

    @Column(name = "expires_at", nullable = false)
    private LocalDateTime expiresAt;

    // Default Constructor
    public RefreshToken() {}

    // All Arguments Constructor
    public RefreshToken(Long id, User user, String token, LocalDateTime expiresAt) {
        this.id = id;
        this.user = user;
        this.token = token;
        this.expiresAt = expiresAt;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(LocalDateTime expiresAt) {
        this.expiresAt = expiresAt;
    }

    // Builder Pattern
    public static RefreshTokenBuilder builder() {
        return new RefreshTokenBuilder();
    }

    public static class RefreshTokenBuilder {
        private Long id;
        private User user;
        private String token;
        private LocalDateTime expiresAt;

        public RefreshTokenBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public RefreshTokenBuilder user(User user) {
            this.user = user;
            return this;
        }

        public RefreshTokenBuilder token(String token) {
            this.token = token;
            return this;
        }

        public RefreshTokenBuilder expiresAt(LocalDateTime expiresAt) {
            this.expiresAt = expiresAt;
            return this;
        }

        public RefreshToken build() {
            return new RefreshToken(id, user, token, expiresAt);
        }
    }
}
