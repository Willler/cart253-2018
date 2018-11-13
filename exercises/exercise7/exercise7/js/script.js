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

function setup() {
  createCanvas(1000,500);

}

function draw() {
  drawMenuHead();
}


// drawMenuHead
//
// where the oscillating face for the menu is drawn
function drawMenuHead() {

  // push content
  push();

  // draw background
  background(0);

  // variable and calculation for oscillation, using a sine wave
  var growth = sin(angle) * (radius/10);

  // the shadow
  ellipseMode(CENTER);
  fill(25);
  ellipse((width/2) + 10, 300, 130 + growth, 150 + growth);
  noStroke();
  ellipse((width/2) + 10, height/2, 150 + growth);

  // the hat
  ellipseMode(CENTER);
  fill(255);

  // the face
  ellipse(width/2, 300, 130 + growth, 150 + growth);
  fill(255,0,0);
  noStroke();
  ellipse(width/2, height/2, 150 + growth);

  // the mouth
  // stroke(0);
  // strokeWeight(5);
  // line(((width/2) - 10) + growth, 340, (width/2) + 10, 340);

  // the angle of the curve, which determines how fast everything will oscillate
  angle += 0.03;

  // pop contents
  pop();
}
