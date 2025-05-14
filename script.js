let gameContainer = document.querySelector(".game-container")
let scoreContainer = document.querySelector(".score")
let popWindow = document.querySelector(".game-over")
let pauseButton = document.getElementById("img")
let music = new Audio("./musics/gorila-315977.mp3")
let foodX, foodY;
let headX = 12, headY = 12;
let velocityX = 0, velocityY = 0;
let bst = 0, bend = 26;
let speed = 150;
let snakeBody = [];
let score = 0;
let pause = 0;

function generateFood() {
    foodX = Math.floor(Math.random() * 25) + 1
    foodY = Math.floor(Math.random() * 25) + 1
    for (var i = 0; i < snakeBody.length; i++) {
        if (snakeBody[i][0] == foodX && snakeBody[i][1] == foodY) {
            generateFood();
        }
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function over() {
    popWindow.innerHTML = `Game Over`;
    await delay(1500);
    console.log("Waited 1 second after Game Over");
}

async function gameOver() {
    snakeBody = [];
    headX = 12;
    headY = 12;
    score = 0;
    velocityX = 0;
    velocityY = 0;
    generateFood();
    await over();
    popWindow.innerHTML = ``;

}
function renderGame() {
    let updateGame = `<div class="food" style="grid-area: ${foodY}/${foodX};"></div>`
    if (foodX == headX && foodY == headY) {
        snakeBody.push([foodX, foodY]);
        score += 100;
        generateFood()
    } else {
        snakeBody.pop()
    }
    headX += velocityX;
    headY += velocityY;
    snakeBody.unshift([headX, headY])
    for (var i = 1; i < snakeBody.length; i++) {
        if (snakeBody[0][0] == snakeBody[i][0] && snakeBody[0][1] == snakeBody[i][1]) {
            gameOver();
        }
    }
    if (headX == bst || headX == bend || headY == bst || headY == bend) {
        gameOver();

    }
    updateGame += `<div class="head h" style="grid-area: ${snakeBody[0][1]}/${snakeBody[0][0]};   border-radius: 30%;"></div>`
    for (let i = 1; i < snakeBody.length; i++) {
        updateGame += `<div class="head" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]};"></div>`
    }
    gameContainer.innerHTML = updateGame;
    scoreContainer.innerHTML = `<h2>Score : ${score}</h2>`

}
function play() {
    if (pause === 0) {
        pauseButton.src = "./images/pause-svgrepo-com.svg";
        music.play();
        renderGame()
    } else {
        pauseButton.src = "./images/play-svgrepo-com.svg";
        music.pause();
    }
}
generateFood()
setInterval(play, speed);
document.addEventListener("keydown", function (e) {
    let key = e.key;
    if (key === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (key === "ArrowRight" && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    } else if (key === "ArrowDown" && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (key === "ArrowUp" && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    } if (e.code === "Space") {
        if (pause === 0) {
            pause = 1;
        } else {
            pause = 0;
        }
    }

});
document.querySelector(".but1").addEventListener("click", (e) => {
    if (pause === 0) {
        pause = 1;
    } else {
        pause = 0;
    }
})
