import score from './game.js'
const gameAudio = new Audio('/sounds/samovar-party.mp3')
gameAudio.loop = true


class Display {
    constructor() {
        this.FRONT_END = { 
            background: document.body,
            start_div: document.getElementById('start-screen'),
            gameboard_div: document.getElementById('board'),
            scoreboard_div: document.getElementById('final-score')
        },
        this.BACKGROUNDS = {
            yellow: `url("/images/vector-NOV-2020-32_generated.jpg")`,
            purple: `url("/images/vecteezy_Lavender-Lilac-Background-2_ir1020__generated.jpg")`,
            black: `url("/images/Vecteezy_Black_Background_AP0920_Vecteezy_Black_Background_AP0920-01.jpg")`
        },
        this.restartBtnHit = false;

    }
    
    startGameScreen() {
        this.FRONT_END.background.style.backgroundImage = this.BACKGROUNDS.yellow
        this.FRONT_END.start_div.classList.add('start-screen')
        const startButtonDiv = document.createElement('div')
        const startText = document.createElement('h1')
        startText.innerText = "START"
        startButtonDiv.appendChild(startText)
        this.FRONT_END.start_div.appendChild(startButtonDiv)
        this.displayHighScores()
    }

    startGameEvent() {
        this.FRONT_END.start_div.addEventListener('click', () => {
        this.FRONT_END.start_div.style.display = "none"
        this.canvasScreen()
        gameAudio.play()
        })
    }

    makeStartScreen() {
        this.startGameScreen()
        this.startGameEvent()
    }

    gameBoardScreen() {
        this.FRONT_END.background.style.backgroundImage = this.BACKGROUNDS.purple
        this.FRONT_END.gameboard_div.classList.add('board')
    }

    canvasScreen() {
        this.FRONT_END.background.style.backgroundImage = this.BACKGROUNDS.purple
        this.FRONT_END.gameboard_div.style.display = "initial"
        this.FRONT_END.gameboard_div.classList.add('board')
    }

    makeCanvasScreen() {
        this.startGameScreen()
        this.startGameEvent()
    }

    scoreBoardScreen(){
        this.FRONT_END.background.style.backgroundImage = this.BACKGROUNDS.black
        const textContainer = document.createElement('div')
        const scoreText = document.createElement('span')
        scoreText.innerText = "Score: "
        const points = document.createElement('h2')
        points.innerText = " "+ score.points 
        textContainer.appendChild(scoreText)
        textContainer.appendChild(points)
        this.FRONT_END.scoreboard_div.appendChild(textContainer)
        this.FRONT_END.scoreboard_div.classList.add('score-board')
    }
    
    makeScoreBoardScreen() {
        // this.FRONT_END.gameboard_div.classList.remove('board')
        this.FRONT_END.gameboard_div.style.display = "none"
        this.scoreBoardScreen()
        this.restartButton()
        gameAudio.pause()
    }

    displayHighScores() {
        const firstPlace = document.createElement('h2')
        const secondPlace = document.createElement('h3')
        const thirdPlace = document.createElement('h4')
        firstPlace.innerText = "first. " + localStorage.getItem('one')
        secondPlace.innerText = "second. " + localStorage.getItem('two')
        thirdPlace.innerText = "third. " + localStorage.getItem('three')
        this.FRONT_END.start_div.appendChild(firstPlace)
        this.FRONT_END.start_div.appendChild(secondPlace)
        this.FRONT_END.start_div.appendChild(thirdPlace)
    }

    restartButton() {
        const restartBtn = document.createElement('div')
        restartBtn.innerText = "RESTART"
        restartBtn.classList.add('restart-btn')
        this.FRONT_END.scoreboard_div.appendChild(restartBtn)
        restartBtn.addEventListener('click', () => {
            this.restartBtnHit = true;
            this.FRONT_END.scoreboard_div.style.display = "none"
            this.FRONT_END.start_div.style.display = "initial"
            this.FRONT_END.start_div.classList.add('start-screen')
            this.FRONT_END.background.style.backgroundImage = this.BACKGROUNDS.yellow
        }) 
    }

    restartBtnPressed() {
        return this.restartBtnHit
    }
}

const display = new Display()
export default display