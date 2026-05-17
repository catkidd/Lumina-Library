package com.example.library_management_system.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "borrowing_transactions")
public class BorrowingTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    @Column(name = "checkout_date", nullable = false)
    private LocalDateTime checkoutDate;

    @Column(name = "due_date", nullable = false)
    private LocalDateTime dueDate;

    @Column(name = "return_date")
    private LocalDateTime returnDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransactionStatus status;

    // Default Constructor
    public BorrowingTransaction() {}

    // All Arguments Constructor
    public BorrowingTransaction(Long id, User user, Book book, LocalDateTime checkoutDate, LocalDateTime dueDate, LocalDateTime returnDate, TransactionStatus status) {
        this.id = id;
        this.user = user;
        this.book = book;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
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

    public TransactionStatus getStatus() {
        return status;
    }

    public void setStatus(TransactionStatus status) {
        this.status = status;
    }

    // Builder Pattern
    public static BorrowingTransactionBuilder builder() {
        return new BorrowingTransactionBuilder();
    }

    public static class BorrowingTransactionBuilder {
        private Long id;
        private User user;
        private Book book;
        private LocalDateTime checkoutDate;
        private LocalDateTime dueDate;
        private LocalDateTime returnDate;
        private TransactionStatus status;

        public BorrowingTransactionBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public BorrowingTransactionBuilder user(User user) {
            this.user = user;
            return this;
        }

        public BorrowingTransactionBuilder book(Book book) {
            this.book = book;
            return this;
        }

        public BorrowingTransactionBuilder checkoutDate(LocalDateTime checkoutDate) {
            this.checkoutDate = checkoutDate;
            return this;
        }

        public BorrowingTransactionBuilder dueDate(LocalDateTime dueDate) {
            this.dueDate = dueDate;
            return this;
        }

        public BorrowingTransactionBuilder returnDate(LocalDateTime returnDate) {
            this.returnDate = returnDate;
            return this;
        }

        public BorrowingTransactionBuilder status(TransactionStatus status) {
            this.status = status;
            return this;
        }

        public BorrowingTransaction build() {
            return new BorrowingTransaction(id, user, book, checkoutDate, dueDate, returnDate, status);
        }
    }
}
