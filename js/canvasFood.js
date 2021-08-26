
class CanvasFood {
    constructor() {
        this.image = new Image()
        this.image.src = "images/—Pngtree—red apple vector_5866014.png";
        this.body = { x: 0, y: 0},
        this.size = { width: 0, height: 0 },
        this.chompAudio = new Audio('sounds/aud_chomp.mp3'),
        this.angle = 0,
        this.counter = 25,
        this.timer = 0,
        this.amountFoodEaten = 0;
    }

    update(canvasSnake) {
        if(this.eatenBySnakeHead(canvasSnake)) {
            this.chompAudio.play()
            canvasSnake.grow(1)
            this.respawn()
            this.amountFoodEaten++
            canvasSnake.checkToIncreaseSpeed(this.amountFoodEaten)
            return 5000
        }
        return 0
    }

    draw(ctx) {
        if(this.timer > 660) {
            this.angle = 0
            this.timer = 0
        }
        ctx.imageSmoothingEnabled = false
        if(this.timer < 240) {
            this.rotation(ctx, this.incrementAngle())
        }
        if(this.timer >= 240 && this.timer < 360) {
            this.jump(ctx)
        }
        if(this.timer >=360 && this.timer <= 460) {
            if(this.timer <= 380 || (this.timer > 400 && this.timer <= 420)) {
                this.shake(ctx,25)
            } else {
                this.shake(ctx,-25)
            }
        }
        if(this.timer >460 && this.timer <= 560) {
            if(this.timer < 480 || (this.timer > 500 && this.timer < 520)) {
                ctx.drawImage(this.image, (this.body.x - 20), (this.body.y +50), this.size.width + (this.size.width / 2) - 10, (this.size.height / 2))
            } else {
                ctx.drawImage(this.image, this.body.x -5 , (this.body.y -30), this.size.width + (this.size.width / 2) - 40, this.size.height + (this.size.height / 2) - 40)
            }
            
        }
        if(this.timer > 560 && this.timer <= 660) {
            if(this.timer <= 580 || (this.timer > 600 && this.timer <= 620)) {
                this.shake(ctx,45)
            } else {
                this.shake(ctx,-45)
            }
        }

        this.timer ++
        // ctx.drawImage(this.image, this.body.x, this.body.y, this.size.width, this.size.height)
    }

    incrementAngle() {
        if(this.timer <= 120) {
            if(this.timer < 20 || (this.timer > 40 && this.timer <= 60 ) || (this.timer > 80 && this.timer <= 100)) {
                this.angle = 0
            } else {
                this.angle = 45
            }
        } else {
            if((this.timer > 120  && this.timer < 140) || (this.timer > 160 && this.timer < 180) || (this.timer > 200 && this.timer < 220)) {
                this.angle = 0
            } else {
                this.angle = -45
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
        if(this.timer <=255 || (this.timer >270 && this.timer <= 285) || (this.timer > 305 && this.timer <= 320) || this.timer > 335) {
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

    squeeze() {
        ctx.drawImage(this.image, this.body.x , (this.body.y +80), this.size.width, (this.size.height / 2))
    }

    setSize(width, height) {
        this.size.width = width
        this.size.height = height
    }

    setPosition(x,y) {
        this.body.x = x
        this.body.y = y
    }

    spawnedOnSnakeSegment(snake) {
        return this.body.x === snake.x && this.body.y === snake.y
    }

    checkAllSnakeSegments(snake) {
        for(let i = 0; i < snake.body.length; i++) {
            if(this.spawnedOnSnakeSegment(snake.body[i])) {
                return true
            }
        } return false
    }

    eatenBySnakeHead(snake) {
        return this.body.x === snake.head.x && this.body.y === snake.head.y
    }

    respawn() {
        this.body = this.generateRandomXYLocation()
    }

    generateRandomXYLocation() {
        return  {
            x: Math.floor(Math.random() * 21) * 100,
            y: Math.floor(Math.random() * 21) * 100
        }
    }

    checkNotSpawnedOnSnake(snake) {
        while(this.checkAllSnakeSegments(snake)) {
            this.respawn()
        }
    }


}

export default CanvasFood