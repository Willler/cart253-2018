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


// the variable for the pulsing head in the menu
var menuHead;

// variables for rain array
var rain = [];
var rainDrops = 50;

// variables for the Umbrella
var umbrella;

// variables for the pebbles array
var pebbles = [];
var pebblesCount = 30;

//variable for the truth minigame player
var truthPlayer;

// variable for the mask minigame player
var maskPlayer;

// variable for transitions
var transitionAlphaOut = 0;
var transitionAlphaIn = 255;

// preload()
//
// preload assets before running the code, such as fonts, images and sounds
function preload() {

  soundFormats('mp3', 'wav');

  menuMusic = loadSound("assets/sounds/waltz.wav");
  menuSpotlightSound = loadSound("assets/sounds/strum.wav");
  rainBackgroundMusic = loadSound("assets/sounds/loneliness.wav");
  rainSound = loadSound("assets/sounds/rain.wav");
  truthBackgroundMusic = loadSound("assets/sounds/truthMusic.wav");

  // menuMusic = new Audio("assets/sounds/waltz.wav");
  // menuSpotlightSound = new Audio("assets/sounds/strum.wav");
  // rainSound = new Audio("assets/sounds/rain.wav");
  // rainBackgroundMusic = new Audio("assets/sounds/loneliness.wav");

  promptFont = loadFont("assets/fonts/display.ttf");
  displayFont = loadFont("assets/fonts/display.ttf");
}

function setup() {
  createCanvas(1000,500);
  gameState = "menu";


  // calling objects
  menuHead = new MenuHead(width/2, height/2, 2, 0, 0, 150);

  maskPlayer = new MaskPlayer(width/2, (height - 50), 2, 0, 5, 0);

  // create the rain object array
  for (var i = 0; i < rainDrops; i++) {
    rain.push(new Rain(random(50,950),0,0,random(3,5),6,5,5));
  }

  // create the umbrella object
  umbrella = new Umbrella(width/2, 300, 150, 50, 5, RIGHT_ARROW, LEFT_ARROW);

  // create the array for pebbles
  for (var i = 0; i < pebblesCount; i++) {
    pebbles.push(new Pebbles(random(50,950),0,random(-2,2),random(2,4),6,5,5));
  }

  truthPlayer = new TruthPlayer(width/2, 400, 50, 5, RIGHT_ARROW, LEFT_ARROW);



    menuMusic.play();

    rainSound.setVolume(0);
    rainSound.play();
    rainSound.loop();

    rainBackgroundMusic.setVolume(0);
    rainBackgroundMusic.play();
    rainBackgroundMusic.loop();

    truthBackgroundMusic.setVolume(0);
    truthBackgroundMusic.play();
    truthBackgroundMusic.loop();


  // defining vines opacity and growth, which will be called in a later function
  vinesOpacity = 0;
  vinesOpacityGrowth = 1;
}

function draw() {

if (gameState === "menu") {
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
} else if(gameState === "menuToMask") {
  background(57, 77, 0);

  drawSpotlightVines();

  menuHead.update();
  menuHead.display();

  // call the spotlight
  spotlightDisplay();

  // call the spotlight text
  spotlightText();

  displayTransitionMenuToMask();

} else if(gameState === "maskIn") {

  drawBackground();
  drawBackgroundText()

  // call the rain.js functions through the array
    for (var i = 0; i < rain.length; i++) {
      rain[i].update();
      rain[i].touchedBottom();
      rain[i].display();
      rain[i].handleCollision(umbrella);
    }

    displayTransitionFadeInMask();

    menuMusic.setVolume(0);
    truthBackgroundMusic.setVolume(0);
    rainBackgroundMusic.currentTime(0);
    rainBackgroundMusic.setVolume(1);
    rainSound.currentTime(0);
    rainSound.setVolume(1);

  } else if (gameState === "mask") {
  drawBackground();
  drawBackgroundText()

  maskPlayer.update();
  maskPlayer.display();

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
} else if (gameState === "menuToTruth") {
  background(57, 77, 0);

  drawSpotlightVines();

  menuHead.update();
  menuHead.display();

  // call the spotlight
  spotlightDisplay();

  // call the spotlight text
  spotlightText();

  displayTransitionMenuToTruth();

} else if (gameState === "truthIn") {

  drawTruthBackground();

  for (var i = 0; i < pebbles.length; i++) {
    pebbles[i].update();
    pebbles[i].touchedBottom();
    pebbles[i].display();
    pebbles[i].handleCollision(truthPlayer);

  }

  displayTransitionFadeInTruth();

  menuMusic.setVolume(0);
  truthBackgroundMusic.currentTime(0);
  truthBackgroundMusic.setVolume(1);
  rainBackgroundMusic.setVolume(0);
  rainSound.setVolume(0);

} else if (gameState === "truth") {

    drawTruthBackground();
    drawTruthBackgroundText();

    truthPlayer.update();
    truthPlayer.handleInput();
    truthPlayer.display();

    for (var i = 0; i < pebbles.length; i++) {
      pebbles[i].update();
      pebbles[i].touchedBottom();
      pebbles[i].display();
      pebbles[i].handleCollision(truthPlayer);

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
    // menuSpotlightSound.play();
    // menuSpotlightSound.setVolume(0);
  }
}

// keyPressed()
//
// press a certain key on the keyboard to start either the truth or mask minigames
function keyPressed() {
  if (keyCode === CONTROL) {
    if(menuHead.x === 200) {
      gameState = "menuToMask";
    }
  } else if (keyCode === SHIFT) {
    if(menuHead.x === 800) {
      gameState = "menuToTruth";
    }
  }
}


///////////////////////////////////////////////////////// Mask game functions below

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



////////////////////////////////////// the following functions are
////////////////////////////////////// display transitions between the menu and the mask game

// displayTransitionFadeToMask()
//
// when menu choice to mask game is taken, fade to black
function displayTransitionMenuToMask() {

  transitionAlphaOut += 2;
  fill(0, transitionAlphaOut)
  rect(0,0, width, height);

  if (transitionAlphaOut >= 255) {
    gameState = "maskIn";
  }
 }

// displayTransitionFadeInMask()
//
// When the menu fade to black is finished, fade from black into the mask minigame
 function displayTransitionFadeInMask() {

   transitionAlphaIn -= 2;
   fill(0, transitionAlphaIn);
   rect(0, 0, width, height);

   if (transitionAlphaIn <= 0) {
     gameState = "mask";
   }
 }

 //////////////////////////////////// the following functions are
 //////////////////////////////////// the game functions for the "truth" minigame

function drawTruthBackground() {

  rectMode(CENTER);

  // sky
  fill(0, 38, 77);
  rect(500, 200, 1000, 400);
  fill(255, 10);
  ellipse(500, 0, 1000, 150);

  //buildings
  fill(104);
  rect(500, 300, 120, 400);
  rect(500, 100, 60, 70);
  rect(500, 50, 10, 40);
  fill(26);
  rect(75, 300, 150, 400);
  rect(925, 300, 150, 400);
  fill(52);
  rect(225, 300, 150, 300);
  rect(775, 300, 150, 300);
  fill(78);
  rect(375, 300, 150, 200);
  rect(625, 300, 150, 200);


  // cement ground
  fill(55);
  rect(500, 450, 1000, 100);

  // bushes (a mess of green ellipses)
  fill(57, 77, 0);
  ellipse(0, 400, 200, 90);
  ellipse(150, 390, 100, 110);
  ellipse(225, 390, 150, 80);
  ellipse(350, 360, 120, 130);
  ellipse(400, 400, 80, 90);
  ellipse(450, 390, 250, 100);
  ellipse(525, 400, 175, 110);
  ellipse(620, 410, 125, 70);
  ellipse(650, 380, 200, 95);
  ellipse(790, 400, 150, 110);
  ellipse(930, 380, 100, 110);
  ellipse(870, 410, 100, 80);
  ellipse(1000, 400, 150, 75);
  ellipse(75, 400, 100, 60);
  ellipse(265, 400, 125, 110);

  // bench
  fill(32, 16, 0);
  rect(500, 400, 200, 60);
  rect(500, 415, 230, 30);
  rect(400, 455, 15, 50);
  rect(415, 440, 10, 25);
  rect(600, 455, 15, 50);
  rect(585, 440, 10, 25);

}

// drawTruthBackgroundText
//
// draw the background text for the truth minigame, such as the instructions and "score"
function drawTruthBackgroundText() {
  textSize(18);
  fill(255);
  textFont(displayFont);
  text("<--- Keep the Dark Thoughts at Bay --->", 160, 480);
  textSize(24);
  text("Anxiety:", 900, 50);
  text(truthPlayer.score, 950, 50);
}

// displayTransitionMenuToTruth()
//
// when the menu head is in place and shift is pressed, fade the menu to black
function displayTransitionMenuToTruth() {

  transitionAlphaOut += 2;
  fill(0, transitionAlphaOut)
  rect(0,0, width, height);

  if (transitionAlphaOut >= 255) {
    gameState = "truthIn";
  }
 }

 // displayTransitionFadeInTruth()
 //
 // When the menu fade to black is finished, fade from black into the truth minigame
  function displayTransitionFadeInTruth() {

    transitionAlphaIn -= 2;
    fill(0, transitionAlphaIn);
    rect(500, 250, width, height);

    if (transitionAlphaIn <= 0) {
      gameState = "truth";
    }
  }
