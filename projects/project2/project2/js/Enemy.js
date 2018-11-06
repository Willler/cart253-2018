// Enemy
//
// A class to define how a new type of object, the enemy, behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles, reducing the player's score when hits

// enemy constructor
//
// Sets the properties with the provided arguments
function Enemy(x,y,vx,vy,size,border,speed) {
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
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.
Enemy.prototype.update = function () {
  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;

  // Constrain y position to be on screen
  this.y = constrain(this.y,0,height-this.size);

  // Check for touching upper or lower edge and reverse velocity if so
  if (this.y === 0 || this.y + this.size === height) {
    this.vy = -this.vy;
  }
}

// isOffScreen()
//
// Checks if the ball has moved off the screen and, if so, wraps it to the other side, x axis
Enemy.prototype.isOffScreen = function () {
  // Check for going off screen and wrap if so
  if (this.x + this.size < 0) {
    this.x += width;
  } else if (this.x > width) {
    x -= width;
  }
}

// display()
//
// Draw the Enemy as a rectangle on the screen
Enemy.prototype.display = function () {
  fill(244, 66, 209);
  rect(this.x,this.y,this.size,this.size, this.border);
}

// handleCollision(paddle)
//
// Check if this enemy object overlaps the paddle passed as an argument
// and if so reverse x velocity to bounce and take off a point from the player
Enemy.prototype.handleCollision = function(paddle) {
  // Check if the ball overlaps the paddle on x axis
  if (this.x + this.size > paddle.x && this.x < paddle.x + paddle.w) {
    // Check if the ball overlaps the paddle on y axis
    if (this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
      // If so, move ball back to previous position (by subtracting current velocity)
      this.x -= this.vx;
      this.y -= this.vy;
      // Reverse x velocity to bounce
      this.vx = -this.vx;
    }
  }
}
