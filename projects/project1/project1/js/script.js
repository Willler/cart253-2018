/******************************************************

Game - Chaser (Disease Killer version)
William L'Eriger - Original by Pippin Barr

A simple game of cat and mouse, except you play as a warrior cell inside a disease-adled body. The disease is
uncarable, so the game goes on forever until you give up on life, or die trying to save yourself.

***I forgot to prefix my commits with P1, so this last one is to mark the end of Project 1***

Physics-based movement, keyboard controls, health/stamina,
sprinting, random movement, screen wrap.

******************************************************/

// Track whether the game is over
var gameOver = false;

// Player position, size, velocity
var playerX;
var playerY;
var playerRadius = 25;
var playerVX = 0;
var playerVY = 0;
var playerMaxSpeed = 2;
// Player health
var playerHealth;
var playerMaxHealth = 255;
// Player fill color
var playerFill = 50;

// Prey position, size, velocity
var preyX;
var preyY;
var preyRadius = 25;
var preyVX;
var preyVY;
var preyMaxSpeed = 12;
// Variables used for perlin noise **new**
var preyTX = 0;
var preyTY = 100;
//  variable used for perlin noise size pulsing of prey **new**
var preySize = 5;

// Prey health
var preyHealth;
var preyMaxHealth = 100;
// Prey fill color
var preyFill = 0;

// Amount of health obtained per frame of "eating" the prey
var eatHealth = 10;
// Number of prey eaten during the game
var preyEaten = 0;

// background red fill Variable **new**
var backgroundFill = 163;

// variable to check if medicine was used
var medicineUsed = false; // **new**

// preload()
//
// preload assets, including sounds and fonts **new**
function preload() {
  heartbeatSound = new Audio("assets/sounds/heartbeat.wav");
  preyDeathSound = new Audio("assets/sounds/screech.wav");
  medicineSound = new Audio("assets/sounds/drink.wav"); // this sound doesnt seem to work in all browsers, it works in chrome, but not firefox
  gameFont = loadFont("assets/fonts/fontBold.ttf");
}

// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(500,500);

  noStroke();

  setupPrey();
  setupPlayer();

  // Play the heartbeat sound from the very beginning **new**
  heartbeatSound.loop = true;
  heartbeatSound.play();
}

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  preyX = width/5;
  preyY = height/2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4*width/5;
  playerY = height/2;
  playerHealth = playerMaxHealth;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  background(backgroundFill,0,0);
  drawBackground(); // **new**

  if (!gameOver) {
    handleInput();

    movePlayer();
    movePrey();

    updateHealth();
    checkEating();

    drawPrey();
    drawPlayer();
    drawMedicineText(); // **new**
  }
  else {
    showGameOver();
  }
}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
  }
  else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
  }
  else {
    playerVY = 0;
  }

  // Check if shift key is down for boost in speed
  // Use the constrain function to limit the acceleration to maximum values so that
  // the velocity does not go out of hand
  // *** NEW FUNCTION *** //
  if (keyIsDown(SHIFT)) {
    playerMaxSpeed = constrain(playerMaxSpeed + 0.2, -5, 5);
  } else {
    playerMaxSpeed = 2;
  }

  // Check if CONTROL key is pushed down
  // this will allow the player to inject emergency medicine, thus changing the medicineUsed variable to true,
  // and give them a bit of playerHealth back
  // if the key is not pressed, the health stays equal to itself
  // ***NEW IF STATEMENT***
  if (medicineUsed === false) {
    if (keyIsDown(CONTROL)) {
      playerHealth += 50;
      medicineUsed = true;
      medicineSound.play();
    } else {
      playerHealth = playerHealth;
    }
  }
}

// drawBackground()
//
// draw the background design **new function**
function drawBackground() {
  stroke(preyFill, 0, 0);
  strokeWeight(8);
  noFill();
  ellipse(300, 200, 500, 800);
  ellipse(500, 500, 300, 200);
  ellipse(450, 0, 500, 100);
  ellipse(250, 500, 800, 400);
  ellipse(0, 150, 1000, 100);
}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX += playerVX;
  playerY += playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    playerX += width;
  }
  else if (playerX > width) {
    playerX -= width;
  }

  if (playerY < 0) {
    playerY += height;
  }
  else if (playerY > height) {
    playerY -= height;
  }
}

// updateHealth()
//
// Reduce the player's health (every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health, constrain to reasonable range
  // at normal speed, reduce playerHealth by 0.5 every frame, increase to 1 when using the boost ability with shift
  /// ***NEW*** ///
  if (playerMaxSpeed === 2) {
      playerHealth = constrain(playerHealth - 0.5,0,playerMaxHealth);
  } else {
      playerHealth = constrain(playerHealth - 1,0,playerMaxHealth);
  }

  // Check if the player is dead
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
    // set heartbeat sound back to the beginning **new**
    heartbeatSound.currentTime = 0;
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  var d = dist(playerX,playerY,preyX,preyY);
  // Check if it's an overlap
  if (d < playerRadius + preyRadius) {
    // Increase the player health
    playerHealth = constrain(playerHealth + eatHealth,0,playerMaxHealth);
    // Reduce the prey health
    preyHealth = constrain(preyHealth - eatHealth,0,preyMaxHealth);

    // Check if the prey died
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = random(0,width);
      preyY = random(0,height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten++;

      // *** NEW CODE *** //
      // set background red fill value darker, closer to black as the prey eats the color out to be reborn
      backgroundFill -= 15;
      // set the prey's red color value higher, so it gets progressively reder as it gets reborn
      preyFill += 15;
      // make the prey smaller as the color it can absorb gets less and less vibrant
      preyRadius -= 1;
      // play the death sound for the prey
      preyDeathSound.play();
      // ***end of new code***
    }
  }
}

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
  // Change the prey's velocity using perlin noise
  // the prey will constantly be moving and changing directions

    // Set velocity based on perlin noise, using the map function
    // determines how fast and where the prey moves
    // Use map() to convert from the 0-1 range of the noise() function
    // to the appropriate range of velocities for the prey
    // *** NEW UPDATED MOVEMENT *** //
    preyVX = map(noise(preyTX), 0, 1,-preyMaxSpeed,preyMaxSpeed);
    preyVY = map(noise(preyTY), 0, 1,-preyMaxSpeed,preyMaxSpeed);

    preyTX += 0.1;
    preyTY += 0.1;

   //Update prey position based on velocity
   preyX += preyVX;
   preyY += preyVY;

  // Screen wrapping
  if (preyX < 0) {
    preyX += width;
  }
  else if (preyX > width) {
    preyX -= width;
  }

  if (preyY < 0) {
    preyY += height;
  }
  else if (preyY > height) {
    preyY -= height;
  }
}

// drawPrey()
//
// Draw the prey as an ellipse with a variable as its red value
function drawPrey() {
  fill(preyFill, 0 , 0);
  noStroke();
  ellipse(preyX,preyY,map(noise(preySize), 0, 1, preyRadius*2, preyRadius*3));
  preySize += 1;
}

// drawPlayer()
//
// Draw the player as an ellipse with alpha based on health
function drawPlayer() {
  stroke(155, 0, 0);
  strokeWeight(preyEaten/2); // added a varying strokeWeight
  fill(playerFill,playerHealth);
  ellipse(playerX,playerY, playerRadius*2);
}

// drawMedicineText()
//
// if you havent used the special ability to take medicine, display instruction text
// ***NEW FUNCTION***
function drawMedicineText() {
  textFont(gameFont);
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(24);
  if (medicineUsed === false) {
    text("CTRL: EMERGENCY MEDICINE", 400, 470);
  } else {
    //no text
  }
}
// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  textSize(36);
  textAlign(CENTER,CENTER);

  // if the number of eaten preys is lower then 6, display game over text as black, else white
  if (preyEaten < 6) {
    fill(0);
  } else {
    fill (255);
  }
  noStroke();
  textFont(gameFont);
  var gameOverText = "GAME OVER\n";
  gameOverText += "You have eliminated " + preyEaten + " DISEASE CELL(S)\n";
  gameOverText += "before you died."
  text(gameOverText,width/2,height/2);
}
