package com.example.library_management_system.controller;

import com.example.library_management_system.dto.BookDto;
import com.example.library_management_system.dto.BorrowRequest;
import com.example.library_management_system.dto.ReturnRequest;
import com.example.library_management_system.dto.TransactionDto;
import com.example.library_management_system.entity.Book;
import com.example.library_management_system.entity.BorrowingTransaction;
import com.example.library_management_system.entity.User;
import com.example.library_management_system.security.CustomUserDetails;
import com.example.library_management_system.service.BookService;
import com.example.library_management_system.service.BorrowingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @Autowired
    private BorrowingService borrowingService;

    @GetMapping
    public ResponseEntity<List<BookDto>> getAllBooks() {
        List<BookDto> books = bookService.getAllBooks().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(books);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookDto> getBookById(@PathVariable Long id) {
        Book book = bookService.getBookById(id);
        return ResponseEntity.ok(convertToDto(book));
    }

    @GetMapping("/search")
    public ResponseEntity<List<BookDto>> searchBooks(@RequestParam(value = "q", required = false) String query) {
        List<BookDto> books = bookService.searchBooks(query).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(books);
    }

    @PostMapping
    public ResponseEntity<BookDto> createBook(@Valid @RequestBody BookDto dto) {
        Book book = bookService.createBook(dto);
        return ResponseEntity.ok(convertToDto(book));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookDto> updateBook(@PathVariable Long id, @Valid @RequestBody BookDto dto) {
        Book book = bookService.updateBook(id, dto);
        return ResponseEntity.ok(convertToDto(book));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/borrow")
    public ResponseEntity<TransactionDto> borrowBook(
            @Valid @RequestBody BorrowRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        User user = userDetails.getUser();
        BorrowingTransaction transaction = borrowingService.borrowBook(request.getBookId(), user);
        return ResponseEntity.ok(convertToTransactionDto(transaction));
    }

    @PostMapping("/return")
    public ResponseEntity<TransactionDto> returnBook(
            @Valid @RequestBody ReturnRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        User user = userDetails.getUser();
        BorrowingTransaction transaction = borrowingService.returnBook(request.getTransactionId(), user);
        return ResponseEntity.ok(convertToTransactionDto(transaction));
    }

    private BookDto convertToDto(Book book) {
        return BookDto.builder()
                .id(book.getId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .isbn(book.getIsbn())
                .genre(book.getGenre())
                .totalCopies(book.getTotalCopies())
                .availableCopies(book.getAvailableCopies())
                .build();
    }

    private TransactionDto convertToTransactionDto(BorrowingTransaction t) {
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
