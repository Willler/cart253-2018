// Aesthetic Pong
// by William L'Eriger - OG by Pippin Barr
//
// A chillwave version of pong
// gives a feeling of competition, but relaxation
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// enemy balls can remove points from players
// Written with JavaScript OOP.

// Variable to contain the objects representing our ball and paddles, as well as enemy and gates
var ball;
var leftPaddle;
var rightPaddle;
var gateTop;
var gateMiddle;
var gateBottom;

// array variables for the enemy objects
var enemy = [];
var numEnemies = 3;

// Variable to check if the game has been started *****************NEW**************////////
var gameStart = false;

// variables for oscillating text
var minTextSize = 16;
var maxTextSize = 32;
var angle = 0;


//preload()
//
// preloads the assets used in the game
function preload() {
  bgMusic = new Audio("assets/sounds/bgMusic.wav");
  paddleHitSound = new Audio("assets/sounds/bassKickSound.wav");
  endMusic = new Audio("assets/sounds/endMusic.wav");
  enemyHitSound = new Audio("assets/sounds/enemyHitSound.wav");
  wallHitSound = new Audio("assets/sounds/wallHit.wav");
  scoreSound = new Audio("assets/sounds/scoreSound.wav");

  displayFont = loadFont("assets/fonts/barrio.ttf");
}

// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(800,450); ///////////modified canvas size ******NEW******
  // Create a ball
  ball = new Ball(width/2,height/2,3,3,10,5,5); ////////////*****modified

  // create an Enemy
  // using a for loop and the array
  for (var i = 0; i < numEnemies; i++) {
  enemy.push(new Enemy(width/2,height/2,random(-3,3),random(-3,3),5,6));
}

  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-30,height/2,5,90,5,10,DOWN_ARROW,UP_ARROW); /////*****MODIFIED
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(20,height/2,5,90,5,10,83,87); ///****MODIFIED

  // create the gates
  gateTop = new Gate(395, 25, 10, 100, 5, 1, 150, 250);
  gateBottom = new Gate(395, 325, 10, 100, 5, 1, 150, 250);

}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  // check if the variable gameStart is false, so if the game has not started yet
  if (gameStart === false) {
    drawStartMenu();
  // check if the end score has been reached, if so, end the game
  } else if (leftPaddle.score === 11 || rightPaddle.score === 1) {
    drawEndScreen();
  } else {
    //drawBackground() function to draw stripes for the background
    drawBackground();
    // the score text
    drawScore();

    leftPaddle.handleInput();
    rightPaddle.handleInput();

    ball.update();

/////// add all the enemy [i] to the for loop, which will draw the max amount of enemies
    for (var i = 0; i < enemy.length; i++) {
      enemy[i].update(); //////////////////NEW
      enemy[i].isOffScreen();
      enemy[i].handleCollision(leftPaddle);
      enemy[i].handleCollision(rightPaddle);
      enemy[i].display();
    }

    leftPaddle.update();
    rightPaddle.update();

/////// check if the ball goes off the screen to the left or the right, add a point to the opposite paddle, play the scoring sound, reset the ball
    if (ball.isOffScreen() === "left") {
      rightPaddle.score ++;
      scoreSound.play();
      ball.reset();
    } else if (ball.isOffScreen() === "right") {
      leftPaddle.score ++;
      scoreSound.play();
      ball.reset();
    }

    ball.handleCollision(leftPaddle);
    ball.handleCollision(rightPaddle);

    ball.gateCollision(gateTop);
    ball.gateCollision(gateBottom);

    ball.display();
    leftPaddle.display();
    rightPaddle.display();
    gateTop.display();
    gateBottom.display();
  }

}

//drawBackground()
//
// draw a stylish background using geometric shapes
function drawBackground() {
  noStroke();
  // use colors defined in ball.js
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

  // if end music was playing, stop it, reset it to 0
  endMusic.pause();
  endMusic.currentTime = 0;

}

//drawStartMenu()
//
// draw the start menu
function drawStartMenu() {
  background(0);
  noFill();
  stroke(244, 66, 209);
  line(0, 400, 800, 400);
  stroke(56, 168, 255);
  line(0, 415, 800, 415);

  stroke(244, 66, 209);
  ellipse(700, 200, 100);
  ellipse(500, 70, 50);
  stroke(56, 168, 255);
  ellipse(600, 100, 75);


  //menu text, instructions + flavor
  strokeWeight(2);
  textSize(36);
  textFont(displayFont);
  text("Begin an A E S T H E T I C Experience. . .", 100, 380);
  stroke(244, 66, 209);
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

  ellipse(600, 350, 50);
  stroke(244, 66, 209);
  ellipse(675, 350, 50);

// draw end text
  textSize(48);
  strokeWeight(2);
  noFill();
  textAlign(LEFT);
  text("The J O U R N E Y Ends...", 20, 200);
  stroke(244, 66, 209);
  text("Press C O N T R O L to refuel.", 20, 260);
// stop the background music of the main game, reset it back to the beginning
  bgMusic.pause();
  bgMusic.currentTime = 0;
  endMusic.play();
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
    leftPaddle.score = 0;
    rightPaddle.score = 0;
  }
}

//drawScore()
//
// draws the score on the screen in text, oscillating
function drawScore() {
  stroke(255);
  noFill();
// map the text size between two specific values
  textSize(map(sin(angle), -1, 1, minTextSize, maxTextSize));
  text(leftPaddle.score, 50, 50);
  text(rightPaddle.score, 720, 50);
// increase angle, which will affect the rate at which the text oscillates
  angle += 0.03;
}
