/// The script file for the player class which will be used in the mask minigame
/// the player will not be able to control their character and will instead have to move
/// the umbrella to protect themselves

// MaskPlayer()
//
// Constructor where the player object parameters and variables will be configured
// and initialized, for the mask minigame
function MaskPlayer() {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.size = size;
  this.speed = speed;
  this.score = 0;
}

// update()
//
// determine changes to the player object
MaskPlayer.prototype.update = function() {
  // move the player with x-velocity
  this.x += this.vx;
}

Mask.prototype.display = function() {
  
}
