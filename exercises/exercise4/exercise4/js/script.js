// Pong - Orchestra (Ambient Cacophony Version)
// by William L'Eriger, original by Pippin Barr
//
// A slight improvement on the primitive implementation of Pong with a scoring system and disappearing paddles!
// Playable with two players on the keyboard.

// Game colors
//var bgColor = 0;
///////////////////////////********NEW*******////////////////////
var fgColorBallRed = 0; // red color of the ball
var fgColorBallGreen = 255; // green color value of ball
var fgColorBallBlue = 255; // blue color value of ball
var fgColorRight = 255; // color of the right paddle
var fgColorLeft = 255; // color of the left paddle

// game end variables
var gameOver = false;

////////////////////////////*****END NEW*******/////////////////////
// BALL
//
// Basic definition of a ball object with its key properties of
// position, size, velocity, and speed
var ball = {
  x: 0,
  y: 0,
  size: 15, /////***UPDATED
  vx: 0,
  vy: 0,
  speed: 5
}

// PADDLES

// How far in from the walls the paddles should be drawn on x
var paddleInset = 50;

// LEFT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
var leftPaddle = {
  x: 0,
  y: 0,
  w: 5, //////****UPDATED
  h: 90,
  vx: 0,
  vy: 0,
  speed: 5,
  upKeyCode: 87, // The key code for W
  downKeyCode: 83, // The key code for S
  leftScore: 0, // ***New*** variable for the left paddle's score
}

// RIGHT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
var rightPaddle = {
  x: 0,
  y: 0,
  w: 5, //////*******UPDATED
  h: 90,
  vx: 0,
  vy: 0,
  speed: 5,
  upKeyCode: 38, // The key code for the UP ARROW
  downKeyCode: 40, // The key code for the DOWN ARROW
  rightScore: 0, // *** NEW *** the variable for the right paddle's
}

// A variable to hold the beep sound we will play on bouncing
var beepSFX;

// preload()
//
// Loads the beep audio for the sound of bouncing
function preload() {
  //////////******NEW SOUNDS *********///////////////
  beepSFX = new Audio("assets/sounds/beep.wav");
  metalSFX = new Audio("assets/sounds/metal.wav");
  orchestraSFX = new Audio("assets/sounds/orchestra.wav");
  brassSFX = new Audio("assets/sounds/brass.wav");
  ambientBackgroundMusic = new Audio("assets/sounds/ambient.wav");

  backgroundIMG = loadImage("assets/images/landscape.jpg"); /////NEW IMAGE/////
}

// setup()
//
// Creates the canvas, sets up the drawing modes,
// Sets initial values for paddle and ball positions
// and velocities.
function setup() {
  // Create canvas and set drawing modes
  createCanvas(640,480);
  rectMode(CENTER);
  noStroke();
  //fill(fgColor);

  setupPaddles();
  setupBall();
////// Code for new ambient bg music, setting the currentTime to 0 at the beginning and looping it infinitely
  ambientBackgroundMusic.currentTime = 0;
  ambientBackgroundMusic.play();
  ambientBackgroundMusic.loop = true;
}

// setupPaddles()
//
// Sets the positions of the two paddles
function setupPaddles() {
  // Initialise the left paddle
  leftPaddle.x = paddleInset;
  leftPaddle.y = height/2;

  // Initialise the right paddle
  rightPaddle.x = width - paddleInset;
  rightPaddle.y = height/2;
}

// setupBall()
//
// Sets the position and velocity of the ball
function setupBall() {
  ball.x = width/2;
  ball.y = height/2;
  ball.vx = ball.speed;
  ball.vy = ball.speed;
}

// draw()
//
// Calls the appropriate functions to run the game
function draw() {
  // Fill the background with a landscape image
    background(backgroundIMG);


    // Handle input
    // Notice how we're using the SAME FUNCTION to handle the input
    // for the two paddles!
    handleInput(leftPaddle);
    handleInput(rightPaddle);

    // Update positions of all objects
    // Notice how we're using the SAME FUNCTION to handle the input
    // for all three objects!
    updatePosition(leftPaddle);
    updatePosition(rightPaddle);
    updatePosition(ball);

    // Handle collisions
    handleBallWallCollision();
    handleBallPaddleCollision(leftPaddle);
    handleBallPaddleCollision(rightPaddle);

    // Handle the ball going off screen
    handleBallOffScreen();

    // Display the paddles and ball
    // displayPaddle(leftPaddle);
    // displayPaddle(rightPaddle);

    // *** NEW *** //
    // Changed the previously single function to two separate ones in order to change color values when scoring
    displayRightPaddle(rightPaddle);
    displayLeftPaddle(leftPaddle);
    // *** End *** //
    displayBall();

    loopGame(); /// new loopGame function that resets scores to 0
  }


  //reset();



// handleInput(paddle)
//
// Updates the paddle's velocity based on whether one of its movement
// keys are pressed or not.
// Takes one parameter: the paddle to handle.
function handleInput(paddle) {

  // Set the velocity based on whether one or neither of the keys is pressed

  // NOTE how we can change properties in the object, like .vy and they will
  // actually CHANGE THE OBJECT PASSED IN, this allows us to change the velocity
  // of WHICHEVER paddle is passed as a parameter by changing it's .vy.

  // UNLIKE most variables passed into functions, which just pass their VALUE,
  // when we pass JAVASCRIPT OBJECTS into functions it's the object itself that
  // gets passed, so we can change its properties etc.

  // Check whether the upKeyCode is being pressed
  // NOTE how this relies on the paddle passed as a parameter having the
  // property .upKey
  if (keyIsDown(paddle.upKeyCode)) {
    // Move up
    paddle.vy = -paddle.speed;
  }
  // Otherwise if the .downKeyCode is being pressed
  else if (keyIsDown(paddle.downKeyCode)) {
    // Move down
    paddle.vy = paddle.speed;
  }
  else {
    // Otherwise stop moving
    paddle.vy = 0;
  }
}

// updatePosition(object)
//
// Sets the position of the object passed in based on its velocity
// Takes one parameter: the object to update, which will be a paddle or a ball
//
// NOTE how this relies on the object passed in have .x, .y, .vx, and .vy
// properties, which is true of both the two paddles and the ball
function updatePosition(object) {
  object.x += object.vx;
  object.y += object.vy;
}

// handleBallWallCollision()
//
// Checks if the ball has overlapped the upper or lower 'wall' (edge of the screen)
// and is so reverses its vy
function handleBallWallCollision() {

  // Calculate edges of ball for clearer if statement below
  var ballTop = ball.y - ball.size/2;
  var ballBottom = ball.y + ball.size/2;
  var ballLeft = ball.x - ball.size/2;
  var ballRight = ball.x + ball.size/2;

  // Check for ball colliding with top and bottom
  if (ballTop < 0 || ballBottom > height) {
    // If it touched the top or bottom, reverse its vy
    ball.vy = -ball.vy;
    // Play a brass sound effect by rewinding and then playing /////////////////////////UPDATED//////////////////////////
    brassSFX.currentTime = 0;
    brassSFX.play();
  }
}

// handleBallPaddleCollision(paddle)
//
// Checks if the ball overlaps the specified paddle and if so
// reverses the ball's vx so it bounces
function handleBallPaddleCollision(paddle) {

  // Calculate edges of ball for clearer if statements below
  var ballTop = ball.y - ball.size/2;
  var ballBottom = ball.y + ball.size/2;
  var ballLeft = ball.x - ball.size/2;
  var ballRight = ball.x + ball.size/2;

  // Calculate edges of paddle for clearer if statements below
  var paddleTop = paddle.y - paddle.h/2;
  var paddleBottom = paddle.y + paddle.h/2;
  var paddleLeft = paddle.x - paddle.w/2;
  var paddleRight = paddle.x + paddle.w/2;

  // First check it is in the vertical range of the paddle
  if (ballBottom > paddleTop && ballTop < paddleBottom) {
    // Then check if it is touching the paddle horizontally
    if (ballLeft < paddleRight && ballRight > paddleLeft) {
      // Then the ball is touching the paddle so reverse its vx
      ball.vx = -ball.vx;
      // Play a metal "ping" sound effect by rewinding and then playing ////////////////////UPDATED/////////////
      metalSFX.currentTime = 0;
      metalSFX.play();
      // New code to randomize the green and blue rgb values to get a random color that fits the theme
      fgColorBallGreen = random(255);
      fgColorBallBlue = random(255);
    }
  }
}

// handleBallOffScreen()
//
// Checks if the ball has gone off screen to the left or right
// and moves it back to the centre if so
function handleBallOffScreen() {

  // Calculate edges of ball for clearer if statement below
  var ballLeft = ball.x - ball.size/2;
  var ballRight = ball.x + ball.size/2;

  // Check for ball going off the sides
  if (ballRight < 0 || ballLeft > width) {
    // If it went off either side, reset it to the centre
    ball.x = width/2;
    ball.y = height/2;
    // Play a sound when a point is scored by either side ////////////////////////////////// NEW //////////////////////
    orchestraSFX.currentTime = 0;
    orchestraSFX.play();
    // NOTE that we don't change its velocity here so it just
    // carries on moving with the same velocity after its
    // position is reset.
    // This is where we would count points etc!

  /// *** NEW CODE ***/////////////////////////////////////////
  // if the ball goes out of the right side, add a point to the leftScore, which is associated with the left paddle
  // if the ball goes out of the left side, do the opposite
  // check if it works in console log
  if (ballRight < 0) {
    leftPaddle.leftScore ++;
    console.log("right score", leftPaddle.leftScore);
    // when right side scores, lower the intensity of the left paddle's color
    fgColorLeft -= 20;
    reset();
  }
  if (ballLeft > width) {
    rightPaddle.rightScore ++;
    console.log("left score", rightPaddle.rightScore);
    // when left side scores, lower the intensity of the right side's paddle
    fgColorRight -= 20;
    reset();
  }
  /// *** END NEW CODE *** ///////////////////
  }
}

// *** NEW FUNCTIONS *** ///////////////////////////////////////
// function reset()
//
// once a point is scored, reset the ball according to the code within this function
// in this case, send back to winner on the x axis and randomize the y axis
function reset () {
  ball.vx = -ball.vx;

  ball.vy = constrain(ball.vy, -1.5, 1.5);
  ball.vy = random(-5, 5)/ball.vy;
  ball.y = random(5, (height - 5));
  }

// function loopGame()
//
// once a player reached 13 points and their paddle turns black, reset all score values and displays to 0, set gameOver variable to true
function loopGame() {
  if (rightPaddle.rightScore >= 13 || leftPaddle.leftScore >= 13) {
    rightPaddle.rightScore = 0;
    leftPaddle.leftScore = 0;
    fgColorLeft = 255;
    fgColorRight = 255;
    gameOver = true;
}
}
  /// *** END NEW FUNCTIONS *** ///


// displayBall()
//
// Draws ball on screen based on its properties
function displayBall() {
  fill(fgColorBallRed, fgColorBallGreen, fgColorBallBlue); // **NEW AND UPDATED**
  rect(ball.x,ball.y,ball.size,ball.size);
}

// function displayLeftPaddle(leftPaddle) and function displayRightPaddle(rightPaddle)
//
// Draws the specified paddles on screen based on their properties
/// *** NEW AND UPDATED PADDLE FUNCTIONS*** ///
function displayLeftPaddle(leftPaddle) {
  paddleLeft = fill(100, 100, fgColorLeft); // blue value based on variable
  rect(leftPaddle.x,leftPaddle.y,leftPaddle.w,leftPaddle.h);
}

function displayRightPaddle(rightPaddle) {
  paddleRight = fill(100, fgColorRight, 100); // green value based on variable
  rect(rightPaddle.x, rightPaddle.y, rightPaddle.w, rightPaddle.h);
}
