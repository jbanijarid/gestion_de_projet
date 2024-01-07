#!/bin/bash

# Open VSCode in the current directory
echo "Opening VSCode..."
code .

# First process: Backend
echo "Starting Backend..."
cd backend
npm i
npm run dev &
pid_backend=$!

# Second process: Frontend
echo "Starting Frontend..."
cd ../frontend
npm i
npm run dev &
pid_frontend=$!

# Wait for both processes to finish
wait $pid_backend
wait $pid_frontend


echo "Script completed."
