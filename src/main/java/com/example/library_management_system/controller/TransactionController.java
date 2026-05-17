package com.example.library_management_system.controller;

import com.example.library_management_system.dto.TransactionDto;
import com.example.library_management_system.entity.BorrowingTransaction;
import com.example.library_management_system.entity.User;
import com.example.library_management_system.security.CustomUserDetails;
import com.example.library_management_system.service.BorrowingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private BorrowingService borrowingService;

    @GetMapping("/my")
    public ResponseEntity<List<TransactionDto>> getMyTransactions(
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        User user = userDetails.getUser();
        List<TransactionDto> history = borrowingService.getMyTransactions(user).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(history);
    }

    @GetMapping
    public ResponseEntity<List<TransactionDto>> getAllTransactions() {
        List<TransactionDto> history = borrowingService.getAllTransactions().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(history);
    }

    private TransactionDto convertToDto(BorrowingTransaction t) {
        return TransactionDto.builder()
                .id(t.getId())
                .userId(t.getUser().getId())
                .userEmail(t.getUser().getEmail())
                .bookId(t.getBook().getId())
                .bookTitle(t.getBook().getTitle())
                .bookAuthor(t.getBook().getAuthor())
                .bookIsbn(t.getBook().getIsbn())
                .checkoutDate(t.getCheckoutDate())
                .dueDate(t.getDueDate())
                .returnDate(t.getReturnDate())
                .status(t.getStatus().name())
                .build();
    }
}
