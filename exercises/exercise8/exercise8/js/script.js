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

// preload()
//
// Description of preload
function preload() {

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
}


// draw()
//
// Description of draw()
function draw() {
  drawBackground();
  drawPlayer();

  playerMovement();


  for (var i = 0; i < rain.length; i++) {
    rain[i].update();

    rain[i].touchedBottom();

    rain[i].display();
  }
}

function drawPlayer() {
  fill(255);
  ellipse(playerX, playerY, 50);
}

function playerMovement() {
  playerX = playerX + playerVX;

  if (playerX === 150 || playerX === 850) {
    playerVX = -playerVX;
  }
}

function drawBackground() {
  background(11, 18, 30);

  //city hue/mist
  ellipseMode(CENTER);
  noStroke();
  fill(66, 58, 89);
  ellipse(width/2, height, width + 50, height + 50);
  fill(44, 38, 61);
  ellipse(width/2, height, width, height);


  //buildings
  fill(0);

  // first three buildings on the left
  rect(0, 200, 75, 300);
  rect(180, 150, 75, 350);
  rect(60, 100, 125, 400);

  // buildings in the middle
  rect(300, 125, 60, 375);
  rect(470, 200, 120, 300);
  rect(380, 180, 100, 320);
  rect(590, 250, 150, 250);

  // buildings on the right
  rect(750, 50, 100, 450);
  rect(840, 200, 75, 300);
  rect(910, 100, 90, 400);
}
