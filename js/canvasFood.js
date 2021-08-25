
class CanvasFood {
    constructor() {
        this.image = new Image()
        this.image.src = "/images/—Pngtree—red apple vector_5866014.png";
        this.body = { x: 0, y: 0},
        this.size = { width: 0, height: 0 },
        this.chompAudio = new Audio('/sounds/aud_chomp.mp3'),
        this.angle = 0,
        this.counter = 25,
        this.timer = 0,
        this.eatenBySnakeHeadBySnake = 0;
    }

    update(canvasSnake) {
        if(this.eatenBySnakeHead(canvasSnake)) {
            this.chompAudio.play()
            canvasSnake.grow(1)
            this.respawn()
            this.eatenBySnakeHeadBySnake++
            return 5000
        }
        return 0
    }

    draw(ctx) {
        if(this.timer > 500) {
            this.timer = 0
        }
        ctx.imageSmoothingEnabled = false
        if(this.timer <= 300) {
            this.rotation(ctx, this.incrementAngle())
        }
        if(this.timer > 300 && this.timer < 400) {
            this.jump(ctx)
        }
        if(this.timer >= 400 && this.timer <= 500) {
            if(this.timer % 20 === 0) {
                this.shake(ctx,25)
            } else {
                this.shake(ctx,-25)
            }
        }

        this.timer ++
        // ctx.drawImage(this.image, this.body.x, this.body.y, this.size.width, this.size.height)
    }

    incrementAngle() {
        this.angle+=this.counter;
    
        if(this.timer <= 100) {
            this.counter = 1
            if(this.angle >= 45) {
                this.angle = 0;  
            }
        } else {
            this.counter = -1
           if(this.angle <= -45) {
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
        if(this.timer % 20 === 0) {
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


}

export default CanvasFood