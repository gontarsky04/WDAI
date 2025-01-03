const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const backgroundImg = new Image();
backgroundImg.src = "pics/board-bg.jpg";

const zombieSprite = new Image();
zombieSprite.src = "pics/walkingdead.png";

const crosshairImg = new Image();
crosshairImg.src = "pics/aim.png";

const fullHeartImg = new Image();
fullHeartImg.src = "pics/full_heart.png";
const emptyHeartImg = new Image();
const gameOverSound = new Audio("music/sad-music.mp3");
emptyHeartImg.src = "pics/empty_heart.png";

const zombieFrameWidth = 200;
const zombieFrameHeight = 312;
const zombieFrames = 10;
let zombieCurrentFrame = 0;
let zombieFrameCounter = 0;
const zombieFrameInterval = 5;

let score = 0;
let lives = 3;
let zombies = [];
let gameRunning = false;
let gameOverScreenVisible = false;
let startScreenVisible = true;
let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;

class Zombie {
    constructor(x, y, speed, scale) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.scale = scale;
        this.width = zombieFrameWidth * scale;
        this.height = zombieFrameHeight * scale;
    }

    draw() {
        const frameX = zombieCurrentFrame * zombieFrameWidth;
        ctx.drawImage(zombieSprite, frameX, 0, zombieFrameWidth, zombieFrameHeight, this.x, this.y, this.width, this.height);
    }

    update() {
        this.x -= this.speed;
    }
}

function spawnZombie() {
    const minSpawnHeight = canvas.height * 0.5;
    const maxSpawnHeight = canvas.height - 300;
    const y = Math.random() * (minSpawnHeight - maxSpawnHeight) + maxSpawnHeight;
    const speed = Math.random() * 2 + 1;
    const scale = Math.random() * 0.5 + 0.5;
    zombies.push(new Zombie(canvas.width, y, speed, scale));
}

function drawBackground() {
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
}

function drawScore() {
    ctx.font = "50px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "right";
    ctx.fillText(`Wynik: ${score}`, canvas.width - 20, 40);
}

function drawHearts() {
    const heartSize = 80;
    const spacing = 10;
    for (let i = 0; i < 3; i++) {
        const x = 50 + (heartSize + spacing) * i;
        const y = 10;
        if (i < lives) {
            ctx.drawImage(fullHeartImg, x, y, heartSize, heartSize);
        } else {
            ctx.drawImage(emptyHeartImg, x, y, heartSize, heartSize);
        }
    }
}

function drawCrosshair() {
    ctx.drawImage(crosshairImg, mouseX - 100, mouseY - 100, 200, 200);
}

function drawGameOverScreen() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "80px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Koniec gry  :3", canvas.width / 2, canvas.height / 2 - 100);
    ctx.fillText(`Twój wynik: ${score}`, canvas.width / 2, canvas.height / 2);
    ctx.fillStyle = "#FF5733";
    const buttonX = canvas.width / 2 - 150;
    const buttonY = canvas.height / 2 + 50;
    const buttonWidth = 300;
    const buttonHeight = 80;
    ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
    ctx.font = "40px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Zagraj ponownie", canvas.width / 2, canvas.height / 2 + 100);

    canvas.addEventListener("click", function onClick(event) {
        const { offsetX, offsetY } = event;
        if (
            offsetX >= buttonX &&
            offsetX <= buttonX + buttonWidth &&
            offsetY >= buttonY &&
            offsetY <= buttonY + buttonHeight
        ) {
            canvas.removeEventListener("click", onClick);
            restartGame();
        }
    });
}

function drawStartScreen() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "80px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Zombie Shooter", canvas.width / 2, canvas.height / 2 - 100);
    ctx.fillStyle = "#FF5733";
    const buttonX = canvas.width / 2 - 150;
    const buttonY = canvas.height / 2 + 50;
    const buttonWidth = 300;
    const buttonHeight = 80;
    ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
    ctx.font = "40px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Start", canvas.width / 2, canvas.height / 2 + 100);

    canvas.addEventListener("click", function onClick(event) {
        const { offsetX, offsetY } = event;
        if (
            offsetX >= buttonX &&
            offsetX <= buttonX + buttonWidth &&
            offsetY >= buttonY &&
            offsetY <= buttonY + buttonHeight
        ) {
            canvas.removeEventListener("click", onClick);
            startGame();
        }
    });
}

function updateAnimation() {
    zombieFrameCounter++;
    if (zombieFrameCounter >= zombieFrameInterval) {
        zombieCurrentFrame = (zombieCurrentFrame + 1) % zombieFrames;
        zombieFrameCounter = 0;
    }
}

function updateGame() {
    if (!gameRunning) {
        if (gameOverScreenVisible) {
            drawGameOverScreen();
        }
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();

    zombies.sort((a, b) => a.y - b.y);

    zombies.forEach((zombie, index) => {
        zombie.update();
        zombie.draw();
        if (zombie.x + zombie.width < 0) {
            zombies.splice(index, 1);
            lives--;
            if (lives <= 0) {
                endGame();
            }
        }
    });

    drawHearts();
    drawScore();
    drawCrosshair();
    updateAnimation();

    requestAnimationFrame(updateGame);
}

canvas.addEventListener("mousemove", (event) => {
    mouseX = event.offsetX;
    mouseY = event.offsetY;
});

canvas.addEventListener("click", (event) => {
    if (!gameRunning) return;

    const { offsetX, offsetY } = event;
    let hit = false;
    zombies.forEach((zombie, index) => {
        if (
            offsetX > zombie.x &&
            offsetX < zombie.x + zombie.width &&
            offsetY > zombie.y &&
            offsetY < zombie.y + zombie.height
        ) {
            hit = true;
            score += 20;
            zombies.splice(index, 1);
        }
    });
    if (!hit) {
        if(score == 0) {
            score = 0
        }
        else {
        score -= 5;
        }
    }
});

function endGame() {
    gameRunning = false;
    gameOverSound.play();
    gameOverScreenVisible = true;
}

function restartGame() {
    score = 0;
    lives = 3;
    zombies = [];
    gameRunning = true;
    gameOverScreenVisible = false;
    spawnZombie();
    updateGame();
}

function startGame() {
    startScreenVisible = false;
    gameRunning = true;
    spawnZombie();
    setInterval(spawnZombie, 1000);
    updateGame();
}

function render() {
    if (startScreenVisible) {
        drawStartScreen();
    } else if (!gameRunning && gameOverScreenVisible) {
        drawGameOverScreen();
    }
}

render();
