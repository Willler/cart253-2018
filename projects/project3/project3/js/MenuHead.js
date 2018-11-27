// A new class to create the head object for the menu,



// variables for oscillation
var angle = 0;
var radius = 150;

// MenuHead
//
// constructor for the menu head object and where its parameters
// are initialized
function MenuHead(x, y, vx, vy, size) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
}

// MenuHead update()
//
// update the movement of the head object according to if statement
MenuHead.prototype.update = function () {
  if(this.x > (width/2) + 100) {
      this.x = this.x - this.vx;
  } else if (mouseX < (width/2) - 100) {
      this.x = this.x + this.vx;
  }

  this.x = constrain(this.x, 200, width - 200);
}


MenuHead.prototype.display = function () {
  var growth = sin(angle) * (radius/10);

  // the shadow
  noStroke();
  ellipseMode(CENTER);
  fill(25);
  ellipse((this.x) + 10, this.Y + 50, 130 + growth, 150 + growth);
  noStroke();
  ellipse((this.x) + 10, this.Y, 150 + growth);

  // the face
  ellipseMode(CENTER);
  fill(204, 153, 102);
  ellipse(this.x, this.y + 50, 130 + growth, 150 + growth);

  // the bowl cut
  fill(150,0,0);
  noStroke();
  ellipse(this.x, this.y, 150 + growth);

  // the mouth
  // stroke(0);
  // strokeWeight(5);
  // line(((width/2) - 10) + growth, 340, (width/2) + 10, 340);

  // the angle of the curve, which determines how fast everything will oscillate
  angle += 0.03;
}
