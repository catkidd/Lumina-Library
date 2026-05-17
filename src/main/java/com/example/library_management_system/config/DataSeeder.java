package com.example.library_management_system.config;

import com.example.library_management_system.entity.Book;
import com.example.library_management_system.entity.Role;
import com.example.library_management_system.entity.User;
import com.example.library_management_system.repository.BookRepository;
import com.example.library_management_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            User admin = User.builder()
                    .email("admin@library.com")
                    .passwordHash(passwordEncoder.encode("admin123"))
                    .role(Role.ADMIN)
                    .build();

            User student = User.builder()
                    .email("student@library.com")
                    .passwordHash(passwordEncoder.encode("student123"))
                    .role(Role.STUDENT)
                    .build();

            userRepository.saveAll(Arrays.asList(admin, student));
            System.out.println("--- Seeded default users: admin@library.com / admin123 and student@library.com / student123 ---");
        }

        if (bookRepository.count() == 0) {
            Book book1 = Book.builder()
                    .title("Introduction to Algorithms")
                    .author("Thomas H. Cormen")
                    .isbn("978-0262033848")
                    .genre("Technology")
                    .totalCopies(5)
                    .availableCopies(5)
                    .build();

            Book book2 = Book.builder()
                    .title("Clean Code")
                    .author("Robert C. Martin")
                    .isbn("978-0132350884")
                    .genre("Technology")
                    .totalCopies(3)
                    .availableCopies(3)
                    .build();

            Book book3 = Book.builder()
                    .title("The Hobbit")
                    .author("J.R.R. Tolkien")
                    .isbn("978-0007487289")
                    .genre("Fantasy")
                    .totalCopies(7)
                    .availableCopies(7)
                    .build();

            Book book4 = Book.builder()
                    .title("A Brief History of Time")
                    .author("Stephen Hawking")
                    .isbn("978-0553380163")
                    .genre("Science")
                    .totalCopies(4)
                    .availableCopies(4)
                    .build();

            Book book5 = Book.builder()
                    .title("1984")
                    .author("George Orwell")
                    .isbn("978-0451524935")
                    .genre("Dystopian")
                    .totalCopies(10)
                    .availableCopies(10)
                    .build();

            bookRepository.saveAll(Arrays.asList(book1, book2, book3, book4, book5));
            System.out.println("--- Seeded 5 premium library books ---");
        }
    }
}
