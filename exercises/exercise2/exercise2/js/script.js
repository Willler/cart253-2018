/*********************************************************

Exercise 2 - The Artful Dodger, New Game +
William L'Eriger

Modified Starter code for exercise 2 made by Pippin Barr.

*********************************************************/

// The position and size of our avatar circle
var avatarX;
var avatarY;
var avatarSize = 50;

// The speed and velocity of our avatar circle
var avatarSpeed = 10;
var avatarVX = 0;
var avatarVY = 0;

// The position and size of the enemy circle
var enemyX;
var enemyY;
var enemySize = 50;

// How much bigger the enemy circle gets with each successful dodge
var enemySizeIncrease = 5;

// The speed and velocity of our enemy circle
var enemySpeed = 5;
var enemyVX = 5;

// How much faster the enemy circle gets with each successful dodge
var enemySpeedIncrease = 0.5;

// How many dodges the player has made
var dodges = 0;

// preload ()
//
// preload objects such as fonts, images and etc. so that they are loaded before the setup and draw functions
function preload() {
  scoreFont = loadFont("assets/fonts/IndieFlower.ttf");
  groundImage = loadImage("assets/images/groundTexture.png");
  avatarImage = loadImage("assets/images/fireball.png");
  enemyImage = loadImage("assets/images/whiteGhost.png");
}

// setup()
//
// Make the canvas, position the avatar and anemy
function setup() {
  // Create our playing area
  createCanvas(500,500);

  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);

  // No stroke so it looks cleaner
  noStroke();
}

// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {
  // The background image, a dungeon wall
  background(groundImage, 100);

  // Set the alignment of text objects on the center
  textAlign(CENTER);

  // Setting the color, size and font of the displayed text
  textSize(28);
  textFont(scoreFont);
  fill(255);

  // The "evasion rating" score which records the number of successful dodges made by the player
  text('Evasion Rating:', 375, 25);

  // Set the score, the number of successful dodges, to text format
  text(dodges, 475, 26);

  // Show the instructions for the cheat ability in text format so that the player knows how to use it,
  // as well as reajusting the text size for this specific text display
  textSize(18);
  text('Use SHIFT to shoo away the ghost!', 325, 475);

  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately
  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }

  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;

  // The enemy always moves at enemySpeed (which increases)
  enemyVX = enemySpeed;
  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;

  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2 + avatarSize/2) {
    // Tell the player they lost
    console.log("YOU LOSE!");
    // Reset the enemy's position
    enemyX = 0;
    enemyY = random(0,height);
    // Reset the enemy's size and speed
    enemySize = 50;
    enemySpeed = 5;
    // Reset the avatar's position
    avatarX = width/2;
    avatarY = height/2;
    // Reset the dodge counter
    dodges = 0;
  }

  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    console.log("YOU LOSE!");
    enemyX = 0;
    enemyY = random(0,height);
    enemySize = 50;
    enemySpeed = 5;
    avatarX = width/2;
    avatarY = height/2;
    dodges = 0;
  }

  // Check if the enemy has moved all the way across the screen, then call the enemyReset function
  if (enemyX > width) {
    enemyReset();
  }

  // Display the current number of successful in the console
  console.log(dodges);

  // Draw the player as an image, a fireball
  image(avatarImage,avatarX,avatarY,avatarSize,avatarSize);

  // Draw the enemy as an image, a spooky white ghost
  image(enemyImage,enemyX,enemyY,enemySize,enemySize);
}

// enemyreset()
//
// Reset the enemy at x = 0, increase the evasion rating score, change the avatar speed and size by a random amount
function enemyReset() {
  // This means the player dodged so update its dodge statistic
  dodges = dodges + 1;
  // Tell them how many dodges they have made
  console.log(dodges + " DODGES!");
  // Reset the enemy's position to the left at a random height
  enemyX = 0;
  enemyY = random(0,height);
  // Increase the enemy's speed and size to make the game harder
  enemySpeed = enemySpeed + enemySpeedIncrease;
  enemySize = enemySize + enemySizeIncrease;
  // Increase or decrease the avatar size by a random amount after each successful dodge, constraint the values so it doesnt drop below 0
  // or go out of control
  avatarSize = constrain(avatarSize, 10, 100);
  avatarSize += random(-10, 10);
  // Increase or decrease the avatar's speed by a random amount after each dodge, constraint values do that it doesnt drop below
  // or above certain values
  avatarSpeed = constrain(avatarSpeed, 5, 15);
  avatarSpeed += random(-5, 5);
}

//  keyPressed()
//
// Check if a key has been pressed and then run the code if it has been
function keyPressed() {
  // Check if the SHIFT key is pressed
  if (keyCode === SHIFT) {
    // Set the enemy x-position back to 0 (on the left border), a cheat ability that gives you more time to dodge
    enemyX = 0;
    // Remove 2 points from the evasion rating, the penalty for using the cheat ability
    dodges -= 2;
    // Tell the player they cheated in the console log;
    console.log("YOU CHEATED!!!");
  }
}
