import canvasSnake from './canvasSnake.js'
import score from './game.js'

const image = new Image()
image.src = "/images/—Pngtree—red apple vector_5866014.png";



class CanvasFood {
    constructor() {
        this.body = { x: 0, y: 0},
        this.image = image,
        this.size = { width: 0, height: 0 },
        this.chompAudio = new Audio('/sounds/aud_chomp.mp3')

    }

    update() {
        if(this.eaten(canvasSnake)) {
            this.chompAudio.play()
            score.points += 5000
            canvasSnake.grow(1)
            this.move()
        }
    }

    draw(ctx) {
        ctx.imageSmoothingEnabled = false
        ctx.drawImage(image, this.body.x, this.body.y, this.size.width, this.size.height)
    }

    setSize(width, height) {
        this.size.width = width
        this.size.height = height
    }

    startLocation(x,y) {
        this.body.x = x
        this.body.y = y
    }

    onSnake(snake) {
        return this.body.x === snake.x && this.body.y === snake.y
    }

    samePosition(snake) {
        for(let i = 0; i < snake.body.length; i++) {
            if(this.onSnake(snake.body[i])) {
                return true
            }
        } return false
    }

    eaten(snake) {
        return this.body.x === snake.head.x && this.body.y === snake.head.y
    }

    move() {
        this.body = this.generateRandomLocation()
    }

    generateRandomLocation() {
        return  {
            x: Math.floor(Math.random() * 21) * 100,
            y: Math.floor(Math.random() * 21) * 100
        }
    }


}

const canvasFood = new CanvasFood()
export default canvasFood