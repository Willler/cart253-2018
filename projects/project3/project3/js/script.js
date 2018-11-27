// Duality - The Mask and Reality
// William L'Eriger
//
// A game meant to illustrate the duality between what we let others see
// in public, and how we may actually feel instead
//
// A menu depicting a floating head that you can make move from side to side
// A minigame depicting your public "mask"
// A minigame depicting a pet/tumor thing that grows heavier and darker when playing


// variable for opacity of vines for the menu, so that they appear gradually
var vinesOpacity;
var vinesOpacityGrowth;

// variable to decide if the page should display the menu, the mask or the Truth
// 0 will be the menu, 1 will be the mask, and 2 the truth
var gameState;

var menuHead;

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

// variable for transitions
var transitionAlphaOut = 0;
var transitionAlphaIn = 255;

// preload()
//
// preload assets before running the code, such as fonts, images and sounds
function preload() {
  displayFont = loadFont("assets/fonts/display.ttf");

  menuMusic = new Audio("assets/sounds/waltz.wav");
  menuSpotlightSound = new Audio("assets/sounds/strum.wav");

  rainSound = new Audio("assets/sounds/rain.wav");
  rainBackgroundMusic = new Audio("assets/sounds/loneliness.wav");

  promptFont = loadFont("assets/fonts/display.ttf");
}

function setup() {
  createCanvas(1000,500);
  gameState = 0;


  // calling objects
  menuHead = new MenuHead(width/2, height/2, 2, 0, 0, 150);

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

    // play the background music

  if(gameState === 0) {
    menuMusic.play();
    menuMusic.loop = true;
  } else if(gameState === 1) {
    rainSound.play();
    rainSound.loop = true;
    rainBackgroundMusic.play();
    rainBackgroundMusic.loop = true;
  }

  // defining vines opacity and growth, which will be called in a later function
  vinesOpacity = 0;
  vinesOpacityGrowth = 1;
}

function draw() {

if (gameState === 0) {
  background(57, 77, 0);

  drawSpotlightVines();

  menuHead.update();
  menuHead.display();

  // call the spotlight
  spotlightDisplay();

  // call the spotlight text
  spotlightText();

 // call the spotlight sound effect
 playSpotlightSound();
} else if(gameState === 0.1) {
  background(57, 77, 0);

  drawSpotlightVines();

  menuHead.update();
  menuHead.display();

  // call the spotlight
  spotlightDisplay();

  // call the spotlight text
  spotlightText();

  displayTransition();

} else if(gameState === 0.2) {

  drawBackground();
  drawBackgroundText()

  // call the rain.js functions through the array
    for (var i = 0; i < rain.length; i++) {
      rain[i].update();
      rain[i].touchedBottom();
      rain[i].display();
      rain[i].handleCollision(umbrella);
    }

    displayTransitionFadeIn();
  } else if (gameState === 1) {
  drawBackground();
  drawBackgroundText()
  drawPlayer();

  // as the name implies
  playerMovement();

  // functions taken from the umbrella script
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

}

///////////////////////////////////// NOTE: the following functions all have the same (or similar) if statements
///////////////////////////////////// but they are separated for clarity
///////////////////////////////////////Menu functions


// // spotlightDisplay();
// //
// // shows a spotlight/window where text will appear once the head reaches a certain point
function spotlightDisplay() {

  noStroke();

  if (menuHead.x === 200) {
    // vx = 0;
    //shadow
    fill(25);
    ellipse(660, height/2 + 10, 500 , 300);
    //spotlight
    fill(204, 153, 102);
    ellipse(650, height/2, 500 , 300);
  } else if (menuHead.x === (width - 200)) {
    // vx = 0;
    //shadow
    fill(25);
    ellipse(340, height/2 + 10, 500, 300);
    //spotlight
    fill(204, 153, 102);
    ellipse(350, height/2, 500, 300);
  }
}


// //spotlightText()
// //
// // function that shows the spotlight text when called
// // NOTE: I plan on having the header be clickable to open a minigame in the final product
// // by using the p5.dom library, for now however, it is just regular text
function spotlightText() {

// how the text will look
  textAlign(CENTER);
  noStroke();
  fill(150, 0, 0);
  textSize(64);
  textFont(displayFont);

// if statement to show text when constrain extremities are shown
  if (menuHead.x === 200) {
    //heading
    text("The Mask", 650, height/2);
    //flavor
    textSize(24);
    text("- The Side Seen in Public -", 650, (height/2) + 50);
    // prompt
    textSize(18);
    text("Press Control to Begin", 650, (height/2) + 75);
  } else if (menuHead.x === (width - 200)) {
    //heading
    text("The Truth", 350, height/2);
    //flavor
    textSize(24);
    text("- The Side Seen by None -", 350, (height/2) + 50);
    // prompt
    textSize(18);
    text("Press Shift to Begin", 350, height/2 + 75);
  }
}

// drawSpotlightVines()
//
// draws a background vine-like display using enlarged letters when head stops moving
// they start off with low opacity, which increases the more frames the head spends beyond a certain point
function drawSpotlightVines() {

  noStroke();

  // what determines the opacity increase
  vinesOpacity = vinesOpacityGrowth += 0.8;
  ///// vinesOpacity = constrain(vinesOpacity, 0, 100);

  // fill the vines a red color, with an updating opacity
  fill(150, 0, 0, vinesOpacity);

  // if statement to see if headX is beyond certain points on the x-axis and start showing vines then
  if (menuHead.x <= 400) {
    textSize(1500);
    text("FV", 400, 800);
  } else if (menuHead.x >= (width - 400)) {
    textSize(1500);
    text("QS", 150, 800);
  }

  // if statement that resets the opacity growth to zero if user goes on the other side
  if (menuHead.x === width/2) {
    vinesOpacityGrowth = 0;
  }
}

// playSpotlightSound()
//
// plays the spotlight guitar strum once head stops moving
// there is currently an issue where the sound plays repeatedly, will fix that in final version
function playSpotlightSound() {
  if (menuHead.x === 200 || menuHead.x === (width - 200)) {
    menuSpotlightSound.play();
  }
}

// startGame()
//
// press a certain key on the keyboard to start either the truth or mask minigames
function keyPressed() {
  if (keyCode === CONTROL) {
    if(menuHead.x === 200) {
      gameState = 0.1;
  }
  }
}


///////////////////////////////////////////////////////// Mask game functions below


// drawPlayer()
//
// function to draw the player sprite
// it is grey/monochrome on purpose
// to show contrast between the colorful mask/umbrella and the reality underneath
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
// for now, it moves left to right statically, will improve with perlin noise or something better suited in final version
function playerMovement() {
  playerX = playerX + playerVX;

  // constrain the player within set boundaries on the x-axis
  if (playerX === 150 || playerX === 850) {
    playerVX = -playerVX;
  }
}

// drawBackground()
//
// draw the background image
// an evening cityscape, melancholy and dreary
function drawBackground() {
  background(11, 18, 30, 80);

  //city hue/mist
  ellipseMode(CENTER);
  noStroke();
  fill(66, 58, 89);
  ellipse(width/2, height, width + 50, height + 50, 80);
  fill(44, 38, 61);
  ellipse(width/2, height, width, height, 80);


  //buildings (there is probably a better way to do this), with lights put in here and there
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

// drawBackgroundText()
//
// put in a text display to subtly show the player the controls
// its not obvious, which is on purpose
// as its not always easy to know what to do in public
function drawBackgroundText() {
  textSize(24);
  fill(255);
  textFont(promptFont);
  text("<--   Brandish Your Mask   -->", 180, 50);
}

function displayTransition() {

  transitionAlphaOut += 2;
  fill(0, transitionAlphaOut)
  rect(0,0, width, height);

  if (transitionAlphaOut >= 255) {
    gameState = 0.2;
  }
 }

 function displayTransitionFadeIn() {

   transitionAlphaIn -= 2;
   fill(0, transitionAlphaIn);
   rect(0, 0, width, height);

   if (transitionAlphaIn <= 0) {
     gameState = 1;
   }

 }
