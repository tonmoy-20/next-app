Write-Host "Starting Product Listing App Development Servers..." -ForegroundColor Green
Write-Host ""

Write-Host "Starting Express API Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd api-server; npm start" -WindowStyle Normal

Write-Host "Waiting for API server to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host "Starting Next.js Development Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "Both servers are starting..." -ForegroundColor Green
Write-Host "API Server: http://localhost:5002 (or next available port)" -ForegroundColor Cyan
Write-Host "Next.js App: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Note: If port 5000 is in use, the API server will use the next available port." -ForegroundColor Yellow
Write-Host "Check the API server terminal for the actual port being used." -ForegroundColor Yellow
Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")