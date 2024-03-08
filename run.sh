#!/bin/bash

# Change directory to backend and install dependencies
cd backend && npm install
if [ $? -ne 0 ]; then
  echo "Error: Failed to install backend dependencies"
  exit 1
fi

# Set up the database schema
npx sequelize-cli db:migrate
if [ $? -ne 0 ]; then
  echo "Error: Failed to set up the database schema"
  exit 1
fi

# Change directory to frontend and install dependencies
cd ../frontend && npm install
if [ $? -ne 0 ]; then
  echo "Error: Failed to install frontend dependencies"
  exit 1
fi

# Start backend server
cd ../backend && npm start &
if [ $? -ne 0 ]; then
  echo "Error: Failed to start backend server"
  exit 1
fi

# Start frontend server
cd ../frontend && npm run dev
if [ $? -ne 0 ]; then
  echo "Error: Failed to start frontend server"
  exit 1
fi
