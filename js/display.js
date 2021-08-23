import score from './game.js'
const startScreen = document.getElementById('start-screen')
const gameBoard = document.getElementById('game-board')
const scoreBoard = document.getElementById('final-score')
const gameAudio = new Audio('/sounds/samovar-party.mp3')
gameAudio.loop = true

const FRONT_END = { 
    background: document.body,
    start_div: startScreen,
    gameboard_div: gameBoard,
    scoreboard_div: scoreBoard
}
const BACKGROUNDS = {
    yellow: `url("/images/vector-NOV-2020-32_generated.jpg")`,
    purple: `url("/images/vecteezy_Lavender-Lilac-Background-2_ir1020__generated.jpg")`,
    black: `url("/images/Vecteezy_Black_Background_AP0920_Vecteezy_Black_Background_AP0920-01.jpg")`
}

class Display {
    constructor() {
        this.frontEnd = FRONT_END
    }
    
    startGameScreen() {
        FRONT_END.background.style.backgroundImage = BACKGROUNDS.yellow
        FRONT_END.start_div.classList.add('start-screen')
        const startText = document.createElement('h1')
        startText.innerText = "START"
        FRONT_END.start_div.appendChild(startText)
    }

    startGameEvent() {
        FRONT_END.start_div.addEventListener('click', () => {
        FRONT_END.start_div.classList.remove('start-screen')
        FRONT_END.start_div.remove()
        this.gameBoardScreen()
        gameAudio.play()
        })
    }

    makeStartScreen() {
        this.startGameScreen()
        this.startGameEvent()
    }

    gameBoardScreen() {
        FRONT_END.background.style.backgroundImage = BACKGROUNDS.purple
        FRONT_END.gameboard_div.classList.add('game-board')
    }

    scoreBoardScreen(){
        FRONT_END.background.style.backgroundImage = BACKGROUNDS.black
        FRONT_END.scoreboard_div.classList.add('score-board')
        FRONT_END.scoreboard_div.innerText = "Score: " + score.points + "!"
    }
    
    makeScoreBoardScreen() {
        FRONT_END.gameboard_div.classList.remove('game-board')
        this.scoreBoardScreen()
        gameAudio.pause()
    }
}

const display = new Display()
export default display