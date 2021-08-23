import display from './display.js'
import  food  from './food.js'
import snake from './snake.js'
const score = { points: 0 }
let gameInPlayId

// BEGIN GAME
startMenu()
startGame()


function update() {
    snake.update()
    food.update()
}

function draw() {
    // remove current food and snake frames which are then replaced 
    // by their updated position. Simulating movement.
    display.frontEnd.gameboard_div.innerHTML = ''
    snake.draw(display.frontEnd.gameboard_div)
    food.draw(display.frontEnd.gameboard_div)
}

function startGame() {
    gameInPlayId = setInterval(function(){
        if(!gameOver()) {      
        update()
        draw()
        } 
    }, 200)
}

function gameOver() {
    if(snake.outsideGrid()) {
        clearInterval(gameInPlayId)
        snake.deadSnakeAnimation(display.frontEnd.gameboard_div)
        setTimeout(function () {
            scoreBoardScreen()
        }, snake.body.length * 200)
        return true
    } 
    return false
}

function startMenu() {
    display.makeStartScreen()
}

function scoreBoardScreen() {
    display.makeScoreBoardScreen()
}

export default score
