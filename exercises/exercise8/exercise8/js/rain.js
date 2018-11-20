// A new class to create the rain, which will come down randomly
// from the top of the canvas and fall down to the bottom
// where the player has to intercept them


// rain
//
// Where the rain object parameters and variables will be configured
// and initialized
function Rain() {
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

// handleCollision()
//
// determines what happens when the rain collides with another object
// in this case, it will be against the umbrella
Rain.prototype.handleCollision = function () {

}
