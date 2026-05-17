package com.example.library_management_system.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class BookDto {
    private Long id;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Author is required")
    private String author;

    @NotBlank(message = "ISBN is required")
    private String isbn;

    @NotBlank(message = "Genre is required")
    private String genre;

    @NotNull(message = "Total copies is required")
    @Min(value = 0, message = "Total copies cannot be negative")
    private Integer totalCopies;

    private Integer availableCopies;

    // Constructors
    public BookDto() {}

    public BookDto(Long id, String title, String author, String isbn, String genre, Integer totalCopies, Integer availableCopies) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.genre = genre;
        this.totalCopies = totalCopies;
        this.availableCopies = availableCopies;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public Integer getTotalCopies() {
        return totalCopies;
    }

    public void setTotalCopies(Integer totalCopies) {
        this.totalCopies = totalCopies;
    }

    public Integer getAvailableCopies() {
        return availableCopies;
    }

    public void setAvailableCopies(Integer availableCopies) {
        this.availableCopies = availableCopies;
    }

    // Builder Pattern
    public static BookDtoBuilder builder() {
        return new BookDtoBuilder();
    }

    public static class BookDtoBuilder {
        private Long id;
        private String title;
        private String author;
        private String isbn;
        private String genre;
        private Integer totalCopies;
        private Integer availableCopies;

        public BookDtoBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public BookDtoBuilder title(String title) {
            this.title = title;
            return this;
        }

        public BookDtoBuilder author(String author) {
            this.author = author;
            return this;
        }

        public BookDtoBuilder isbn(String isbn) {
            this.isbn = isbn;
            return this;
        }

        public BookDtoBuilder genre(String genre) {
            this.genre = genre;
            return this;
        }

        public BookDtoBuilder totalCopies(Integer totalCopies) {
            this.totalCopies = totalCopies;
            return this;
        }

        public BookDtoBuilder availableCopies(Integer availableCopies) {
            this.availableCopies = availableCopies;
            return this;
        }

        public BookDto build() {
            return new BookDto(id, title, author, isbn, genre, totalCopies, availableCopies);
        }
    }
}
