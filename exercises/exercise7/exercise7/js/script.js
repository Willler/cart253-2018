// Duality - The Mask and Reality
// William L'Eriger
//
// A prototype of the Menu system I want to implement in my final project
// An interactive menu that changes according to mouse location
//
// A floating, oscillating "head" in the middle of the canvas will shift to the left or right
// and text previously hidden in the background will get revealed within spotlight


// variables for oscillation
var angle = 0;
var radius = 150;


// variables for position and velocity
var headX;
var headY;
var headVX;

// variables for constraining head position on the x axis
var headMaxX

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
  headX = width/2;
  headY = height/2;

  // the velocity variables, defined
  headVX = 2;

  // play the background menuMusic
  menuMusic.play();
  menuMusic.loop = true;
}

function draw() {
  drawMenuHead();
  spotlightDisplay();
  spotlightText();
  playSpotlightSound();
}


// drawMenuHead
//
// where the oscillating face for the menu is drawn
function drawMenuHead() {

  // push content
  push();

  // draw background
  background(57, 77, 0);

  drawSpotlightVines();

  // determine velocity of the head image
  headMovement();

  // variable and calculation for oscillation, using a sine wave
  var growth = sin(angle) * (radius/10);

  // the shadow
  noStroke();
  ellipseMode(CENTER);
  fill(25);
  ellipse((headX) + 10, headY + 50, 130 + growth, 150 + growth);
  noStroke();
  ellipse((headX) + 10, headY, 150 + growth);

  // the face
  ellipseMode(CENTER);
  fill(204, 153, 102);
  ellipse(headX, headY + 50, 130 + growth, 150 + growth);

  // the hat
  fill(150,0,0);
  noStroke();
  ellipse(headX, headY, 150 + growth);

  // the mouth
  // stroke(0);
  // strokeWeight(5);
  // line(((width/2) - 10) + growth, 340, (width/2) + 10, 340);

  // the angle of the curve, which determines how fast everything will oscillate
  angle += 0.03;

  // pop contents
  pop();
}

// headMovement()
//
// the function in which velocity is determined, using a mouseX if statement
function headMovement() {

// if mouse left of canvas, make object move to the right, vice-versa
  if(mouseX > (width/2) + 100) {
    headX = headX - headVX;
  } else if (mouseX < (width/2) - 100) {
    headX = headX + headVX;
  }

  headX = constrain(headX, 200, width - 200);
}

// spotlightDisplay();
//
// shows a spotlight/window where text will appear once the head reaches a certain point
function spotlightDisplay() {

  noStroke();

  if (headX === 200) {
    // vx = 0;
    fill(25);
    ellipse(660, height/2 + 10, 500 , 300);
    fill(255);
    ellipse(650, height/2, 500 , 300);
  } else if (headX === (width - 200)) {
    // vx = 0;
    fill(255);
    ellipse(350, height/2, 500, 300);
  }
}

function spotlightText() {

// how the text will look
  textAlign(CENTER);
  noStroke();
  fill(150, 0, 0);
  textSize(64);
  textFont(displayFont);

// if statement to show text when constrain extremities are shown
  if (headX === 200) {
    text("The Mask", 650, height/2);
    textSize(24);
    text("- The Side Seen in Public -", 650, (height/2) + 50);
  } else if (headX === (width - 200)) {
    text("The Truth", 350, height/2);
    textSize(24);
    text("- The Side Seen by None -", 350, (height/2) + 50);
  }
}

// drawSpotlightVines()
//
// draws a background vine-like display using enlarged letters when head stops moving
function drawSpotlightVines() {

  noStroke();

  if (headX === 200) {
    textSize(1500);
    text("FV", 400, 800);
  } else if (headX === (width - 200)) {
    textSize(1500);
    text("QS", 150, 800);
  }

}

// playSpotlightSound()
//
// plays the spotlight guitar strum once head stops moving
function playSpotlightSound() {
  if (headX === 200 || headX === (width - 200)) {
    menuSpotlightSound.play();
  }
}
