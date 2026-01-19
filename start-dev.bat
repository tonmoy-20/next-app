@echo off
echo Starting Product Listing App Development Servers...
echo.

echo Starting Express API Server...
start "API Server" cmd /k "cd api-server && npm start"

echo Waiting for API server to start...
timeout /t 5 /nobreak > nul

echo Starting Next.js Development Server...
start "Next.js App" cmd /k "npm run dev"

echo.
echo Both servers are starting...
echo API Server: http://localhost:5002 (or next available port)
echo Next.js App: http://localhost:3000
echo.
echo Note: If port 5000 is in use, the API server will use the next available port.
echo Check the API server terminal for the actual port being used.
echo.
echo Press any key to exit...
pause > nul