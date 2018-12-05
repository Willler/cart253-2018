// A new class to create the head object for the menu,

// MenuHead
//
// constructor for the menu head object and where its parameters
// are initialized
function MenuHead(x, y, vx, vy, angle, radius) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.angle = angle;
  this.radius = radius;
}

// MenuHead update()
//
// update the movement of the head object according to if statement
MenuHead.prototype.update = function () {

  // checks if mouse is to the left of the screen or on the right, then moves the head accordingly
  if(mouseX > (width/2) + 100) {

      this.x = this.x - this.vx;
      console.log("right");

  } else if (mouseX < (width/2) - 100) {

      this.x = this.x + this.vx;
      console.log("left");
  }

  // constrains the x-axis to within 200 pixels of the edges of the canvas
  this.x = constrain(this.x, 200, width - 200);
}


// menuhead display
//
// where the object is drawn
MenuHead.prototype.display = function () {

  push();

  // calculate just how the head will pulsate
  var growth = sin(this.angle) * (this.radius/10);

  // the shadow
  noStroke();
  ellipseMode(CENTER);

  fill(25);
  ellipse((this.x) + 10, this.y + 50, 130 + growth, 150 + growth);
  noStroke();
  ellipse((this.x) + 10, this.y, 150 + growth);

  // hair in the back
  fill(130, 0, 0);
  ellipse(this.x, this.y + 70, 140 + growth, 120 + growth);

  // the face
  ellipseMode(CENTER);
  fill(204, 153, 102);
  ellipse(this.x, this.y + 50, 130 + growth, 150 + growth);

  // the glasses
  noFill();
  stroke(150,0,0);
  strokeWeight(2);
  ellipse(this.x - 25, this.y + 75, 25 + growth);
  ellipse(this.x + 25, this.y + 75, 25 + growth);

  // the hair
  fill(150,0,0);
  noStroke();
  ellipse(this.x, this.y, 150 + growth);
  ellipse(this.x + 60, this.y + 35, 30 + growth, 100 + growth);
  ellipse(this.x - 60, this.y + 35, 30 + growth, 100 + growth);
  ellipse(this.x + 70, this.y + 15, 30 + growth, 70 + growth);
  ellipse(this.x - 70, this.y + 15, 30 + growth, 70 + growth);


  // the angle of the curve, which determines how fast everything will oscillate
  this.angle += 0.03;

  pop();
}
