/*****************

Duality - The Mask and Reality
 William L'Eriger


A prototype of one of the minigames I will be putting into my final project
Here, the player has to hold up their "mask", which in this case is an umbrella
And shield themselves against the world/rain

******************/

// player character variables
var playerX;
var playerY;
var playerVX;
var playerVY;

// variables for rain array
var rain = [];
var rainDrops = 50;

// variables for the Umbrella
var umbrella;

// preload()
//
// Description of preload
function preload() {
  rainSound = new Audio("assets/sounds/rain.wav");
  rainBackgroundMusic = new Audio("assets/sounds/loneliness.wav");

  promptFont = loadFont("assets/fonts/display.ttf");
}


// setup()
//
// Description of setup
function setup() {

  //creating the canvas
  createCanvas(1000,500);

  //determine the initial player character position
  playerX = width/2;
  playerY = height - 50;

  // initialize value of playerVX
  playerVX = 2;

  // create the rain object array
  for (var i = 0; i < rainDrops; i++) {
  rain.push(new Rain(random(50,950),0,0,random(3,5),6,5,5));
  }

  // create the umbrella object
  umbrella = new Umbrella(width/2, 300, 150, 50, 5, RIGHT_ARROW, LEFT_ARROW);

  // setup the background music and rain sounds
  rainSound.play();
  rainSound.loop = true;
  rainBackgroundMusic.play();
  rainBackgroundMusic.loop = true;

}


// draw()
//
// Description of draw()
function draw() {
  drawBackground();
  drawBackgroundText()
  drawPlayer();

  playerMovement();

  umbrella.handleInput();
  umbrella.update();
  umbrella.display();

 // call the rain.js functions through the array
  for (var i = 0; i < rain.length; i++) {
    rain[i].update();
    rain[i].touchedBottom();
    rain[i].display();
    rain[i].handleCollision(umbrella);
  }


}

// drawPlayer()
//
// function to draw the player sprite
function drawPlayer() {

  //hair background
  fill(25);
  ellipse(playerX, playerY + 10, 55, 50);
  ellipse(playerX - 22, playerY + 15, 20, 30);
  ellipse(playerX + 22, playerY + 15, 20, 30);

  //face
  fill(150);
  ellipse(playerX, playerY, 50);

  //glasses
  stroke(0);
  noFill();
  ellipse(playerX - 9, playerY + 10, 15);
  ellipse(playerX + 9, playerY + 10, 15);


  //hair foreground
  noStroke();
  fill(45);
  ellipse(playerX + 25, playerY + 5, 20);
  ellipse(playerX + 15, playerY - 5, 30);
  ellipse(playerX - 25, playerY + 5, 20);
  ellipse(playerX - 15, playerY - 5, 30);
  ellipse(playerX + 2, playerY - 12, 40, 30);

}

// playerMovement()
//
// function to determine how the player sprite moves around
function playerMovement() {
  playerX = playerX + playerVX;

  if (playerX === 150 || playerX === 850) {
    playerVX = -playerVX;
  }
}

// drawBackground()
//
// draw the background image
function drawBackground() {
  background(11, 18, 30, 80);

  //city hue/mist
  ellipseMode(CENTER);
  noStroke();
  fill(66, 58, 89);
  ellipse(width/2, height, width + 50, height + 50, 80);
  fill(44, 38, 61);
  ellipse(width/2, height, width, height, 80);


  //buildings (there is probably a better way to do this)
  fill(0);
  rectMode(CORNER);

  // first three buildings on the left
  rect(0, 200, 75, 300);
  fill(255, 255, 0, 80);
  ellipse(60, 300, 20);
  fill(255, 255, 0, 40);
  ellipse(60, 300, 40);
  fill(255, 255, 0, 10);
  ellipse(60, 300, 60);
  fill(0);
  rect(180, 150, 75, 350);
  rect(60, 100, 125, 400);

  // buildings in the middle
  rect(300, 125, 60, 375);
  rect(470, 200, 120, 300);
  //light
  fill(255, 255, 0, 80);
  ellipse(590, 270, 20);
  fill(255, 255, 0, 40);
  ellipse(590, 270, 40);
  fill(255, 255, 0, 10);
  ellipse(590, 270, 60);
  fill(0);
  //end light
  rect(380, 180, 100, 320);
  //light
  fill(255, 255, 0, 80);
  ellipse(390, 400, 20);
  fill(255, 255, 0, 40);
  ellipse(390, 400, 40);
  fill(255, 255, 0, 10);
  ellipse(390, 400, 60);
  fill(0);
  //end light
  rect(590, 250, 150, 250);

  // buildings on the right
  rect(750, 50, 100, 450);
  rect(840, 200, 75, 300);
  //light
  fill(255, 255, 0, 80);
  ellipse(830, 150, 20);
  fill(255, 255, 0, 40);
  ellipse(830, 150, 40);
  fill(255, 255, 0, 10);
  ellipse(830, 150, 60);
  fill(0);
  //end light
  rect(910, 100, 90, 400);
}

function drawBackgroundText() {
  textSize(24);
  fill(255);
  textFont(promptFont);
  text("<--   Brandish Your Mask   -->", 50, 50);
}
