// Gate
//
// A class to define how a new type of object, the gate, behaves.
// Its functions include the ability to make the ball accelerate and decelerate, depending on which one
// as well as reversing the ball y-direction

// gate constructor
//
// Sets the properties with the provided arguments
function Gate(x, y, w, h, border,acceleration, red, blue) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.border = border;
  this.acceleration = acceleration;

  this.blue = blue;
  this.red = red;
}

//gate display()
//
// displays the gate objects according to attributes
Gate.prototype.display = function() {
  fill(this.red,0,this.blue);
  rect(this.x, this.y, this.w, this.h, this.border);
}
