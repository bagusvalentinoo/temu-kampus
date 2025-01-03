# Temu Kampus - School and Campus Event Management System

Temu Kampus is an application designed to facilitate event management within school and campus environments. This
application offers features such as user registration, event creation, participant registration, event calendar, and
post-event feedback. With Temu Kampus, all event management processes can be carried out digitally, effectively, and
efficiently.

## Demo

```
https://temu-kampus.vercel.app/
```

## Users

1. Admin
    - Email: admin@temukampus.com
    - Password: admin1234!
2. Lecturer
    - Email: lecturer@temukampus.com
    - Password: lecturer1234!
3. Student
    - Email: student@temukampus.com
    - Password: student1234!

## Key Features

- **User Registration and Login**
    - Users (students, lecturers, admins) can register and log in to the system with appropriate access rights.

- **Event Creation and Management**
    - Users can create events, set the date, time, location, and provide detailed event descriptions.

- **Participant Registration**
    - Students and lecturers can register to attend events using the available online forms.

- **Event Calendar**
    - Displays a list of upcoming events with filter options based on event category, date, or location.

- **Notifications and Reminders**
    - Reminders are sent via email or SMS for registration confirmation and event schedule updates.

- **Venue and Resource Management**
    - Manage event locations and resources needed such as equipment and supplies.

- **Event Reviews and Feedback**
    - Users can provide reviews and feedback after the event for further evaluation.

- **Administrative Dashboard**
    - Shows statistics such as the number of registrations, attendance, and event reviews.

## Technologies Used

- **Framework:** Next.js V14
- **Package Manager:** Bun
- **Programming Language:** TypeScript
- **Database:** MongoDB
- **Authentication:** NextAuth V5

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/username/temu-kampus.git
   cd temu-kampus
   ```
2. Copy the `.env.example` file to `.env`and update the environment variables:

   ```bash
   cp .env.example .env
   ```

3. Install dependencies using Bun:

   ```bash
   bun install
   ```

4. Run generate prisma client:

    ```bash
   bunx prisma generate
   ```

5. Run prisma db push:

    ```bash
   bunx prisma db push
   ```

6. Run the application in the development environment:

   ```bash
   bun dev
   ```

7. Access the application at `http://localhost:3000`.

## Install via Docker

1. Run generate ops/generate-mongodb-keyfile.sh:

    ```bash
   ops/generate-mongodb-keyfile.sh
   ```

2. Copy the `ops/.env.example` file to `ops/.env`and update the environment variables:

   ```bash
   cp ops/.env.example ops/.env
   ```

3. Run docker-compose up:

    ```bash
   docker compose -f ops/dev.docker-compose.yml -p temu-kampus up -d --build
   ```

4. Access the application at `http://localhost:7001`.

## Migration and Database Seeding

Migration:

```bash
bunx prisma db push
```

Seed the database:

```bash
bun run prisma:seed
```

## License

Temu Kampus is licensed under the [MIT License](./LICENSE).
