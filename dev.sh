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

echo "✅ Setting up environment variables..."
export WWWUSER=$(id -u)
export WWWGROUP=$(id -g)

echo "🚀 Launching Docker containers in development mode..."
$DOCKER_COMPOSE_CMD up --build -d

echo "⏳ Waiting for PHP container to start..."
while ! $DOCKER_COMPOSE_CMD ps | grep "php" | grep "Up"; do
    sleep 1
done

echo "🔧 Installing dependencies..."
$DOCKER_COMPOSE_CMD exec php composer install
$DOCKER_COMPOSE_CMD exec php php artisan migrate
$DOCKER_COMPOSE_CMD exec php npm install
$DOCKER_COMPOSE_CMD exec php npm run dev &

echo "✅ Development server is running!"
echo "   ➜ Laravel backend:  http://localhost"
echo "   ➜ Vite frontend (HMR): http://localhost:5173"
echo "   ➜ Vite HMR WebSocket: http://localhost:24678"

echo "🔍 Entering PHP container..."
$DOCKER_COMPOSE_CMD exec php bash
