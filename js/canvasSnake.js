
class CanvasSnake {
    constructor() {
        this.head = { x: 0, y: 0 }
        this.body = []
        this.size = { width: 0, height: 0 },
        this.changeDirection = { x: 0, y: 0 },
        this.lastDirection = { moving: "" },
        this.move = { up: -100, down: 100, left: -100, right: 100, unchanged: 0 },
        this.increase = 0;
    }

    draw(ctx) {
        ctx.save()
        ctx.fillStyle = 'hsl(184, 100%, 50%)'
        for(let i = 0; i < this.body.length; i++) {
            ctx.fillRect(this.body[i].x, this.body[i].y, this.size.width,this.size.height )
        }
        ctx.fillRect(this.head.x, this.head.y,this.size.width,this.size.height )
    }

    update(frameNumber) {
        // main file addEventListener("keydown", snake.move)
        window.addEventListener("keydown", (e) => {
          switch (e.key) {
            case "ArrowUp":
              if (this.lastDirection.moving === "DOWN") break;
              this.changeDirection = { x: this.move.up, y: this.move.unchanged };
              this.lastDirection.moving = "UP";
              break;
            case "ArrowDown":
              if (this.lastDirection.moving === "UP") break;
              this.changeDirection = { x: this.move.down, y: this.move.unchanged };
              this.lastDirection.moving = "DOWN";
              break;
            case "ArrowLeft":
              if (this.lastDirection.moving === "RIGHT") break;
              this.changeDirection = { x: this.move.unchanged, y: this.move.left };
              this.lastDirection.moving = "LEFT";
              break;
            case "ArrowRight":
              if (this.lastDirection.moving === "LEFT") break;
              this.changeDirection = { x: this.move.unchanged, y: this.move.right };
              this.lastDirection.moving = "RIGHT";
              break;
          }
        });

        let frameRate = 8

        if(this.increase === 1) {
          frameRate = 6
        }

        if(this.increase === 2) {
          frameRate = 5
        }
        if(this.increase === 3) {
          frameRate = 4
        }

        if(frameNumber % frameRate === 0){
          for(let i = 0; i < this.body.length; i++){
              this.body[i] = this.body[i+1]
          }
          if(this.body.length !== 0) {
              this.body[this.body.length-1] = { x: this.head.x, y: this.head.y}
          }}

          this.head.x += frameNumber % frameRate === 0 ? this.changeDirection.y : 0
          this.head.y += frameNumber % frameRate === 0 ? this.changeDirection.x : 0
        
    }

    outsideGrid() {
        let isOutside = false;
        switch (this.lastDirection.moving) {
          case "DOWN":
            isOutside = this.head.y >= 2100;
            break;
          case "UP":
            isOutside = this.head.y < 0;
            break;
          case "RIGHT":
            isOutside = this.head.x >= 2100;
            break;
          case "LEFT":
            isOutside = this.head.x < 0;
            break;
        }
        return isOutside;
      }

    setPosition(x,y) {
        this.head.x = x
        this.head.y = y
    }

    setSize(width, height) {
        this.size.width = width
        this.size.height = height
    }

    hitSelf() {
        for (let i = 2; i < this.body.length; i++) {
          if (
            this.body[i].x === this.head.x &&
            this.body[i].y === this.head.y
          ) {
            return true;
          }
        }
        return false;
      }

    grow(amount) {
        for(let i = 0; i < amount; i++) {
            this.body.push({ ...this.body[this.body.length - 1] });
        }
    }

    checkToIncreaseSpeed(applesEaten) {
      if(applesEaten === 5) {
        this.increase = 1
      }
      if(applesEaten === 10) {
        this.increase = 2
      }
      if(applesEaten === 15) {
        this.increase = 3
      }
    }

    deadAnimation(ctx) {
        ctx.fillStyle = 'hsl(0, 100%, 50%)'
        for (let i = this.body.length - 1; i >= 0; i--) {
            (function(i, context) {
                setTimeout(function() {
                    ctx.fillRect(context.body[i].x, context.body[i].y, 100,100 )
                }, 2000 / context.body.length)
            })(i, this)
        }
    }

}


export default CanvasSnake