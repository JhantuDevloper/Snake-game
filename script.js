const boardSize = 20;
const gameBoard = document.getElementById('gameBoard');
const scoreDisplay = document.getElementById('score');
let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize) };
let score = 0;
let gameSpeed = 100; // Default speed for Normal mode
let gameInterval;

function drawSnake() {
    gameBoard.innerHTML = '';
    snake.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.left = `${segment.x * 20}px`;
        snakeElement.style.top = `${segment.y * 20}px`;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    });
}

function drawFood() {
    const foodElement = document.createElement('div');
    foodElement.style.left = `${food.x * 20}px`;
    foodElement.style.top = `${food.y * 20}px`;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        food = { x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize) };
    } else {
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function gameLoop() {
    if (checkCollision()) {
        alert('Game Over! Your score: ' + score);
        resetGame();
        return;
    }

    moveSnake();
    drawSnake();
    drawFood();
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
}

function setDifficulty(level) {
    clearInterval(gameInterval);
    switch (level) {
        case 'normal':
            gameSpeed = 200;
            break;
        case 'medium':
            gameSpeed = 150;
            break;
        case 'hard':
            gameSpeed = 100;
            break;
    }
    startGame();
}

function startGame() {
    score = 0;
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    food = { x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize) };
    scoreDisplay.textContent = `Score: ${score}`;
    gameInterval = setInterval(gameLoop, gameSpeed);
}

function resetGame() {
    clearInterval(gameInterval);
    startGame();
}

document.addEventListener('keydown', changeDirection);

