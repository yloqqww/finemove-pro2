# FineMove Pro Database Setup Script
# This script initializes your Supabase database

# 1. Test database connection
Write-Host "🔍 Testing database connection..." -ForegroundColor Cyan

$env:DATABASE_URL="postgresql://postgres:N%2F2p3f76Je%3FVnNn@db.hdjzjyxbmoppenunwdkb.supabase.co:5432/postgres"

# Try to push schema
Write-Host "📦 Pushing Prisma schema to database..." -ForegroundColor Cyan
npm run db:push

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Database connection failed" -ForegroundColor Red
    Write-Host ""
    Write-Host "SOLUTIONS:" -ForegroundColor Yellow
    Write-Host "1. Check Supabase database is enabled at https://supabase.com/dashboard" -ForegroundColor White
    Write-Host "2. Verify connection credentials in .env file" -ForegroundColor White
    Write-Host "3. Check firewall/network allows connection to Supabase" -ForegroundColor White
    Write-Host "4. Try manual setup using Supabase SQL Editor:" -ForegroundColor White
    Write-Host "   - Go to SQL Editor in Supabase Dashboard" -ForegroundColor White
    Write-Host "   - Copy schema from prisma/schema.prisma" -ForegroundColor White
    exit 1
}

# If successful, seed data
Write-Host "🌱 Seeding sample data..." -ForegroundColor Cyan
npm run db:seed

Write-Host "✅ Database setup complete!" -ForegroundColor Green
Write-Host "The app is ready at http://localhost:3000" -ForegroundColor Green
