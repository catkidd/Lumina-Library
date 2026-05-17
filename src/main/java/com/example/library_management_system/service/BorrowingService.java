package com.example.library_management_system.service;

import com.example.library_management_system.entity.Book;
import com.example.library_management_system.entity.BorrowingTransaction;
import com.example.library_management_system.entity.TransactionStatus;
import com.example.library_management_system.entity.User;
import com.example.library_management_system.repository.BookRepository;
import com.example.library_management_system.repository.BorrowingTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BorrowingService {

    @Autowired
    private BorrowingTransactionRepository transactionRepository;

    @Autowired
    private BookRepository bookRepository;

    @Transactional
    public BorrowingTransaction borrowBook(Long bookId, User user) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("Book not found with ID: " + bookId));

        if (book.getAvailableCopies() <= 0) {
            throw new IllegalStateException("No available copies of this book left to borrow");
        }

        List<BorrowingTransaction> userTransactions = transactionRepository.findByUserOrderByCheckoutDateDesc(user);
        boolean alreadyBorrowed = userTransactions.stream()
                .anyMatch(t -> t.getBook().getId().equals(bookId) && 
                               (t.getStatus() == TransactionStatus.ACTIVE || t.getStatus() == TransactionStatus.OVERDUE));
        if (alreadyBorrowed) {
            throw new IllegalStateException("You already have an active borrowing transaction for this book.");
        }

        book.setAvailableCopies(book.getAvailableCopies() - 1);
        bookRepository.save(book);

        BorrowingTransaction transaction = BorrowingTransaction.builder()
                .user(user)
                .book(book)
                .checkoutDate(LocalDateTime.now())
                .dueDate(LocalDateTime.now().plusDays(14))
                .status(TransactionStatus.ACTIVE)
                .build();

        return transactionRepository.save(transaction);
    }

    @Transactional
    public BorrowingTransaction returnBook(Long transactionId, User user) {
        BorrowingTransaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new IllegalArgumentException("Transaction not found with ID: " + transactionId));

        if (!transaction.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("Unauthorized: You cannot return a book borrowed by another user.");
        }

        if (transaction.getStatus() == TransactionStatus.RETURNED) {
            throw new IllegalStateException("This transaction has already been completed and returned.");
        }

        Book book = transaction.getBook();
        book.setAvailableCopies(book.getAvailableCopies() + 1);
        bookRepository.save(book);

        transaction.setReturnDate(LocalDateTime.now());
        transaction.setStatus(TransactionStatus.RETURNED);

        return transactionRepository.save(transaction);
    }

    public List<BorrowingTransaction> getMyTransactions(User user) {
        checkAndUpdateUserOverdueTransactions(user);
        return transactionRepository.findByUserOrderByCheckoutDateDesc(user);
    }

    public List<BorrowingTransaction> getAllTransactions() {
        checkAndUpdateAllOverdueTransactions();
        return transactionRepository.findAll();
    }

    @Scheduled(cron = "0 0 * * * *")
    @Transactional
    public void checkAndUpdateAllOverdueTransactions() {
        List<BorrowingTransaction> activeLateTransactions = transactionRepository
                .findByStatusAndDueDateBefore(TransactionStatus.ACTIVE, LocalDateTime.now());

        for (BorrowingTransaction transaction : activeLateTransactions) {
            transaction.setStatus(TransactionStatus.OVERDUE);
            transactionRepository.save(transaction);
        }
    }

    @Transactional
    public void checkAndUpdateUserOverdueTransactions(User user) {
        List<BorrowingTransaction> transactions = transactionRepository.findByUserOrderByCheckoutDateDesc(user);
        for (BorrowingTransaction transaction : transactions) {
            if (transaction.getStatus() == TransactionStatus.ACTIVE && transaction.getDueDate().isBefore(LocalDateTime.now())) {
                transaction.setStatus(TransactionStatus.OVERDUE);
                transactionRepository.save(transaction);
            }
        }
    }
}
