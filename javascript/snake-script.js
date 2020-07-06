// JavaScript snake
// Adapted from tutorial put up by Jan Bodnar
// -> http://zetcode.com/javascript/snake/
// Used tutorial to get basic functionality, added UI, features, etc.


// initialize canvas and context
var canvas;
var context;

// initialize variables to hold images
var head;
var apple;
var ball;

// variables for posn of snake, and location of current apple
var dots;
var apple_x;
var apple_y;
var score;

// variables for the direction snake is currently traveling, and run game
var leftDirection = false;
var rightDirection = true;
var upDirection = false;
var downDirection = false;
var inGame = true;


// dot size at 15
const DOT_SIZE = 15;
// max dots possible on board = 1500 = (width * height / (dot size * dot size) )
const ALL_DOTS = 1500;
// max possible random place for apples in X and Y directions
const MAX_RAND_X = 49;
const MAX_RAND_Y = 29;
// tick rate of game, make variable?
const DELAY = 100;
// width and height of board
const C_WIDTH = 750;
const C_HEIGHT = 450;

// save values of keys for ease of reading
const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;
const R_KEY = 82;

// initialize the values of the arrays to never exceed full board
var x = new Array(ALL_DOTS);
var y = new Array(ALL_DOTS);


// init function to start game
function init() {
    // initialize canvas and graphics contex with html canvas on page
    canvas = document.getElementById("snake-canvas");
    context = canvas.getContext("2d");

    // run helper functions to start game
    loadImages();
    createSnake();
    locateApple();
    setTimeout("gameCycle()", DELAY);
}

// initialize variables as the respective files in the folder
function loadImages() {
    head = new Image();
    head.src = "../images/snakeRed.png";

    ball = new Image();
    ball.src = "../images/snakeOrange.png";

    apple = new Image();
    apple.src = "../images/snakeBlue.png";
}

// start off by creating a snake with 5 segments
function createSnake() {

    dots = 5;

    for (var z = 0; z < dots; z++) {
        x[z] = 105 - z * 15;
        y[z] = 105;
    }
}

// checks if snake is hitting an apple, if so increase snake and spawn new apple
function checkApple() {

    // if the head of the snake is colliding with the apple
    if ( (x[0] == apple_x) && (y[0] == apple_y) ) {
        // add another segment to the snake, and spawn a new apple
        dots++;
        locateApple();
    }
}

// draw all the snake segments, apple, and score
function doDrawing() {
    // clear the rectangle before drawing all the images
    context.clearRect(0, 0, C_WIDTH, C_HEIGHT);

    // if the game is running
    if (inGame) {

        // draw the apple and its location
        context.drawImage(apple, apple_x, apple_y);

        // loop through the entirity of the snake
        for (var z = 0; z < dots; z++) {
            if (z == 0) {
                context.drawImage(head, x[z], y[z]);
            } else {
                context.drawImage(ball, x[z], y[z]);
            }
        }

        // set text options and display score in bottom left
        context.fillStyle = 'white';
        context.textBaseline = 'middle';
        context.textAlign = 'right';
        context.font = 'normal bold 18px serif';
        var scoreText = "Score: " + (dots - 5);
        context.fillText(scoreText, 80, C_HEIGHT - 20);

    } else {
        // if not in game, run gameOver
        gameOver();
    }


}

// displays game over message
function gameOver() {

    // get settings ready
    context.fillStyle = 'white';
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.font = 'normal bold 32px serif';

    // save and print two texts onto the canvas
    var text = "Game Over :("
    var text2 = "Score: " + (dots - 5);
    context.fillText(text, C_WIDTH/2, C_HEIGHT/2 - 30);
    context.fillText(text2, C_WIDTH/2, C_HEIGHT/2 + 30);
}

// move the snake
function move() {

    // loop through all pieces, shoving each piece to the coords of the next
    for (var z = dots; z > 0; z--) {
        x[z] = x[(z - 1)];
        y[z] = y[(z - 1)];
    }

    // if each direction, change location of head
    //   changed to else if to prevent 180s
    if (leftDirection) {
        x[0] -= DOT_SIZE;
    }
    else if (rightDirection) {
        x[0] += DOT_SIZE;
    }
    else if (upDirection) {
        y[0] -= DOT_SIZE;
    }
    else if (downDirection) {
        y[0] += DOT_SIZE;
    }

}

// checks for collision
function checkCollision() {

    // loop through all segments of snake
    for (var z = dots; z > 0; z--) {

        // if snake hits another segment, end
        if ((z > 1) && (x[0] == x[z]) && (y[0] == y[z])) {
            inGame = false;
        }
    }

    // if snake tries to go out of bounds, end game
    if (y[0] >= C_HEIGHT) {
        inGame = false;
    }
    if (y[0] < 0) {
       inGame = false;
    }
    if (x[0] >= C_WIDTH) {
      inGame = false;
    }
    if (x[0] < 0) {
      inGame = false;
    }
}

// creates a new apple with rands
function locateApple() {

    var r = Math.floor(Math.random() * MAX_RAND_X);
    apple_x = r * DOT_SIZE;

    r = Math.floor(Math.random() * MAX_RAND_Y);
    apple_y = r * DOT_SIZE;
}


// tick function that runs the game
function gameCycle() {

    if (inGame) {
        checkApple();
        checkCollision();
        move();
        doDrawing();
        setTimeout("gameCycle()", DELAY);
    }
}

// function to handle key input
onkeydown = function(e) {

    // save the key for ease of use
    var key = e.keyCode;

    if ((key == LEFT_KEY) && (!rightDirection)) {
        leftDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == RIGHT_KEY) && (!leftDirection)) {
        rightDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == UP_KEY) && (!downDirection)) {
        upDirection = true;
        rightDirection = false;
        leftDirection = false;
    }

    if ((key == DOWN_KEY) && (!upDirection)) {
        downDirection = true;
        rightDirection = false;
        leftDirection = false;
    }

    // this doesn't work as it should
    if ( (inGame == false) && (key == R_KEY) ) {
        init();
    }
};
