import canvasSnake from './canvasSnake.js'
import score from './game.js'

const image = new Image()
image.src = "/images/—Pngtree—red apple vector_5866014.png";



class CanvasFood {
    constructor() {
        this.body = { x: 0, y: 0},
        this.image = image,
        this.size = { width: 0, height: 0 },
        this.chompAudio = new Audio('/sounds/aud_chomp.mp3'),
        this.angle = 0,
        this.counter = 25,
        this.timer = 0,
        this.eatenBySnake = 0;

    }

    update(ctx) {
        if(this.eaten(canvasSnake)) {
            this.chompAudio.play()
            score.points += 5000
            canvasSnake.grow(1)
            this.move()
            this.eatenBySnake++
        }
    }

    draw(ctx) {
        if(this.timer > 50) {
            this.timer = 0
        }
        ctx.imageSmoothingEnabled = false
        if(this.timer <= 30) {
            this.rotation(ctx, this.incrementAngle())
        }
        if(this.timer > 30 && this.timer < 40) {
            this.jump(ctx)
        }
        if(this.timer >= 40 && this.timer <= 50) {
            if(this.timer % 2 === 0) {
                this.shake(ctx,25)
            } else {
                this.shake(ctx,-25)
            }
        }
        // if(this.timer >=50 ) {
        //     this.angleJump(ctx,25)
        // }

        this.timer ++

        // ctx.drawImage(this.image, this.body.x, this.body.y, this.size.width, this.size.height)

    }

    incrementAngle() {
        this.angle+=this.counter;
        if(this.timer < 15) {
            this.counter = 30
            if(this.angle > 59) {
                this.angle = 0;
                
            }
        } else {
            this.counter = -30
           if(this.angle < -59) {
                this.angle = 0;
            }
        }
    }

    rotation(ctx, deg) {
            // Store the current context state (i.e. rotation, translation etc..)
    ctx.save()

    //Convert degrees to radian 
    var rad = this.angle * Math.PI / 180;

    //Set the origin to the center of the image
    ctx.translate(this.body.x + this.size.width / 2, this.body.y + this.size.height / 2);

    //Rotate the canvas around the origin
    ctx.rotate(rad);

    //draw the image    
    ctx.drawImage(this.image,this.size.width / 2 * (-1),this.size.height / 2 * (-1),this.size.width,this.size.height);

    // Restore canvas state as saved from above
    ctx.restore();

    }

    jump(ctx) {
        ctx.save()
        ctx.translate(this.body.x + this.size.width / 2, this.body.y + this.size.height / 2);
        if(this.timer % 2 === 0) {
        ctx.drawImage(this.image,this.size.width / 2 * (-1),(this.size.height / 2 * (-1)),this.size.width + 2,this.size.height);
        } else {
        ctx.drawImage(this.image,this.size.width / 2 * (-1),(this.size.height / 2 * (-1)) - 20,this.size.width + 2,this.size.height);
        }
        ctx.restore()
    }

    shake(ctx, deg) {
        ctx.save()
        var radi = deg * Math.PI / 180;
        ctx.translate(this.body.x + this.size.width / 2, this.body.y + this.size.height / 2);
        ctx.rotate(radi);
        ctx.drawImage(this.image,this.size.width / 2 * (-1),this.size.height / 2 * (-1),this.size.width,this.size.height);
        ctx.restore()
    }

    // angleJump(ctx, deg) {
    //     ctx.save()
    //     var rado = deg * Math.PI / 180;
    //     ctx.translate(this.body.x + this.size.width / 2, this.body.y + this.size.height / 2);
    //     ctx.rotate(rado);
    //     ctx.drawImage(this.image,this.size.width / 2 * (-1),this.size.height / 2 * (-1),this.size.width,this.size.height);
    //     ctx.translate(this.body.x + this.size.width / 2, this.body.y + this.size.height / 2);
    //     if(this.timer % 2 === 0) {
    //         console.log('line 136')
    //         ctx.drawImage(this.image,this.size.width / 2 * (-1),(this.size.height / 2 * (-1)),this.size.width + 2,this.size.height);
    //     } else {
    //         console.log('line 139')
    //         ctx.drawImage(this.image,this.size.width / 2 * (-1),(this.size.height / 2 * (-1)) - 20,this.size.width + 2,this.size.height);
    //     }
    //     ctx.restore()

    // }

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