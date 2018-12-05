// A new class to create the rain, which will come down randomly
// from the top of the canvas and fall down to the bottom
// where the player has to intercept them


// rain
//
// Where the rain object parameters and variables will be configured
// and initialized
function Rain(x, y, vx, vy, size, border, speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.border = border;
  this.speed = speed;
}

// update()
//
// where changes to the rain object are determined
Rain.prototype.update = function () {
  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;
}

// touchedBottom()
//
// function that makes the rain drop do something when they reach the bottom
// of the canvas
Rain.prototype.touchedBottom = function () {
  // check if the y value is greater than the height of the canvas
  if (this.y > height) {
    this.y = 0;
    this.x = random(10, 990);
  }
}

// display()
//
// where we determine the object's appearance
Rain.prototype.display = function () {

  fill(200);
  noStroke();
  ellipse(this.x, this.y, this.size);

}

// handleCollision(umbrella)
//
// determines what happens when the rain collides with another object
// in this case, it will be against the umbrella
Rain.prototype.handleCollision = function(umbrella) {

  // a very convoluted if statement to calculate if the y-values of the rain and the umbrella have intersected
  // and if so, reset the rain drop to the top at a random x value
  // also constraining the area affected to within the umbrella x-value range
  if (this.y + this.size > umbrella.y && this.x > umbrella.x - umbrella.width/2  && this.x < umbrella.x + umbrella.width/2) {

    this.y = 0;
    this.x = random(10, 990);

  }
}

// handlePlayerCollision()
//
// check if the rain object has touched the player
Rain.prototype.handlePlayerCollision = function(maskPlayer) {

  // check if the rain object overlaps with the maskPlayer by calculating if their edges touch
  if (this.y + this.size > maskPlayer.y && this.x > maskPlayer.x - maskPlayer.size/2  && this.x < maskPlayer.x + maskPlayer.size/2) {

    // set position back at the top of the canvas
    this.y = 0;

    // set x-position randomly betwen a specific range
    this.x = random(10, 990);

    // decrease the score/comfort
    maskPlayer.score --;
  }
}
