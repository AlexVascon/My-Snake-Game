import theSnake from './snake.js'
import score from './game.js'
const chompAudio = new Audio('/sounds/aud_chomp.mp3')

class Food {
    constructor() {
        this.body = { x: 13, y: 13 },
        this.eaten = 0
    }

    draw(gameBoard) {
        const foodElement = document.createElement('div')
        foodElement.style.gridRowStart = this.body.x
        foodElement.style.gridColumnStart = this.body.y
        foodElement.classList.add('food')
        gameBoard.appendChild(foodElement)
    }

    // compare food position with snake segment 
    onSnake(snake) {
        return this.body.x === snake.x && this.body.y === snake.y
    }

    // loop and compare food position against each snake segment
    comparePosition(snake) {
        for(let i = 0; i < snake.body.length; i++) {
            if(this.onSnake(snake.body[i])) return true
        } return false
    }

    // change food location 
    moveInRelationTo(snake) {
        // change food position (random). Check it wont land on snake. 
        // loop until condition satisfied. Set food to new co-ordinates.
         while(this.comparePosition(snake)) {
            this.body = this.generateRandomPosition()
        }
    }

    generateRandomPosition() {
        // grid starts at 1, not 0, so add + 1 so 0 is never returned
        return {
            x: Math.floor(Math.random() * 21) + 1, 
            y: Math.floor(Math.random() * 21) + 1
        }
    }

    // check and update status of apple 
    update() {
        if(this.comparePosition(theSnake)) {
            chompAudio.play()
            score.points += 5000
            this.eaten++
            theSnake.addSegment(1)
            this.moveInRelationTo(theSnake)
            return true
        }
        return false
    }

}

// export food item. It follows the singleton pattern so,
// the same food item will be used/updated across multiple files
const apple = new Food()
export default apple;