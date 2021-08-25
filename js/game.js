import display from "./display.js";
import food from "./food.js";
import snake from "./snake.js";
import canvasSnake from "./canvasSnake.js";
import canvasFood from "./canvasFood.js";
const score = { points: 0 };
let gameInPlayId;
const thudAudio = new Audio('/sounds/carDoor1.mp3')
let snakeSpeed = 1
// CANVAS SET-UP
const canvas = document.getElementById('board')
const ctx = canvas.getContext('2d')
let x = (canvas.width / 2) + 50
let y = (canvas.height / 2) + 50
let scale = Math.floor(canvas.width / 21)
canvasSnake.setPosition(x,y)
canvasSnake.setSize(scale,scale)
canvasFood.setSize(scale,scale)
let restartGameAgain = false

//GAME START
startMenu()
setUp()

function setUp() {
  gameInPlayId = setInterval(() => {
    if(!gameOver()) {
      ctx.clearRect(0,0, canvas.width, canvas.height)
      canvasSnake.update(canvas)
      canvasFood.update(ctx)
      canvasSnake.draw(ctx)
      canvasFood.draw(ctx)
    } 
  }, 250)
}

function gameOver() {
  if(canvasSnake.hitSelf() || canvasSnake.outsideGrid()) {
    thudAudio.play()
    localScore()
    clearInterval(gameInPlayId)
    canvasSnake.deadAnimation(ctx)
    setTimeout(function () {
      scoreBoardScreen();
    }, canvasSnake.body.length * 200);
    return true
  } return false
}

// function draw() {
//   snake.drawTwo()
//   snake.draw(display.FRONT_END.gameboard_div);
//   food.draw(display.FRONT_END.gameboard_div);
// }

function startMenu() {
  display.makeCanvasScreen()
}

function scoreBoardScreen() {
  display.makeScoreBoardScreen();
}

function localScore() {
  if(Number(localStorage.getItem('three') > score.points)) return

  let scoreAsString = '' + score.points
  if(Number(localStorage.getItem('three') < score.points && Number(localStorage.getItem('two')) > score.points)) {
    localStorage.setItem('three', scoreAsString)
    return
  }
  if(Number(localStorage.getItem('two') < score.points && Number(localStorage.getItem('one')) > score.points)) {
    localStorage.setItem('three', localStorage.getItem('two'))
    localStorage.setItem('two', scoreAsString)
    return
  }
  if(Number(localStorage.getItem('one')) < score.points) {
    localStorage.setItem('three', localStorage.getItem('two'))
    localStorage.setItem('two', localStorage.getItem('one'))
    localStorage.setItem('one', scoreAsString)
    return
  }
  
}

function restartSetUp() {
  switch(restartGame) {
  
    case true:
      setUp()
  }
}

function restartGame() {
  if(display.restartBtnPressed()) {
    setUp()
  }
}


export default score

