// Ball
//
// A class to define how a ball behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles.

// set a variable for the background stripes color, three different ones for variation
var backgroundStripesColor1 = 255;
var backgroundStripesColor2 = 210;
var backgroundStripesColor3 = 240;

// Ball constructor
//
// Sets the properties with the provided arguments
// **added the border attribute
function Ball(x,y,vx,vy,size,border,speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.border = border; //////////////********NEWWWWWWWW
  this.speed = speed;

  this.scoreRight = 0;
  this.scoreLeft = 0;
}

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.
Ball.prototype.update = function () {
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
// Checks if the ball has moved off the screen and, if so, returns true.
// Otherwise it returns false.
Ball.prototype.isOffScreen = function () {
  // Check for going off screen and reset if so

  if (this.x + this.size < 0) {
    // this.scoreRight ++;
    // console.log(this.scoreLeft, this.scoreRight);
    return "left";
  }  else if (this.x > width) {
    // this.scoreLeft ++;
    // console.log(this.scoreLeft, this.scoreRight);
    return "right";
  } else {
    return "neither";
  }
}

// display()
//
// Draw the ball as a rectangle on the screen
Ball.prototype.display = function () {
  fill(244, 66, 209);
  rect(this.x,this.y,this.size,this.size, this.border); ////////*********added border
}

// handleCollision(paddle)
//
// Check if this ball overlaps the paddle passed as an argument
// and if so reverse x velocity to bounce
Ball.prototype.handleCollision = function(paddle) {
  // Check if the ball overlaps the paddle on x axis
  if (this.x + this.size > paddle.x && this.x < paddle.x + paddle.w) {
    // Check if the ball overlaps the paddle on y axis
    if (this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
      // If so, move ball back to previous position (by subtracting current velocity)
      this.x -= this.vx;
      this.y -= this.vy;
      // Reverse x velocity to bounce
      this.vx = -this.vx;
      // change the color of the background stripes to a random, light color
      backgroundStripesColor1 = random(50, 150);
      backgroundStripesColor2 = random(50, 150);
      backgroundStripesColor3 = random(50, 150);
      // add a sound for when the ball hits the paddle
      paddleHitSound.play();
    }
  }
}

//handleCollision(gate)
//
// check if the ball overlaps with the gates in an argument
// if it is, accelerate or decelerate
Ball.prototype.gateCollision = function(gate) {
  // check overlap on x axis
  if (this.x + this.size > gate.x && this.x < gate.x + gate.w) {
    //check overlap on y axis
    if (this.y + this.size > gate.y && this.y < gate.y + gate.h) {
      // check if vx is positive
      if (this.vx > 0) {
        this.vx += 0.1;
        //check if vx is negative
      } else if (this.vx < 0) {
        this.vx -= 0.1;
      }
    console.log(this.vx);

  }
}

  //  if (this.x < gate.x + gate.w) {
  //    if (this.y + this.size > gate.y && this.y < gate.y + gate.h) {
  //     console.log("overlapping gate");
  //     this.x --;
  //   }
  // }
}

// reset()
//
// Set position back to the middle of the screen
Ball.prototype.reset = function () {
  this.x = width/2;
  this.y = height/2;
}
