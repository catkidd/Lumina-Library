package com.example.library_management_system.service;

import com.example.library_management_system.dto.BookDto;
import com.example.library_management_system.entity.Book;
import com.example.library_management_system.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Book getBookById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Book not found with ID: " + id));
    }

    public List<Book> searchBooks(String query) {
        if (query == null || query.trim().isEmpty()) {
            return bookRepository.findAll();
        }
        return bookRepository.searchBooks(query.trim());
    }

    @Transactional
    public Book createBook(BookDto dto) {
        if (bookRepository.existsByIsbn(dto.getIsbn())) {
            throw new IllegalArgumentException("Book with ISBN " + dto.getIsbn() + " already exists");
        }

        Book book = Book.builder()
                .title(dto.getTitle())
                .author(dto.getAuthor())
                .isbn(dto.getIsbn())
                .genre(dto.getGenre())
                .totalCopies(dto.getTotalCopies())
                .availableCopies(dto.getTotalCopies())
                .build();

        return bookRepository.save(book);
    }

    @Transactional
    public Book updateBook(Long id, BookDto dto) {
        Book book = getBookById(id);

        if (!book.getIsbn().equals(dto.getIsbn()) && bookRepository.existsByIsbn(dto.getIsbn())) {
            throw new IllegalArgumentException("Book with ISBN " + dto.getIsbn() + " already exists");
        }

        int diff = dto.getTotalCopies() - book.getTotalCopies();
        int newAvailable = book.getAvailableCopies() + diff;

        if (newAvailable < 0) {
            throw new IllegalArgumentException("Cannot reduce total copies below active borrowings. Active borrowings: " + (book.getTotalCopies() - book.getAvailableCopies()));
        }

        book.setTitle(dto.getTitle());
        book.setAuthor(dto.getAuthor());
        book.setIsbn(dto.getIsbn());
        book.setGenre(dto.getGenre());
        book.setTotalCopies(dto.getTotalCopies());
        book.setAvailableCopies(newAvailable);

        return bookRepository.save(book);
    }

    @Transactional
    public void deleteBook(Long id) {
        Book book = getBookById(id);
        bookRepository.delete(book);
    }
}
