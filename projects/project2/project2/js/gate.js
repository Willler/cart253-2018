// Gate - Acceleration
//
// A class to define how a new type of object, the gate, behaves.
// Its functions include the ability to make the ball accelerate, slowly and gradually

// gate constructor
//
// Sets the properties with the provided arguments
function Gate(x, y, w, h, border, acceleration, red, blue) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.border = border;
  this.acceleration = acceleration;
// variables for color
  this.blue = blue;
  this.red = red;
}

//gate display()
//
// displays the gate objects according to attributes
Gate.prototype.display = function() {
  noStroke();
  fill(this.red,0,this.blue);
  rect(this.x, this.y, this.w, this.h, this.border);
}
