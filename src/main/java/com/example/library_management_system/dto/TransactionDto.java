package com.example.library_management_system.dto;

import java.time.LocalDateTime;

public class TransactionDto {
    private Long id;
    private Long userId;
    private String userEmail;
    private Long bookId;
    private String bookTitle;
    private String bookAuthor;
    private String bookIsbn;
    private LocalDateTime checkoutDate;
    private LocalDateTime dueDate;
    private LocalDateTime returnDate;
    private String status;

    // Constructors
    public TransactionDto() {}

    public TransactionDto(Long id, Long userId, String userEmail, Long bookId, String bookTitle, String bookAuthor, String bookIsbn, LocalDateTime checkoutDate, LocalDateTime dueDate, LocalDateTime returnDate, String status) {
        this.id = id;
        this.userId = userId;
        this.userEmail = userEmail;
        this.bookId = bookId;
        this.bookTitle = bookTitle;
        this.bookAuthor = bookAuthor;
        this.bookIsbn = bookIsbn;
        this.checkoutDate = checkoutDate;
        this.dueDate = dueDate;
        this.returnDate = returnDate;
        this.status = status;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    public String getBookTitle() {
        return bookTitle;
    }

    public void setBookTitle(String bookTitle) {
        this.bookTitle = bookTitle;
    }

    public String getBookAuthor() {
        return bookAuthor;
    }

    public void setBookAuthor(String bookAuthor) {
        this.bookAuthor = bookAuthor;
    }

    public String getBookIsbn() {
        return bookIsbn;
    }

    public void setBookIsbn(String bookIsbn) {
        this.bookIsbn = bookIsbn;
    }

    public LocalDateTime getCheckoutDate() {
        return checkoutDate;
    }

    public void setCheckoutDate(LocalDateTime checkoutDate) {
        this.checkoutDate = checkoutDate;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }

    public LocalDateTime getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(LocalDateTime returnDate) {
        this.returnDate = returnDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // Builder Pattern
    public static TransactionDtoBuilder builder() {
        return new TransactionDtoBuilder();
    }

    public static class TransactionDtoBuilder {
        private Long id;
        private Long userId;
        private String userEmail;
        private Long bookId;
        private String bookTitle;
        private String bookAuthor;
        private String bookIsbn;
        private LocalDateTime checkoutDate;
        private LocalDateTime dueDate;
        private LocalDateTime returnDate;
        private String status;

        public TransactionDtoBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public TransactionDtoBuilder userId(Long userId) {
            this.userId = userId;
            return this;
        }

        public TransactionDtoBuilder userEmail(String userEmail) {
            this.userEmail = userEmail;
            return this;
        }

        public TransactionDtoBuilder bookId(Long bookId) {
            this.bookId = bookId;
            return this;
        }

        public TransactionDtoBuilder bookTitle(String bookTitle) {
            this.bookTitle = bookTitle;
            return this;
        }

        public TransactionDtoBuilder bookAuthor(String bookAuthor) {
            this.bookAuthor = bookAuthor;
            return this;
        }

        public TransactionDtoBuilder bookIsbn(String bookIsbn) {
            this.bookIsbn = bookIsbn;
            return this;
        }

        public TransactionDtoBuilder checkoutDate(LocalDateTime checkoutDate) {
            this.checkoutDate = checkoutDate;
            return this;
        }

        public TransactionDtoBuilder dueDate(LocalDateTime dueDate) {
            this.dueDate = dueDate;
            return this;
        }

        public TransactionDtoBuilder returnDate(LocalDateTime returnDate) {
            this.returnDate = returnDate;
            return this;
        }

        public TransactionDtoBuilder status(String status) {
            this.status = status;
            return this;
        }

        public TransactionDto build() {
            return new TransactionDto(id, userId, userEmail, bookId, bookTitle, bookAuthor, bookIsbn, checkoutDate, dueDate, returnDate, status);
        }
    }
}
