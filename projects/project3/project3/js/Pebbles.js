// A new class to create the pebbles which will be thrown at the player character in the truth
// minigame. much like the rain object in the mask game, they will come down from the top
// but will instead vary in x-direction to a certain degree
// the challenge here will be to dodge, much like a bullet hell
// This is supposed to reflect how when depressive or in a bad state of mind,
// you have a real hard time just operating normally and you might feel attacked all the time


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

Pebbles.prototype.update = function() {

}

Pebbles.prototype.touchedBottom = function() {

}

Pebbles.prototype.display = function() {
  
}
