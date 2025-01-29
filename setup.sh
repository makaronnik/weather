#!/bin/bash

set -e

echo "🔍 Checking dependencies..."

if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found. Please install or run Docker."
    exit 1
fi

if command -v docker compose &> /dev/null; then
    DOCKER_COMPOSE_CMD="docker compose"
elif command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE_CMD="docker-compose"
else
    echo "❌ Docker Compose was not found. Please install Docker Compose."
    exit 1
fi

check_port() {
    local port=$1
    if ss -tuln | grep -q ":$port "; then
        echo "❌ Port $port is already in use. Please free the port and try again."
        exit 1
    fi
}

check_port 80       # Laravel backend
check_port 5173     # Vite frontend
check_port 24678    # Vite HMR
check_port 3306     # MySQL
check_port 6379     # Redis

if [ -f .env.local ]; then
    echo "📄 Copying .env.local to .env..."
    cp .env.local .env
fi

echo "✅ Setting up environment variables..."
export WWWUSER=$(id -u)
export WWWGROUP=$(id -g)

echo "🚀 Building and launching Docker containers..."
$DOCKER_COMPOSE_CMD up --build -d

echo "⏳ Waiting for PHP container to start..."
while ! $DOCKER_COMPOSE_CMD ps | grep "php" | grep "Up"; do
    sleep 1
done

echo "📦 Installing PHP dependencies..."
$DOCKER_COMPOSE_CMD exec php composer install --no-interaction --prefer-dist

echo "🛠️ Running Laravel Migrations..."
$DOCKER_COMPOSE_CMD exec php php artisan migrate --force

echo "📦 Installing and building frontend..."
$DOCKER_COMPOSE_CMD exec php npm install --legacy-peer-deps
$DOCKER_COMPOSE_CMD exec php npm run build

echo "✅ The test task is ready to be checked at: http://localhost"

$DOCKER_COMPOSE_CMD ps
