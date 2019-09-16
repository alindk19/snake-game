var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var grid = 10;
var keyCode = 39;
var highscore = 0;
var trace = 0;
var pause = [];
if (localStorage.getItem("highscore") == null) {
    localStorage.setItem("highscore", highscore);
} else
    highscore = localStorage.getItem("highscore");


var hScore = document.getElementById("score");
var htScore = document.getElementById("highScore");
htScore.innerHTML = "High Score : " + highscore;
var apple = {
    x: 320,
    y: 320
};
var keyCode = 39;
var snake = {
    x: 50,
    y: 50,
    score:0,
    cells: [{
        x: 60,
        y: 50
    }, {
        x: 50,
        y: 50
    }]
};

function initialize() {

    trace = 0;
    apple = {
        x: 320,
        y: 320
    };
    keyCode = 39;
    snake = {
        x: 50,
        y: 50,
        score: 0,
        dir:39,
        cells: [{
            x: 60,
            y: 50
        }, {
            x: 50,
            y: 50
        }]
    };
    hScore.innerHTML = "Score : " + snake.score;

}
if(localStorage.pause)
{
    snake = JSON.parse(localStorage.pause);
    hScore.innerHTML = "Score : " + snake.score;
    keyCode=80;
}
function startGame() {
    drawApple();
    drawSnake();
    var doesntMatter = setInterval(function () {
        if (snake.x + 10 > 500 || snake.y + 10 > 500 || snake.x - 10 < -10 || snake.y - 10 < -10) {

            if (highscore < snake.score) {
                highscore = snake.score;
                localStorage.setItem("highscore", highscore);
            }
            if (confirm("Game Over, Wanna Play Again")) {
                hScore.innerHTML = "Score : 0";
                htScore.innerHTML = "High Score : " + highscore;
                localStorage.removeItem("pause");
                initialize();
                startGame();
            }
            clearInterval(doesntMatter);
        }
        if (keyCode == 37 || keyCode == 38 || keyCode == 39 || keyCode == 40) {
            if (keyCode == 37)
                snake.x -= 10;
            else if (keyCode == 38)
                snake.y -= 10;
            else if (keyCode == 39)
                snake.x += 10;
            else if (keyCode == 40)
                snake.y += 10;
            canvas.width = canvas.width;
            moveSnake();
        }
    }, 50);
}

function drawApple() {
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
}

function drawSnake() {

    var color;
    for (let i = 0; i < snake.cells.length; i++) {
        color = (i == 0) ? "blue" : "yellow";
        context.fillStyle = color;
        context.fillRect(snake.cells[i].x, snake.cells[i].y, grid, grid);
    }
}

function moveSnake() {
    snake.cells.unshift({
        x: snake.x,
        y: snake.y
    });
    snake.cells.pop();
    drawSnake();
    if (isFoodEat()) {
        snake.cells.push(apple);
        snake.score++;
        newFood();
    } else {
        drawApple();
    }
    localStorage.removeItem("pause");
    localStorage.pause= JSON.stringify(snake);
}

function newFood() {
    apple.x = Math.floor((Math.random() * 50) + 0) * 10;
    apple.y = Math.floor((Math.random() * 50) + 0) * 10;
    hScore.innerHTML = "Score : " + snake.score;
    canvas.width = canvas.width;
}

function isFoodEat() {
    if (snake.x == apple.x && snake.y == apple.y)
        return true;
    return false;
}
document.addEventListener('keydown', function (e) {
    if (e.keyCode == 37 && keyCode != 39) {
        keyCode = 37;
    }
    //up
    else if (e.keyCode == 38 && keyCode != 40) {
        keyCode = 38;
    }
    //right
    else if (e.keyCode == 39 && keyCode != 37) {
        keyCode = 39;
    }
    //down
    else if (e.keyCode == 40 && keyCode != 38) {
        keyCode = 40;
    }
    //pause
    else if (e.keyCode == 80) {
        if (keyCode != 80) {
            trace = keyCode;
            keyCode = event.keyCode;
            snake.dir=trace;
            
        } else {
            keyCode=snake.dir;
            localStorage.removeItem("pause");
        }
    }
});