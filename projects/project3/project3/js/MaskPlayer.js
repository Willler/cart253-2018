/// The script file for the player class which will be used in the mask minigame
/// the player will not be able to control their character and will instead have to move
/// the umbrella to protect themselves

// MaskPlayer()
//
// Constructor where the player object parameters and variables will be configured
// and initialized, for the mask minigame
function MaskPlayer(x, y, vx, vy, size, speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
  this.score = 0;
}

// update()
//
// determine changes to the player object
MaskPlayer.prototype.update = function() {
  // move the player with x-velocity
  this.x = this.x + this.vx;
  // constrain the player within set boundaries on the x-axis
  if (this.x === 150 || this.x === 850) {
       this.vx = -this.vx;
    }
}

MaskPlayer.prototype.display = function() {
  //hair background
  fill(25);
  ellipse(this.x, this.y + 10, 55, 50);
  ellipse(this.x - 22, this.y + 15, 20, 30);
  ellipse(this.x + 22, this.y + 15, 20, 30);

  //face
  fill(150);
  ellipse(this.x, this.y, 50);

  //glasses
  stroke(0);
  noFill();
  ellipse(this.x - 9, this.y + 10, 15);
  ellipse(this.x + 9, this.y + 10, 15);


  //hair foreground
  noStroke();
  fill(45);
  ellipse(this.x + 25, this.y + 5, 20);
  ellipse(this.x + 15, this.y - 5, 30);
  ellipse(this.x - 25, this.y + 5, 20);
  ellipse(this.x - 15, this.y - 5, 30);
  ellipse(this.x + 2, this.y - 12, 40, 30);
}
