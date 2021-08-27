# Snake Game

## Description
---

Snake Game is a game where, you guessed it, you play as a snake slithering around the screen trying to eat as many apples as possible (it also dances) while increasing in size each time an apple is consumed. You control the snake with the arrow keys. The apple respawns randomly on the board and the snake speed increases after every 5 apples consumed. The game ends when the snake collides with the boarder or hits itself. Then you are shown your score which accumilated from every apple eaten (5000)

## MVP (DOM-CANVAS)
---
* game has one snake and one apple
* move snake using arrow keys
* apple respawns to random location once eaten by snake head
* snake body increases by one segment each time it eats an apple and attaches to tail end
* snake body follows head movement accordingly
* snake dies when it collides with wall or hits self
* increase snake speed after several apples have been eaten
* create and display start screen on first load (using DOM)
* press start hides start screen, creates and then displays game board
* once snake dies, game board is hidden and scoreboard is created and displayed
* scoreboard displays your score
* restart button hides scoreboard and displays now existing start screen

## Backlog
---
* added start, game and scoreboard screen
* ability to see your current highscore on start screen 

## Data Structure
---

## game.js
---
* gameReset() {}
* gameLoop() {}
* gameOver() {}
* startMenu() {}
* scoreBoardScreen() {}
* localScore() {}

## display.js
---

* Display() { this.FRONT_END; this.BACKGROUNDS; this.restartBtnHit }
* createMainMenuVisuals() {}
* clickStartBtnLoadGame() {}
* displayMainMenuScreen() {}
* createGameBoardVisuals() {}
* createScoreBoardVisuals() {}
* displayScoreBoardScreen() {}
* createHighScoresVisuals() {}
* restartButton() {}

## canvasSnake.js
---
* CanvasSnake() {
        this.head = { x: 0, y: 0 }
        this.body = []
        this.size = { width: 0, height: 0 },
        this.changeDirection = { x: 0, y: 0 },
        this.lastDirection = { moving: "" },
        this.move = { up: -100, down: 100, left: -100, right: 100, unchanged: 0 },
        this.increase = 0;
    }
* draw() {}
* update() {}
* outsideGrid() {}
* setPosition() {}
* setSize() {}
* hitSelf() {}
* grow() {}
* checkToIncreaseSpeed() {}
* deadAnimation() {}

## canvasFood.js
---
* CanvasSnake() {
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
* update() {}
* draw() {}
* incrementAngle() {}
* rotation() {}
* jump() {}
* shake() {}
* squeeze() {}
* setSize() {}
* setPosition() {}
* spawnedOnSnakeSegment() {}
* checkAllSnakeSegments() {}
* eatenBySnakeHead() {}
* respawn() {}
* generateRandomXYLocation() {}
* checkNotSpawnedOnSnake() {}

## State and States Transitions
---
Definition of the different states and their transition (transition functions)

* start-screen
* board
* final-score

## Task
---

* display - createMainMenuVisuals
* display - clickStartBtn
* display - clickStartBtnLoadGame
* display - displayMainMenuScreen
* display - createGameBoardVisuals
* game - gameReset
* game - gameLoop

## Links
---
[Yellow background](https://www.vecteezy.com/free-vector/web "Web Vectors by Vecteezy")








