// A new class to create the umbrella, which shields the player against
// the atrocities of the world(or rain)
// a symbol for the "mask" we wear in public


// umbrella()
//
// Where the umbrella object parameters and variables will be configured
// and initialized
function Umbrella(x, y, width, height, speed, rightKey, leftKey) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
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

  // move player with x velocity
  this.x += this.vx;
}

// handleInput()
//
// function that determines how the umbrella will be controlled
// by the player, such as movement, check if right or left arrow key is pressed
Umbrella.prototype.handleInput = function () {

  // if the appropriate key is down, move left or right, if nothing pressed stay still
  if (keyIsDown(this.rightKey)) {

    this.vx = this.speed;

  }
  else if (keyIsDown(this.leftKey)) {

    this.vx = -this.speed;

  }
  else {

    this.vx = 0;

  }
}

// display()
//
// where we determine the object's appearance
// it is a bright red umbrella to contrast the rest of the elements
Umbrella.prototype.display = function () {

  noStroke();
  rectMode(CENTER);

  // frills and decorations on the bottom
  fill(150, 0, 0);
  ellipse(this.x, this.y + 25, this.width/3, this.height/2);
  ellipse(this.x - 40, this.y + 15, this.width/3, this.height);
  ellipse(this.x - 60, this.y + 20, this.width/4, this.height +10);
  ellipse(this.x + 40, this.y + 15, this.width/3, this.height);
  ellipse(this.x + 60, this.y + 20, this.width/4, this.height +10);

  fill(200, 0, 0);
  // the main object which raindrops interact with
  ellipse(this.x, this.y, this.width, this.height);

  fill(0);
  rect(this.x, this.y - 10, 5, 10, 3);

}
