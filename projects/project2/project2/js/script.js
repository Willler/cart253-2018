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

// Variable to contain the objects representing our ball and paddles, as well as enemy and gates
var ball;
var leftPaddle;
var rightPaddle;
var gateTop;
var gateMiddle;
var gateBottom;

var enemy = [];
var numEnemies = 3;

// Variable to check if the game has been started *****************NEW**************////////
var gameStart = false;


//preload()
//
// preloads the assets used in the game
function preload() {
  bgMusic = new Audio("assets/sounds/bgMusic.wav");
  paddleHitSound = new Audio("assets/sounds/bassKickSound.wav");
  endMusic = new Audio("assets/sounds/endMusic.wav");
  enemyHitSound = new Audio("assets/sounds/enemyHitSound.wav");

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
  // enemy = new Enemy(width/2, height/2, 3, 3, 10, 5, 6);

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
  if (gameStart === false) {
    drawStartMenu();
  } else if (leftPaddle.score === 11 || rightPaddle.score === 11) {
    drawEndScreen();
  } else {
    //drawBackground() function to draw stripes for the background
    drawBackground();
    drawScore();

    leftPaddle.handleInput();
    rightPaddle.handleInput();

    ball.update();

    for (var i = 0; i < enemy.length; i++) {
      enemy[i].update(); //////////////////NEW
      enemy[i].isOffScreen();
      enemy[i].handleCollision(leftPaddle);
      enemy[i].handleCollision(rightPaddle);
      enemy[i].display();
    }
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

    ball.handleCollision(leftPaddle);
    ball.handleCollision(rightPaddle);

    ball.gateCollision(gateTop);
    ball.gateCollision(gateBottom);

    // enemy[i].handleCollision(leftPaddle);
    // enemy[i].handleCollision(rightPaddle);

    ball.display();
    // enemy[i].display();
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

function drawScore() {
  stroke(255);
  noFill();
  text(leftPaddle.score, 50, 50);
  text(rightPaddle.score, 720, 50);
}
