const thudAudio = new Audio('/sounds/carDoor1.mp3')
let inputDirection = { x:0, y:0 }
let currentdirection = { up:0,down:0,left:0,right:0, unchanged:0 }
const move = { up:-1,down:1,left:-1,right:1, unchanged:0 }
const SNAKE_HEAD = 0


 class Snake {
    constructor() {
        this.body = [
            {x:10,y:11},
        ]
        
    }

    draw(gameBoard) {
        this.body.forEach(segment => {
            const snakeElement = document.createElement('div')
            snakeElement.style.gridRowStart = segment.x
            snakeElement.style.gridColumnStart = segment.y
            snakeElement.classList.add('snake')
            gameBoard.appendChild(snakeElement)
        })
    }

    update() {
        window.addEventListener('keydown', e => {
            switch(e.key) {
                case 'ArrowUp':
                    if(currentdirection.down !== 0) break
                    inputDirection = { x: move.up, y: move.unchanged }
                    currentdirection = this.recordDirection('UP')
                    break
                case 'ArrowDown':
                    if(currentdirection.up !== 0) break
                    inputDirection = { x: move.down, y: move.unchanged }
                    currentdirection = this.recordDirection('DOWN')
                    break
                case 'ArrowLeft':
                    if(currentdirection.right !== 0) break
                    inputDirection = { x: move.unchanged, y: move.left }
                    currentdirection = this.recordDirection('LEFT')
                    break
                case 'ArrowRight':
                    if(currentdirection.left !== 0) break
                    inputDirection = { x: move.unchanged, y: move.right }
                    currentdirection = this.recordDirection('RIGHT')
                    break

            }
        })

        for(let i = this.body.length - 2; i >= 0; i--) {
        this.body[i + 1] = { x:this.body[i].x, y:this.body[i].y }
        }

        // use += to update position on x & y axis. 
        // example: (x = 14) is the same as (x = row 14). 14 + 1 movies row up. 14 - 1 moves row down
        this.body[SNAKE_HEAD].x += inputDirection.x
        this.body[SNAKE_HEAD].y += inputDirection.y
    }

    recordDirection(direction) {
        if(direction === 'UP') return {up:1,down:0,left:0,right:0, unchanged:0}
        if(direction === 'DOWN') return {up:0,down:1,left:0,right:0, unchanged:0}
        if(direction === 'LEFT') return {up:0,down:0,left:1,right:0, unchanged:0}
        if(direction === 'RIGHT') return {up:0,down:0,left:0,right:1, unchanged:0}
    }

    addSegment(amount) {
        for(let i = 0; i < amount; i++) {
            this.body.push({ ...this.body[this.body.length - 1] })
        }
        amount = 0
    }

    outsideGrid() {
        if(this.body[SNAKE_HEAD].x < 1 || this.body[SNAKE_HEAD].x > 21 || this.body[SNAKE_HEAD].y < 1 || this.body[SNAKE_HEAD].y > 21) {
            thudAudio.play()
            return true
        }
        return false
    }

    deadSnakeAnimation(gameBoard) {
        const SNAKE_BODY = gameBoard.querySelectorAll('.snake')
            for(let i = 0; i < SNAKE_BODY.length; i++) {
                setTimeout(function () {
                    SNAKE_BODY[i].style.backgroundColor = "red"
                }, 200 * i)
        }
    }

}

const theSnake = new Snake()
export default theSnake