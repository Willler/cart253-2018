/// The script file for the player class which will be used in the truth
/// minigame, it will interact with the pebbles object
/// and will have to dodge them in order to not let the "depression"
/// parasite fester and grow

// TruthPlayer()
//
// Where the player object parameters and variables will be configured
// and initialized, for the truth minigame
function TruthPlayer(x, y, width, height, speed, rightKey, leftKey) {
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
// determine changes to the player object
TruthPlayer.prototype.update = function() {

}

// handleInput()
//
// determine what happens to the player when certain keys are pressed
// such as movement from side to side
TruthPlayer.prototype.handleInput = function() {

}

// display()
//
// what the player will look like
TruthPlayer.prototype.display = function() {

}
