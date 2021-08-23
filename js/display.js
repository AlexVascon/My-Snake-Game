import score from './game.js'
const gameAudio = new Audio('/sounds/samovar-party.mp3')
gameAudio.loop = true


class Display {
    constructor() {
        this.FRONT_END = { 
            background: document.body,
            start_div: document.getElementById('start-screen'),
            gameboard_div: document.getElementById('game-board'),
            scoreboard_div: document.getElementById('final-score')
        },
        this.BACKGROUNDS = {
            yellow: `url("/images/vector-NOV-2020-32_generated.jpg")`,
            purple: `url("/images/vecteezy_Lavender-Lilac-Background-2_ir1020__generated.jpg")`,
            black: `url("/images/Vecteezy_Black_Background_AP0920_Vecteezy_Black_Background_AP0920-01.jpg")`
        }

    }
    
    startGameScreen() {
        this.FRONT_END.background.style.backgroundImage = this.BACKGROUNDS.yellow
        this.FRONT_END.start_div.classList.add('start-screen')
        const startText = document.createElement('h1')
        startText.innerText = "START"
        this.FRONT_END.start_div.appendChild(startText)
    }

    startGameEvent() {
        this.FRONT_END.start_div.addEventListener('click', () => {
        this.FRONT_END.start_div.classList.remove('start-screen')
        this.FRONT_END.start_div.remove()
        this.gameBoardScreen()
        gameAudio.play()
        })
    }

    makeStartScreen() {
        this.startGameScreen()
        this.startGameEvent()
    }

    gameBoardScreen() {
        this.FRONT_END.background.style.backgroundImage = this.BACKGROUNDS.purple
        this.FRONT_END.gameboard_div.classList.add('game-board')
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
        this.FRONT_END.gameboard_div.classList.remove('game-board')
        this.scoreBoardScreen()
        gameAudio.pause()
    }
}

const display = new Display()
export default display