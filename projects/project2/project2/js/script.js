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

// Variable to check if the game has been started *****************NEW**************////////
var gameStart = false;


//preload()
//
// preloads the assets used in the game
function preload() {
  bgMusic = new Audio("assets/sounds/bgMusic.wav");
  paddleHitSound = new Audio("assets/sounds/bassKickSound.wav");
}

// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(800,450); ///////////modified canvas size ******NEW******
  // Create a ball
  ball = new Ball(width/2,height/2,5,5,10,5,5); ////////////*****modified

  // create an Enemy
  enemy = new Enemy(width/2, height/2, 3, 3, 10, 5, 6);
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
  if (gameStart === false) {
    drawStartMenu();
  } else if (ball.scoreLeft === 11 || ball.scoreRight === 11) {
    drawEndScreen();
  } else {
    //drawBackground() function to draw stripes for the background
    drawBackground();

    leftPaddle.handleInput();
    rightPaddle.handleInput();

    ball.update();
    enemy.update(); //////////////////NEW
    leftPaddle.update();
    rightPaddle.update();

    if (ball.isOffScreen() === "left") {
      leftPaddle.score ++;
      console.log(leftPaddle.score, rightPaddle.score);
      ball.reset();
    } else if (ball.isOffScreen() === "right") {
      rightPaddle.score ++;
      console.log(leftPaddle.score, rightPaddle.score);
      ball.reset();
    }
    enemy.isOffScreen();

    ball.handleCollision(leftPaddle);
    ball.handleCollision(rightPaddle);

    enemy.handleCollision(leftPaddle);
    enemy.handleCollision(rightPaddle);

    ball.display();
    enemy.display();
    leftPaddle.display();
    rightPaddle.display();
  }

}

//drawBackground()
//
// draw a stylish background using geometric shapes
function drawBackground() {
  noStroke();
  fill(backgroundStripesColor1,0,backgroundStripesColor3, 70);
  rect(0, 0, width, 90,);
  rect(0, 180, width, 90,);
  rect(0, 360, width, 90,);
  fill(backgroundStripesColor3,0,backgroundStripesColor1, 70);
  rect(0, 90, width, 90,);
  rect(0, 270, width, 90,);

  // play the background music
  bgMusic.play();
  bgMusic.loop = true;
}

//drawStartMenu()
//
// draw the start menu
function drawStartMenu() {
  background(0);
  stroke(244, 66, 209);
  line(0, 400, 800, 400);
  stroke(56, 168, 255);
  line(0, 415, 800, 415);

  //menu text, instructions + flavor
  strokeWeight(3);
  textSize(36);
  text("Begin an A E S T H E T I C Experience. . .", 100, 380);
  text("S H I F T into high gear. . !", 20, 300);
}

// drawEndScreen()
//
// draw the end screen that appears once a player reaches a certain score
//////////////***************NEW*****///////////
function drawEndScreen() {
  background(0);
  stroke(244, 66, 209);
  line(0, 50, 800, 50);
  stroke(56, 168, 255);
  line(0, 100, 800, 100);

// draw end text
  textSize(48);
  strokeWeight(2);
  noFill();
  textAlign(LEFT);
  text("The J O U R N E Y Ends...", 100, 200);
  text("Press C O N T R O L to refuel.", 100, 250);
// stop the background music of the main game, reset it back to the beginning
  bgMusic.pause();
  bgMusic.currentTime = 0;
}

//keyPressed()
//
// check if a specific key has been pressed and return value
function keyPressed() {
  // press shift to begin the game
  if(keyCode === SHIFT) {
    gameStart = true;
  }
  // press the CONTROL key to restart after hitting the end screen, this will reset scores to 0
  if(keyCode === CONTROL) {
    ball.scoreLeft = 0;
    ball.scoreRight = 0;
  }
}
