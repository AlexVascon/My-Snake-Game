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
    display.FRONT_END.gameboard_div.innerHTML = ''
    snake.draw(display.FRONT_END.gameboard_div)
    food.draw(display.FRONT_END.gameboard_div)
}

function startGame() {
    gameInPlayId = setInterval(function(){
        if(!gameOver()) {      
        update()
        draw()
        } 
    }, 200)
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
    if(snake.outsideGrid() || snake.hitSelf()) {
        clearInterval(gameInPlayId)
        snake.deadSnakeAnimation(display.FRONT_END.gameboard_div)
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
