// A new class to create the pebbles which will be thrown at the player character in the truth
// minigame. much like the rain object in the mask game, they will come down from the top
// but will instead vary in x-direction to a certain degree
// the challenge here will be to dodge, much like a bullet hell
// This is supposed to reflect how when depressive or in a bad state of mind,
// you have a real hard time just operating normally and you might feel attacked all the time
/// the more the player is hit, the more the parasite attached to it will grow and eventually, it will become too much


// pebbles
//
// The constructor for the pebbles, which determines the
// parameters which will be called throughout the script
function Pebbles(x, y, vx, vy, size, border, speed) {
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
// where changes to the object are determined
Pebbles.prototype.update = function() {
  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;
}

// touchedBottom()
//
// when the pebbles touch the bottom of the canvas, reset them to the top
// with a random, constrained x-direction
Pebbles.prototype.touchedBottom = function() {
  // check if the y value is greater than the height of the canvas
  if (this.y > height) {
    this.y = 0;
    this.x = random(10, 990);
  }
}

// display()
//
// where we determine what the pebbles will look like
Pebbles.prototype.display = function() {
  fill(0);
  ellipse(this.x, this.y, this.size);
}

// handleCollision()
//
// determine what happens when pebbles touch the player
// in this case, it will decrease the "score" and make the parasite grow
Pebbles.prototype.handleCollision = function(truthPlayer) {

  // calculate of edges of pebbles and player overlap, if so, do something
  if (this.y + this.size > truthPlayer.y && this.x > truthPlayer.x - truthPlayer.size/2  && this.x < truthPlayer.x + truthPlayer.size/2) {

    // set position back at the top
    this.y = 0;

    // set x value to random
    this.x = random(10, 990);

    // increase anxiety level
    truthPlayer.score ++;
  }
}
