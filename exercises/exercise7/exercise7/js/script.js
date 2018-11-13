// Duality - The Mask and Reality
// William L'Eriger
//
// A prototype of the Menu system I want to implement in my final project
// An interactive menu that changes according to mouse location
//
// A floating, oscillating "head" in the middle of the canvas will shift to the left or right
// and text previously hidden in the background will get revealed within spotlight

function setup() {
  createCanvas(1000,500);
  background(0);
}

function draw() {
  drawMenuHead();
}

function drawMenuHead() {
  push();

  // the hat
  ellipseMode(CENTER);
  fill(255);

  // the face
  ellipse(width/2, 300, 130, 150);
  fill(255,0,0);
  noStroke();
  ellipse(width/2, 250, 150, 150);

  // the mouth
  stroke(0);
  strokeWeight(5);
  line((width/2) - 10, 340, (width/2) + 10, 340);
  
  pop();
}
