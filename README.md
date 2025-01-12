# Temu Kampus - School and Campus Event Management System

## 📝 Description
**Temu Kampus** is a modern application designed to simplify event management for schools and campuses. It streamlines processes such as user registration, event creation, participant registration, event scheduling, and post-event feedback. With Temu Kampus, organizing events becomes more efficient and accessible through digital tools.

---

## 🌐 Demo
You can try the live demo here:  
<a href="https://temu-kampus.vercel.app/" target="_blank">Temu Kampus Demo</a>

### Test User Accounts
1. **Admin**
    - Email: `admin@temukampus.com`
    - Password: `admin1234!`
2. **Lecturer**
    - Email: `lecturer@temukampus.com`
    - Password: `lecturer1234!`
3. **Student**
    - Email: `student@temukampus.com`
    - Password: `student1234!`

---

## ✨ Key Features
- **User Management:**
  - Separate roles for admin, lecturers, and students.
- **Event Creation & Management:**
  - Create and manage events with detailed descriptions, schedules, and locations.
- **Participant Registration:**
  - Online registration forms for participants.
- **Event Calendar:**
  - A centralized calendar to view and filter events by category, date, or location.
- **Notifications & Reminders:**
  - Email or SMS notifications for event updates and confirmations.
- **Feedback System:**
  - Users can submit reviews and feedback for events.
- **Administrative Dashboard:**
  - Real-time insights on attendance, reviews, and event statistics.

---

## 🛠️ Technologies Used
- **Framework:** Next.js v14
- **Package Manager:** Bun
- **Programming Language:** TypeScript
- **Database:** MongoDB
- **Authentication:** NextAuth v5
- **ORM:** Prisma

---

## 🔧 Installation

### Local Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/bagusvalentinoo/temu-kampus.git
    cd temu-kampus
    ```

2. **Configure environment variables:**
    - Copy the example `.env` file and update the values as needed:
      ```bash
      cp .env.example .env
      ```

3. **Install dependencies using Bun:**
    ```bash
    bun install
    ```

4. **Generate Prisma Client:**
    ```bash
    bunx prisma generate
    ```

5. **Push database schema:**
    ```bash
    bunx prisma db push
    ```

6. **Start the development server:**
    ```bash
    bun dev
    ```

7. **Access the application:**
    Open your browser and navigate to `http://localhost:3000`.

---

### Installation via Docker

1. **Generate MongoDB Keyfile:**
    ```bash
    ops/generate-mongodb-keyfile.sh
    ```

2. **Configure environment variables:**
    - Copy the example `.env` file for Docker and update as needed:
      ```bash
      cp ops/.env.example ops/.env
      ```

3. **Start the application using Docker Compose:**
    ```bash
    docker compose -f ops/dev.docker-compose.yml -p temu-kampus up -d --build
    ```

4. **Access the application:**
    Navigate to `http://localhost:7001`.

---

## 📊 Migration & Database Seeding

- **Apply database schema:**
    ```bash
    bunx prisma db push
    ```

- **Seed the database with sample data:**
    ```bash
    bun run prisma:seed
    ```

---

## 📜 License
This project is licensed under the [MIT License](./LICENSE).

---

## 📞 Support
If you encounter any issues or have questions, feel free to <a href="https://github.com/bagusvalentinoo/temu-kampus/issues" target="_blank">open an issue</a> or contact the maintainers.

---

## 📚 Resources
- <a href="https://nextjs.org/docs" target="_blank">Next.js Documentation</a>
- <a href="https://bun.sh/docs" target="_blank">Bun Documentation</a>
- <a href="https://www.prisma.io/docs" target="_blank">Prisma Documentation</a>
- <a href="https://www.mongodb.com/docs" target="_blank">MongoDB Documentation</a>
