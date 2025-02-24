## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [npm](https://www.npmjs.com/)

1. **Clone the Repo**
   Open your terminal and run the following:
   ```bash
   git clone https://github.com/Steven-Hsu1/lumaa-spring-2025-swe
   ```
   and cd into the directory.

## Backend Setup

1. **Update .env**  
   `cd ./backend` and create a `.env` based on .`example.env` and fill in based on your own credentials.

   You can use

   ```bash
    node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
   ```

   to generate your own jwt token.

2. **Connect PostgreSQL**  
    Connect to your database
   `psql -U postgres` and enter your password.

   Then `CREATE DATABASE authtasklist`.

   Go into the newly created database by typing `\c authtasklist`.

   Then you want to execute these SQL commands found in create_table.sql

   ```sql
   CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
    );

   CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    isComplete BOOLEAN DEFAULT FALSE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
   ```

   then you can exit the psql by `\q`

## Running the Backend

1.  Navigate to the backend folder

```bash
cd ./backend
```

2.  Install dependencies

```bash
npm install
```

3.  Run the backend server in dev mode

```bash
npm run dev
```

## Running the Frontend

1. Navigate to the frontend folder

```bash
cd ./frontend
```

2. Install dependencies

```bash
npm install
```

3. Run the backend server in dev mode

```bash
npm start
```

This will launch in your browser at http://localhost:3000

## Testing

**Backend Testing**
This is manually testable by looking at the database after registering an account and tasks.  
**Check Registered Users**

```bash
SELECT * FROM users;
```

This will display all entries in the users table.
Note: Passwords are stored as hashed values
**Check Tasks**

```bash
SELECT * FROM tasks;
```

If you must, you can delete all data from tables by running

```sql
TRUNCATE TABLE tasks, users RESTART IDENTITY CASCADE;
```

## Frontend Testing

**UI Testing**

- You can test this by registering a new user.
- Logging in with the registered user.
- Creating, updating, and deleting tasks.

## Notes

I expect the salary to be $2000 per month.
Thank you for this opportunity!

## Video

https://youtu.be/VlXFa2OgbZo
