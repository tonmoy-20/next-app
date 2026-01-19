#!/bin/bash

echo "Starting Product Listing App Development Servers..."
echo

echo "Starting Express API Server..."
cd api-server
npm start &
API_PID=$!

echo "Waiting for API server to start..."
sleep 5

echo "Starting Next.js Development Server..."
cd ..
npm run dev &
NEXT_PID=$!

echo
echo "Both servers are starting..."
echo "API Server: http://localhost:5002 (or next available port)"
echo "Next.js App: http://localhost:3000"
echo
echo "Note: If port 5000 is in use, the API server will use the next available port."
echo "Check the API server terminal for the actual port being used."
echo
echo "Press Ctrl+C to stop both servers"

# Wait for both processes
wait $API_PID $NEXT_PID