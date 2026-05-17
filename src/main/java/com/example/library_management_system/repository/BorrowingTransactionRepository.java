package com.example.library_management_system.repository;

import com.example.library_management_system.entity.BorrowingTransaction;
import com.example.library_management_system.entity.TransactionStatus;
import com.example.library_management_system.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BorrowingTransactionRepository extends JpaRepository<BorrowingTransaction, Long> {
    List<BorrowingTransaction> findByUserOrderByCheckoutDateDesc(User user);
    List<BorrowingTransaction> findByStatus(TransactionStatus status);
    List<BorrowingTransaction> findByStatusAndDueDateBefore(TransactionStatus status, LocalDateTime dateTime);
}
