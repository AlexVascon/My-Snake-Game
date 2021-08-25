import display from "./display.js";
import food from "./food.js";
import snake from "./snake.js";
import canvasSnake from "./canvasSnake.js";
import canvasFood from "./canvasFood.js";
const score = { points: 0 };
let gameInPlayId;
const thudAudio = new Audio('/sounds/carDoor1.mp3')



const canvas = document.getElementById('board')
const ctx = canvas.getContext('2d')
let x = (canvas.width / 2) + 50
let y = (canvas.height / 2) + 50
let scale = Math.floor(canvas.width / 21)

canvasSnake.setPosition(x,y)
canvasSnake.setSize(scale,scale)
canvasFood.setSize(scale,scale)

startMenu()
setUp()



function setUp() {
  gameInPlayId = setInterval(() => {
    if(!gameOverTwo()) {
      ctx.clearRect(0,0, canvas.width, canvas.height)
      canvasSnake.update(canvas)
      canvasFood.update(ctx)
      canvasSnake.draw(ctx)
      canvasFood.draw(ctx)
    } 
    
  }, 250)
}

function gameOverTwo() {
  if(canvasSnake.hitSelf() || canvasSnake.outsideGrid()) {
    thudAudio.play()
    clearInterval(gameInPlayId)
    canvasSnake.deadAnimation(ctx)
    setTimeout(function () {
      scoreBoardScreen();
    }, canvasSnake.body.length * 200);
    return true
  } return false
}

// BEGIN GAME
// showCanvas()
// startMenu();
// startGame();

function update() {
  snake.update();
  food.update();
}

function draw() {
  // remove current food and snake frames which are then replaced
  // by their updated position. Simulating movement.
  // display.FRONT_END.gameboard_div.innerHTML = "";
  snake.drawTwo()
  snake.draw(display.FRONT_END.gameboard_div);
  food.draw(display.FRONT_END.gameboard_div);
}

function startGame() {
  gameInPlayId = setInterval(function () {
    if (!gameOver()) {
      update();
      draw();
    }
  }, 200);
}

function showCanvas() {
  display.canvasBoard()
}

function reframeSnake() {
    const snkaePieces = display.FRONT_END.gameboard_div.querySelectorAll('snake')
    for(let i = 0; i < snkaePieces.length; i++) {
        snkaePieces[i].remove()
    }
}

function gameLoop() {
    update()
    draw()
}

function gameOver() {
  if (snake.outsideGrid() || snake.hitSelf()) {
    clearInterval(gameInPlayId);
    snake.deadSnakeAnimation(display.FRONT_END.gameboard_div);
    setTimeout(function () {
      scoreBoardScreen();
    }, snake.body.length * 200);
    return true;
  }
  return false;
}

function startMenu() {
  // display.makeStartScreen();
  display.makeCanvasScreen()
}

function scoreBoardScreen() {
  display.makeScoreBoardScreen();
}

export default score

