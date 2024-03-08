# Note Taking Web Application

This is a web application that allows users to create, edit, delete, archive/unarchive notes, and filter them based on their status (active or archived). The backend is implemented using Node.js with Express.js and Sequelize ORM for database interaction, while the frontend is built with React.js and Vite.js for bundling.

## System Requirements

- Node.js v14.0.0 or higher
- PostgreSQL
- Node.js v14.0.0

## Backend

- Express.js v4.18.3
- Sequelize v6.37.1
- PostgreSQL

## Frontend

- React v18.2.0
- Vite v4.4.5

## Installation and Setup

1. Clone this repository

2. Set up a PostgreSQL database and update the database credentials in the backend/config/config.js file.

3. Install backend dependencies and set up the database schema:

   ```bash
   cd backend
   npm install
   npx sequelize-cli db:migrate
   ```
4. Install frontend dependencies:
   
   ```bash
   cd ../frontend
   npm install
   ```

## Running the Application

Execute the following script in the terminal:

   ```bash
   chmod +x run.sh
   ./run.sh
   ```

This will install dependencies, set up the database, and start the backend and frontend servers.

## Environment Variables

Make sure to set the following environment variables in a .env file in the root directory:

   ```bash
   PORT=
   DB_USER=
   DB_PASSWORD=
   DB_HOST=
   ```

## Usage

Once the application is running, npm start (backend) and npm run dev (frontend). Access to http://127.0.0.1:5173/ and start use the Notes app.


This README.md provides clear instructions on how to set up and run your application. If you need any further assistance or modifications, feel free to ask!
