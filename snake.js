// The following code will be for a game snake. It will be a canvas-based game played with the arrow keys or WASD keys.

// The game board is represented by a canvas element, which is a HTML element that can be used to draw graphics.
// The canvas element is divided into rows and columns, and each cell on the board is represented by a rectangle.
// The size of each cell is determined by the bloack_size variable.

// Board -- Global Variables
var block_size = 25.0
var row = 20.0
var col = 20.0
var board
var context // unique to canvas
var scoreCount = 0

// snake head
var snakeX = block_size * 12 // 5 blocks from the left , the snake starts at the centre
var snakeY = block_size * 12 // 5 blocks from the top

// snake body
var snake_body = [] // Array to hold the snake's body segments

// snake velocity
var velocityX = 0
var velocityY = 0

// food
var foodX // no value => random on the board
var foodY

// game over
var game_over = false

//main function
window.onload = function () {
  // This ensures that the function runs only after the entire HTML page has loaded.
  board = document.getElementById("board") //get canvas element from html file  " <canvas id="board"></canvas>""
  board.height = row * block_size
  board.width = col * block_size
  context = board.getContext("2d")
  context.fillStyle = "black"

  context.fillRect(0, 0, board.width, board.height) // fill from [0,0] Top-left corner to [width, height] right-down coner in pixels

  document.addEventListener("keydown", change_direction)
  document.addEventListener("keydown", change_direction)
  place_Food()

  setInterval(update, 100)
}

// upadate function
function update() {
  if (game_over) {
    return
  }

  // makes sure the canvas always has its black colour
  context.fillStyle = "black"
  context.fillRect(0, 0, board.width, board.height) // Clear the canvas

  // draw food
  context.fillStyle = "yellow"
  context.fillRect(foodX, foodY, block_size, block_size)

  // food eating logic
  if (snakeX == foodX && snakeY == foodY) {
    snake_body.push([foodX, foodY])
    place_Food()
    scoreCount++ // try to keep track of user score
    document.getElementById("score").innerHTML = scoreCount

    if (scoreCount >= 20) {
      game_over = true
      alert(
        "Win Game, Your score is " + scoreCount + " \n You are a snake🐍 master"
      )
      location.reload()
      return
    }
  }

  // logic for how snake body moves, how it follows the head movement
  for (let i = snake_body.length - 1; i > 0; i--) {
    snake_body[i] = snake_body[i - 1]
  }

  if (snake_body.length) {
    snake_body[0] = [snakeX, snakeY] // Update the head position
  }

  //Draw snake
  context.fillStyle = "green"
  snakeX += velocityX * block_size
  snakeY += velocityY * block_size
  context.fillRect(snakeX, snakeY, block_size, block_size)

  for (let i = 0; i < snake_body.length; i++) {
    context.fillRect(snake_body[i][0], snake_body[i][1], block_size, block_size)
  }

  // game over logic
  if (
    snakeX < 0 ||
    snakeX >= col * block_size ||
    snakeY < 0 ||
    snakeY >= row * block_size
  ) {
    game_over = true
    alert("Game over")
    location.reload()
    return
  }

  for (let i = 0; i < snake_body.length; i++) {
    if (snake_body[i][0] == snakeX && snake_body[i][1] == snakeY) {
      game_over = true
      alert("Game over")
      location.reload()
      return
    }
  }
}

// function to place food
function place_Food() {
  foodX = Math.floor(Math.random() * col) * block_size
  foodY = Math.floor(Math.random() * row) * block_size
}
// Math.random() returns a random number between (0 - 1)
// multiplying it with row and cols makes it between (0 - 20)
// math.floor() rounds it down to the nearest whole number
// multiplying it with block_size makes it a multiple of 25

function change_direction(event) {
  if ((event.code == "ArrowUp" || event.code == "KeyW") & (velocityY != 1)) {
    // 1 means going down
    velocityX = 0
    velocityY = -1 // -1 means going up and 1 means going down because y axis is inverted
  } else if (
    (event.code == "ArrowDown" || event.code == "KeyS") &
    (velocityY != -1) // -1 means going up and 1 means going down
  ) {
    velocityX = 0
    velocityY = 1
  } else if (
    (event.code == "ArrowLeft" || event.code == "KeyA") &
    (velocityX != 1)
  ) {
    velocityX = -1
    velocityY = 0
  } else if (
    (event.code == "ArrowRight" || event.code == "KeyD") &
    (velocityX != -1)
  ) {
    velocityX = 1
    velocityY = 0
  }
}
