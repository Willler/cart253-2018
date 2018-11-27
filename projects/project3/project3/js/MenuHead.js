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

  var growth = sin(this.angle) * (this.radius/10);

  // the shadow
  noStroke();
  ellipseMode(CENTER);
  fill(25);
  ellipse((this.x) + 10, this.y + 50, 130 + growth, 150 + growth);
  noStroke();
  ellipse((this.x) + 10, this.y, 150 + growth);

  // the face
  ellipseMode(CENTER);
  fill(204, 153, 102);
  ellipse(this.x, this.y + 50, 130 + growth, 150 + growth);

  // the bowl cut
  fill(150,0,0);
  noStroke();
  ellipse(this.x, this.y, 150 + growth);

  // the angle of the curve, which determines how fast everything will oscillate
  this.angle += 0.03;

  pop();
}
