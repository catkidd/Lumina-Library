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

            Book book6 = Book.builder()
                    .title("Design Patterns")
                    .author("Erich Gamma")
                    .isbn("978-0201633610")
                    .genre("Technology")
                    .totalCopies(6)
                    .availableCopies(6)
                    .build();

            Book book7 = Book.builder()
                    .title("The Pragmatic Programmer")
                    .author("Andrew Hunt")
                    .isbn("978-0135957059")
                    .genre("Technology")
                    .totalCopies(8)
                    .availableCopies(8)
                    .build();

            Book book8 = Book.builder()
                    .title("The Art of Computer Programming")
                    .author("Donald E. Knuth")
                    .isbn("978-0201896831")
                    .genre("Technology")
                    .totalCopies(2)
                    .availableCopies(2)
                    .build();

            Book book9 = Book.builder()
                    .title("Compilers: Principles, Techniques, and Tools")
                    .author("Alfred V. Aho")
                    .isbn("978-0321486813")
                    .genre("Technology")
                    .totalCopies(3)
                    .availableCopies(3)
                    .build();

            Book book10 = Book.builder()
                    .title("Structure and Interpretation of Computer Programs")
                    .author("Harold Abelson")
                    .isbn("978-0262510875")
                    .genre("Technology")
                    .totalCopies(4)
                    .availableCopies(4)
                    .build();

            Book book11 = Book.builder()
                    .title("Cosmos")
                    .author("Carl Sagan")
                    .isbn("978-0345331359")
                    .genre("Science")
                    .totalCopies(5)
                    .availableCopies(5)
                    .build();

            Book book12 = Book.builder()
                    .title("The Selfish Gene")
                    .author("Richard Dawkins")
                    .isbn("978-0198788607")
                    .genre("Science")
                    .totalCopies(6)
                    .availableCopies(6)
                    .build();

            Book book13 = Book.builder()
                    .title("Gödel, Escher, Bach")
                    .author("Douglas R. Hofstadter")
                    .isbn("978-0465026562")
                    .genre("Science")
                    .totalCopies(3)
                    .availableCopies(3)
                    .build();

            Book book14 = Book.builder()
                    .title("The Elegant Universe")
                    .author("Brian Greene")
                    .isbn("978-0393338102")
                    .genre("Science")
                    .totalCopies(5)
                    .availableCopies(5)
                    .build();

            Book book15 = Book.builder()
                    .title("Sapiens: A Brief History of Humankind")
                    .author("Yuval Noah Harari")
                    .isbn("978-0062316097")
                    .genre("History")
                    .totalCopies(8)
                    .availableCopies(8)
                    .build();

            Book book16 = Book.builder()
                    .title("Guns, Germs, and Steel")
                    .author("Jared Diamond")
                    .isbn("978-0393354324")
                    .genre("History")
                    .totalCopies(6)
                    .availableCopies(6)
                    .build();

            Book book17 = Book.builder()
                    .title("The Fellowship of the Ring")
                    .author("J.R.R. Tolkien")
                    .isbn("978-0345339706")
                    .genre("Fantasy")
                    .totalCopies(7)
                    .availableCopies(7)
                    .build();

            Book book18 = Book.builder()
                    .title("The Silmarillion")
                    .author("J.R.R. Tolkien")
                    .isbn("978-0345325815")
                    .genre("Fantasy")
                    .totalCopies(4)
                    .availableCopies(4)
                    .build();

            Book book19 = Book.builder()
                    .title("Brave New World")
                    .author("Aldous Huxley")
                    .isbn("978-0060850524")
                    .genre("Dystopian")
                    .totalCopies(9)
                    .availableCopies(9)
                    .build();

            Book book20 = Book.builder()
                    .title("Fahrenheit 451")
                    .author("Ray Bradbury")
                    .isbn("978-1451673319")
                    .genre("Dystopian")
                    .totalCopies(8)
                    .availableCopies(8)
                    .build();

            bookRepository.saveAll(Arrays.asList(
                    book1, book2, book3, book4, book5, book6, book7, book8, book9, book10,
                    book11, book12, book13, book14, book15, book16, book17, book18, book19, book20
            ));
            System.out.println("--- Seeded 20 premium library books ---");
        }
    }
}
