# Tutorial: Running Lumina Library Portal Locally

This step-by-step guide explains how to configure, boot, and run both the Spring Boot backend server and the React + Vite frontend development environment on your local machine.

---

## Prerequisites

Before starting, ensure your system has the following running:

1.  **MySQL Server**: Running on port `3306`.
    - **Username**: `root`
    - **Password**: `root`
    - _Note: The backend connection string is configured with `createDatabaseIfNotExist=true`, meaning the database schema will be created automatically on startup._
2.  **Node.js**: Installed (version `>= 18.x` recommended).
3.  **Java Development Kit (JDK)**: Installed (version `>= 17.x` recommended).

---

## Step 1: Start the Spring Boot Backend

The backend runs on port `8080` and manages all JPA transactions, entity updates, JWT creation/validation, and cron-based overdue checks.

1.  Open your terminal or command prompt inside the project's root folder:
    `c:\Users\NITRO\Documents\dipeshparajuli\java projects\library-management-system`
2.  Boot the application using the Maven wrapper command:
    ```powershell
    .\mvnw.cmd spring-boot:run
    ```
3.  Wait for the console to output the startup logs. You should see logs indicating:
    - _Database schema and tables initialized_
    - _Seeded default users (admin@library.com and student@library.com)_
    - _Seeded 5 premium library books_
    - _Tomcat started on port 8080_

---

## Step 2: Start the React + Vite Frontend

The React frontend runs on port `5173` and utilizes Tailwind CSS for styling and Axios for automatic JWT authorization and renewal.

1.  Open a **new, separate** terminal window.
2.  Navigate to the `./frontend` directory:
    ```bash
    cd frontend
    ```
3.  Install node packages and spin up the development server:

    ```bash
    # Install dependencies
    npm install

    # Launch dev server
    npm run dev
    ```

4.  Vite will boot the client application and expose it at `http://localhost:5173`.

---

## Step 3: Access and Test the Portal

Now, open your browser and navigate to:
**[http://localhost:5173](http://localhost:5173)**

You can log in immediately using these pre-seeded development accounts:

### Test Account A: Student Account (Borrowing & Returning)

- **Email**: `student@library.com`
- **Password**: `student123`
- **Action List**:
  1.  Log in and navigate to the **Book Catalog** tab.
  2.  Locate a book and click **Borrow Book**. Note the remaining available copies count decrements.
  3.  Go to the **My Borrow Logs** tab to view your active loan, see the remaining days progress bar, and check-in (click **Return Book**) when ready.

### Test Account B: Librarian Account (Administrative Controls)

- **Email**: `admin@library.com`
- **Password**: `admin123`
- **Action List**:
  1.  Log in and navigate to the **Admin Control** tab.
  2.  Observe the metrics widgets showing real-time inventory sizes, registered users, and active checkouts.
  3.  Add new books or update stock using the **Add Book** glassmorphic modal form.
  4.  Navigate to **System Transaction Logs** to view historical audit lists of all student checkouts.
