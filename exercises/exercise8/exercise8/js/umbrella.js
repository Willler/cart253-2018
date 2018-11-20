// A new class to create the umbrella, which shields the player against
// the atrocities of the world(or rain)
// a symbol for the "mask" we wear in public


// umbrella()
//
// Where the umbrella object parameters and variables will be configured
// and initialized
function Umbrella(x, y, vx, vy, width, height, speed, rightKey, leftKey) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.width = width;
  this.height = height;
  this.speed = speed;
  this.rightKey = rightKey;
  this.leftKey = leftKey;
}

// update()
//
// where changes to the umbrella object are determined
Umbrella.prototype.update = function () {

}

// handleInput()
//
// function that determines how the umbrella will be controlled
// by the player, such as movement
Umbrella.prototype.handleInput = function () {

}

// display()
//
// where we determine the object's appearance
Umbrella.prototype.display = function () {

  noStroke();
  rectMode(CENTER);

  fill(150, 0, 0);
  ellipse(this.x, this.y + 25, this.width/3, this.height/2);
  ellipse(this.x - 40, this.y + 15, this.width/3, this.height);
  ellipse(this.x - 60, this.y + 20, this.width/4, this.height +10);
  ellipse(this.x + 40, this.y + 15, this.width/3, this.height);
  ellipse(this.x + 60, this.y + 20, this.width/4, this.height +10);

  fill(200, 0, 0);
  ellipse(this.x, this.y, this.width, this.height);

  fill(0);
  rect(this.x, this.y - 10, 5, 10, 3);

}
