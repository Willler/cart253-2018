/// The script file for the player class which will be used in the truth
/// minigame, it will interact with the pebbles object
/// and will have to dodge them in order to not let the "depression"
/// parasite fester and grow

// TruthPlayer()
//
// Where the player object parameters and variables will be configured
// and initialized, for the truth minigame
function TruthPlayer(x, y, size, speed, rightKey, leftKey) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.size = size;
  this.speed = speed;
  this.rightKey = rightKey;
  this.leftKey = leftKey;
  this.score = 0;
}

// update()
//
// determine changes to the player object
TruthPlayer.prototype.update = function() {
  // move the player with x-velocity
  this.x += this.vx;

  // screen wrapping, if player touches the edge of the screen, teleport to the other Side

  if ((this.x - 25) >= width) {
    this.x  = 0;
  }

  if ((this.x + 25) <= 0) {
    this.x = width;
  }
}

// handleInput()
//
// determine what happens to the player when certain keys are pressed
// such as movement from side to side
TruthPlayer.prototype.handleInput = function() {

  // if the right key is touched, move right
  if (keyIsDown(this.rightKey)) {

    this.vx = this.speed;

  } else if (keyIsDown(this.leftKey)) { /// if left key touched, move left

    this.vx = -this.speed;

  } else { // else do nothing
    
    this.vx = 0;
  }
}

// display()
//
// what the player will look like
TruthPlayer.prototype.display = function() {
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
