// Duality - The Mask and Reality
// William L'Eriger
//
// A game meant to illustrate the duality between what we let others see
// in public, and how we may actually feel instead
//
// A menu depicting a floating head that you can make move from side to side
// A minigame depicting your public "mask"
// A minigame depicting a parasite/tumor thing that grows heavier and darker when playing


// variable for opacity of vines for the menu, so that they appear gradually
var vinesOpacity;
var vinesOpacityGrowth;

// variable to decide if the page should display the menu, the mask or the Truth
// 0 will be the menu, 1 will be the mask, and 2 the truth
var gameState;

// the variable for the pulsing head in the menu
var menuHead;

// variable for the mask minigame player
var maskPlayer;

// variables for rain array
var rain = [];
var rainDrops = 100;

// variables for the Umbrella
var umbrella;

// variables for the pebbles array
var pebbles = [];
var pebblesCount = 30;

//variable for the truth minigame player
var truthPlayer;

// variables for the pulsing truthParasite
var parasiteAngle = 0;
var parasiteSize;

// variable for gameState transitions
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

  displayFont = loadFont("assets/fonts/display.ttf");
}

function setup() {

  createCanvas(1000,500);

  // initializing the game on the menu state
  gameState = "menu";

  ///////////////////// calling objects ///////////////////////

  /// the pulsing head in the menu
  menuHead = new MenuHead(width/2, height/2, 2, 0, 0, 150);

  // the player within the mask minigame
  maskPlayer = new MaskPlayer(width/2, (height - 50), 2, 0, 5, 0);

  // creating the rain object array
  for (var i = 0; i < rainDrops; i++) {

    rain.push(new Rain(random(50,950),0,random(-1,1),random(3,7),6,5,5));

  }

  // creating the umbrella object for the mask minigame
  umbrella = new Umbrella(width/2, 300, 150, 50, 5, RIGHT_ARROW, LEFT_ARROW);

  // create the array for pebbles for the truth minigame
  for (var i = 0; i < pebblesCount; i++) {
    pebbles.push(new Pebbles(random(50,950),0,random(-2,2),random(2,4),6,5,5));
  }

  // creating the player for the truth minigame
  truthPlayer = new TruthPlayer(width/2, 400, 50, 5, RIGHT_ARROW, LEFT_ARROW);

  ////////////////////////// Initializing Sounds ///////////////////////////

  menuMusic.currentTime(0);
  menuMusic.play();   ///// menu

  rainSound.setVolume(0);
  rainSound.play(); /////// mask
  rainSound.loop();

  rainBackgroundMusic.setVolume(0);
  rainBackgroundMusic.play(); /////// mask
  rainBackgroundMusic.loop();

  truthBackgroundMusic.setVolume(0);
  truthBackgroundMusic.play();  ////// truth
  truthBackgroundMusic.loop();


  // defining vines opacity and growth, which will be called in a later function for the menu
  vinesOpacity = 0;
  vinesOpacityGrowth = 1;
}

function draw() {
  if (gameState === "menu") {  ///////////////// check if it is the menu game state

      background(57, 77, 0);

      // call music and sounds, setting the sounds for other game states to volume zero
      menuMusic.currentTime(0);
      menuMusic.setVolume(1);
      rainSound.setVolume(0);
      rainBackgroundMusic.setVolume(0);
      truthBackgroundMusic.setVolume(0);

      // draw the vines
      drawSpotlightVines();

      // call the menu head object
      menuHead.update();
      menuHead.display();

      // call the spotlight
      spotlightDisplay();

      // call the spotlight text
      spotlightText();

      // call the spotlight sound effect
      playSpotlightSound();

      // place transition values here so they are reset everytime user comes back to menu
      transitionAlphaOut = 0;
      transitionAlphaIn = 255;

  } else if(gameState === "menuToMask") {   ///////////// check if user has chosen the Mask, fade to black

      background(57, 77, 0);

      drawSpotlightVines();

      menuHead.update();
      menuHead.display();

      // call the spotlight
      spotlightDisplay();

      // call the spotlight text
      spotlightText();

      // code for the transition
      displayTransitionMenuToMask();

  } else if(gameState === "maskIn") {   /////////////////////// fade into the mask minigame, only calling visual functions

      // draw the background and such for the mask minigame
      drawMaskBackground();
      drawMaskBackgroundText()

    // call the rain.js functions through the array
      for (var i = 0; i < rain.length; i++) {
        rain[i].update();
        rain[i].touchedBottom();
        rain[i].display();
        rain[i].handleCollision(umbrella);
      }

      // the function for the transition part 2
      displayTransitionFadeInMask();

      // switching the volumes for the music and sounds, setting the mask ones to 1
      menuMusic.setVolume(0);
      truthBackgroundMusic.setVolume(0);
      rainBackgroundMusic.currentTime(0);
      rainBackgroundMusic.setVolume(1); ////// mask
      rainSound.currentTime(0);
      rainSound.setVolume(1);    //// mask

  } else if (gameState === "mask") {    ///////// the main game state for the mask minigame

      // the background and such
      drawMaskBackground();
      drawMaskBackgroundText();

      // calling the player functions for this minigame
      maskPlayer.update();
      maskPlayer.display();

      // functions for the umbrella object
      umbrella.handleInput();
      umbrella.update();
      umbrella.display();

      // call the rain.js functions through the array
      for (var i = 0; i < rain.length; i++) {
        rain[i].update();
        rain[i].touchedBottom();
        rain[i].display();
        rain[i].handleCollision(umbrella);
        rain[i].handlePlayerCollision(maskPlayer);
      }

      // the function in which the rain volume increases based on score
      increaseMaskRainNoise();

      // reset the game to the menu once a certain score is reached
      gameReset();

  } else if (gameState === "menuToTruth") { ///////////// transition from the menu to the truth minigame, fading to black

      // menu background color
      background(57, 77, 0);

       // the vines
      drawSpotlightVines();

      // the menu head object
      menuHead.update();
      menuHead.display();

      // the spotlight function
      spotlightDisplay();

      // the spotlight text function
      spotlightText();

      // calling the function for the fade to black effect
      displayTransitionMenuToTruth();

  } else if (gameState === "truthIn") { ///////////////////////// second part of the transition, fading from black to the truth game

    // draw the background for the truth minigame
    drawTruthBackground();

    // call the pebbles object through an array, which will create an amount equal to the array length
    for (var i = 0; i < pebbles.length; i++) {
      pebbles[i].update();
      pebbles[i].touchedBottom();
      pebbles[i].display();
      pebbles[i].handleCollision(truthPlayer);
    }

    // second transition, fade from black
    displayTransitionFadeInTruth();

    // set music volumes so that only the truth music is heard
    menuMusic.setVolume(0);
    truthBackgroundMusic.currentTime(0); ///// set the song to the beginning
    truthBackgroundMusic.setVolume(1); ///////// truth music
    rainBackgroundMusic.setVolume(0);
    rainSound.setVolume(0);

  } else if (gameState === "truth") {  ////////////////////// the main game state for the truth minigame

    // draw the truth minigame background
    drawTruthBackground();
    drawTruthBackgroundText();

    // the functions for the player object
    truthPlayer.update();
    truthPlayer.handleInput();
    truthPlayer.display();

    // calling the pebbles array
    for (var i = 0; i < pebbles.length; i++) {
        pebbles[i].update();
        pebbles[i].touchedBottom();
        pebbles[i].display();
        pebbles[i].handleCollision(truthPlayer);
    }

    // function for the parasite that grows with the score, complicating things
    truthParasite();

    // reset scores and game to the menu once you reach a certain score
    gameReset();
  }
}


/////////////////////////////////////// Menu functions ///////////////////////////////////

// spotlightDisplay();
//
// shows a spotlight/window where text will appear once the head reaches a certain point
function spotlightDisplay() {

  noStroke();

  // check if the menu head object is at either end of the canvas on the x-axis, message bubble pops up if it is so
  if (menuHead.x === 200) {

    //shadow
    fill(25);
    ellipse(660, height/2 + 10, 500 , 300);

    //spotlight
    fill(204, 153, 102);
    ellipse(650, height/2, 500 , 300);

  } else if (menuHead.x === (width - 200)) {

    //shadow
    fill(25);
    ellipse(340, height/2 + 10, 500, 300);

    //spotlight
    fill(204, 153, 102);
    ellipse(350, height/2, 500, 300);
  }
}


//spotlightText()
//
// function that shows the spotlight text when called
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

    // prompt to start minigame
    textSize(18);
    text("Press Control to Begin", 650, (height/2) + 75);

  } else if (menuHead.x === (width - 200)) {

    //heading
    text("The Truth", 350, height/2);

    //flavor
    textSize(24);
    text("- The Side Seen by None -", 350, (height/2) + 50);

    // prompt to start minigame
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
// there is currently an issue where the sound plays repeatedly
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

// gameReset()
//
// if the score reaches a certain level, send the player back to the menu and reset scores
// this is very abrupt on puprose, as if you are being booted out of a dream
function gameReset() {

  if (truthPlayer.score >= 25) {  ///// mask minigame if statement
    truthPlayer.score = 0;
    gameState = "menu";
    menuHead.x = width/2;
  }

  if (maskPlayer.score <= 0) {  ////// truth minigame if statement
    maskPlayer.score = 0;
    gameState = "menu";
    menuHead.x = width/2;
  }
}

///////////////////////////////////////////////////////// Mask game functions below

// drawMaskBackground()
//
// draw the background image
// an evening cityscape, melancholy and dreary
function drawMaskBackground() {

  // color with opacity to allow for streaks to show behind rain drops in the sky
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

// drawMaskBackgroundText()
//
// put in a text display to subtly show the player the controls
// its not obvious, which is on purpose
// as its not always easy to know what to do in public
function drawMaskBackgroundText() {

  textSize(24);
  fill(255);
  textFont(displayFont);
  text("<--   Brandish Your Mask   -->", 180, 50);
  text("Comfort", 850, 475);
  text(maskPlayer.score, 925, 475);

}

// increaseMaskRainNoise()
//
// the more the comfort level decreases, the louder the rain gets
/// adjust volume using the sound library and .setVolume()
function increaseMaskRainNoise() {

   if (maskPlayer.score < 20 && maskPlayer.score >= 15) {  /// check if the score is between 19 and 15

    rainSound.setVolume(2);

  } else if (maskPlayer.score < 15 && maskPlayer.score >= 10) {   /// between 14 and 10

    rainSound.setVolume(3);

  } else if (maskPlayer.score < 10 && maskPlayer.score >= 5) {  /// between 9 and 5

    rainSound.setVolume(4);

  } else if (maskPlayer.score < 5 && maskPlayer.score >= 0) {  /// between 4 and 0

    rainSound.setVolume(5);

  }
}

// displayTransitionFadeToMask()
//
// when menu choice to mask game is taken, fade to black
function displayTransitionMenuToMask() {

  transitionAlphaOut += 2;
  fill(0, transitionAlphaOut)
  rect(0,0, width, height);

  if (transitionAlphaOut >= 255) {  /// if the alpha reaches 255 or above, change state
    gameState = "maskIn";
  }
}

// displayTransitionFadeInMask()
//
// When the menu fade to black is finished, fade from black into the mask minigame
function displayTransitionFadeInMask() {

   transitionAlphaIn -= 2;
   fill(0, transitionAlphaIn);
   rect(500, 250, width, height);

   if (transitionAlphaIn <= 0) {  /// if the alpha reaches 0 or under, change state
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
// when the menu head is in place and shift is pressed, fade the menu to black using a black rectangle above the canvas
function displayTransitionMenuToTruth() {

  transitionAlphaOut += 2;  // transition rate
  fill(0, transitionAlphaOut)
  rect(0,0, width, height);

  if (transitionAlphaOut >= 255) {  /// if the alpha is 255 or above, change state
    gameState = "truthIn";
  }
 }

 // displayTransitionFadeInTruth()
 //
 // When the menu fade to black is finished, fade from black into the truth minigame
function displayTransitionFadeInTruth() {

    transitionAlphaIn -= 2;  //// transition rate
    fill(0, transitionAlphaIn);
    rect(500, 250, width, height);

    if (transitionAlphaIn <= 0) {   //// if the alpha is 0 or under, change state
      gameState = "truth";
    }
  }

// truthParasite
//
// a pulsing parasite that grows as the player gets hit by pebbles, obscuring the screen
function truthParasite() {

    var parasiteGrowth = sin(parasiteAngle) * (parasiteSize/10);  //// calculation the pulsing

    fill(0);
    ellipseMode(CENTER);
    ellipse(500, 250, parasiteSize + parasiteGrowth);

    /// check player score and change the parasite size accordingly
    if (truthPlayer.score <= 3) { // 3 or under

      parasiteSize = 50;

    } else if (truthPlayer.score > 3 && truthPlayer.score <= 6) { // between 4 and 6

      parasiteSize = 100;

    } else if (truthPlayer.score > 6 && truthPlayer.score <= 9) { // between 7 and 9

      parasiteSize = 150;

    } else if (truthPlayer.score > 9 && truthPlayer.score <= 12) { // between 10 and 12

      parasiteSize = 200;

    } else if (truthPlayer.score > 12 && truthPlayer.score <= 15) { // between 13 and 15

      parasiteSize = 250;

    }

    parasiteAngle += 0.1; //// the rate at which the parasite pulses, so the height of the sine waves

}
