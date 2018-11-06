// Basic OO Pong
// by Pippin Barr
//
// A primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.

// Variable to contain the objects representing our ball and paddles
var ball;
var leftPaddle;
var rightPaddle;

// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(800,450); ///////////modified canvas size ******NEW******
  // Create a ball
  ball = new Ball(width/2,height/2,5,5,10,5,5); ////////////*****modified
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-30,height/2,5,90,5,10,DOWN_ARROW,UP_ARROW); /////*****MODIFIED
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(20,height/2,5,90,5,10,83,87); ///****MODIFIED
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {

  //drawBackground() function to draw stripes for the background
  drawBackground();

  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update();
  leftPaddle.update();
  rightPaddle.update();

  if (ball.isOffScreen()) {
    ball.reset();
  }

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ball.display();
  leftPaddle.display();
  rightPaddle.display();
}

//drawBackground()
//
// draw a stylish background using geometric shapes
function drawBackground() {
  noStroke();
  fill(backgroundStripesColor1,0,backgroundStripesColor3);
  rect(0, 0, width, 90);
  rect(0, 180, width, 90);
  rect(0, 360, width, 90);
  fill(backgroundStripesColor3,0,backgroundStripesColor1);
  rect(0, 90, width, 90);
  rect(0, 270, width, 90);
}
