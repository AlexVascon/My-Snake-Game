import display from "./display.js";
import CanvasSnake from "./canvasSnake.js";
let canvasSnake = new CanvasSnake();
import CanvasFood from "./canvasFood.js";
let canvasFood = new CanvasFood();

const score = { points: 0 };
const thudAudio = new Audio('sounds/carDoor1.mp3')
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
let gameInPlayId = null // you stop the game by invoking cancelAnimationFrame(gameInPlayId) on this id

function gameReset(){
  score.points = 0
  gameInPlayId = null
  snakeSpeed = 1
 canvasSnake = new CanvasSnake();
 canvasFood = new CanvasFood();
 x = (canvas.width / 2) + 50
 y = (canvas.height / 2) + 50
 scale = Math.floor(canvas.width / 21)
 canvasSnake.setPosition(x,y)
 canvasSnake.setSize(scale,scale)
 canvasFood.setSize(scale,scale)
}

function gameLoop() {
    if(!gameOver()) {
      ctx.clearRect(0,0, canvas.width, canvas.height)
      canvasSnake.update(gameInPlayId)
      score.points += canvasFood.update(canvasSnake)
      canvasFood.draw(ctx, gameInPlayId)
      canvasSnake.draw(ctx)
      gameInPlayId = requestAnimationFrame(gameLoop) // this generates a running number from 1 to infinity
    }else{
      cancelAnimationFrame(gameInPlayId)
    }
}

function gameOver() {
  if(canvasSnake.hitSelf() || canvasSnake.outsideGrid()) {
    thudAudio.play()
    localScore()
    canvasSnake.deadAnimation(ctx)
    setTimeout(function () {
      scoreBoardScreen();
    }, canvasSnake.body.length * 200);
    return true
  } return false
}

function startMenu() {
  display.displayMainMenuScreen()
}

function scoreBoardScreen() {
  console.log('here')
  display.displayScoreBoardScreen(gameReset, gameLoop);
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


//GAME START
startMenu()
gameLoop()

export default score

