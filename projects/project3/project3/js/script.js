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
var gameState = 0;

// preload()
//
// preload assets before running the code, such as fonts, images and sounds
function preload() {
  displayFont = loadFont("assets/fonts/display.ttf");

  menuMusic = new Audio("assets/sounds/waltz.wav");
  menuSpotlightSound = new Audio("assets/sounds/strum.wav");
}

function setup() {
  createCanvas(1000,500);


  // calling objects
  menuHead = new MenuHead(width/2, height/2, 2, 0, 0, 150);

  // play the background menuMusic
  menuMusic.play();
  menuMusic.loop = true;

  // defining vines opacity and growth, which will be called in a later function
  vinesOpacity = 0;
  vinesOpacityGrowth = 1;
}

function draw() {

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
}

///////////////////////////////////// NOTE: the following functions all have the same (or similar) if statements
///////////////////////////////////// but they are separated for clarity


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
  } else if (menuHead.x === (width - 200)) {
    //heading
    text("The Truth", 350, height/2);
    //flavor
    textSize(24);
    text("- The Side Seen by None -", 350, (height/2) + 50);
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
function startGame() {

  if(menuHead.x === 200){
    if (keyIsDown(CONTROL)) {
      gameState = 2;
    }
  } else if (menuHead.x === 800) {
    if (keyIsDown(SHIFT)) {
      gameState = 1;
    }
  }
}
