class Snake {
  constructor() {
    (this.body = [{ x: 10, y: 11 }]),
      (this.changeDirection = { x: 0, y: 0 }),
      (this.lastDirection = { moving: "" }),
      (this.SNAKE_HEAD = 0),
      (this.move = { up: -1, down: 1, left: -1, right: 1, unchanged: 0 }),
      (this.thudAudio = new Audio("/sounds/carDoor1.mp3"));
  }

  draw(gameBoard) {
    this.body.forEach((segment) => {
      const snakeElement = document.createElement("div");
      snakeElement.style.gridRowStart = segment.x;
      snakeElement.style.gridColumnStart = segment.y;
      snakeElement.classList.add("snake");
      gameBoard.appendChild(snakeElement);
    });
  }

  drawTwo() {
    const canvas = document.getElementById('board')
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = "blue";
    ctx.fillRect(30,30,50,50)
  }

  update() {
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

    for (let i = this.body.length - 2; i >= 0; i--) {
      this.body[i + 1] = { x: this.body[i].x, y: this.body[i].y };
    }

    // use += to update position on x & y axis.
    // example: (x = 14) is the same as (x = row 14). 14 + 1 movies row up. 14 - 1 this.moves row down
    this.body[this.SNAKE_HEAD].x += this.changeDirection.x;
    this.body[this.SNAKE_HEAD].y += this.changeDirection.y;
  }

  addSegment(amount) {
    for (let i = 0; i < amount; i++) {
      this.body.push({ ...this.body[this.body.length - 1] });
    }
    amount = 0;
  }

  outsideGrid() {
    let isOutside = false;
    switch (this.lastDirection.moving) {
      case "DOWN":
        isOutside = this.body[this.SNAKE_HEAD].x + 1 > 21;
        break;
      case "UP":
        isOutside = this.body[this.SNAKE_HEAD].x - 1 < 1;
        break;
      case "RIGHT":
        isOutside = this.body[this.SNAKE_HEAD].y + 1 > 21;
        break;
      case "LEFT":
        isOutside = this.body[this.SNAKE_HEAD].y - 1 < 1;
        break;
    }
    return isOutside;
  }

  hitSelf() {
    for (let i = 2; i < this.body.length; i++) {
      if (
        this.body[i].x === this.body[this.SNAKE_HEAD].x &&
        this.body[i].y === this.body[this.SNAKE_HEAD].y
      ) {
        this.thudAudio.play();
        return true;
      }
    }
    return false;
  }

  deadSnakeAnimation(gameBoard) {
    const SNAKE_BODY = gameBoard.getElementsByClassName("snake");
    for (let i = 0; i < SNAKE_BODY.length; i++) {
      setTimeout(function () {
        SNAKE_BODY[i].style.backgroundColor = "red";
      }, 200 * i);
    }
  }
}

const theSnake = new Snake();
export default theSnake;
