/******************************************************************************
Where's Sausage Dog?
by Pippin Barr

An algorithmic version of a Where's Wally searching game where you
need to click on the sausage dog you're searching for in amongst all
the visual noise of other animals.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/

// Position and image of the sausage dog we're searching for
var targetX;
var targetY;
var targetImage;

// The ten decoy images
var decoyImage1;
var decoyImage2;
var decoyImage3;
var decoyImage4;
var decoyImage5;
var decoyImage6;
var decoyImage7;
var decoyImage8;
var decoyImage9;
var decoyImage10;

// The number of decoys to show on the screen, randomly
// chosen from the decoy images
var numDecoys = 100;

// Keep track of whether they've won
var gameOver = false;

// preload()
//
// Loads the target and decoy images before the program starts, also load fonts
function preload() {
  targetImage = loadImage("assets/images/animals-target.png");

  decoyImage1 = loadImage("assets/images/animals-01.png");
  decoyImage2 = loadImage("assets/images/animals-02.png");
  decoyImage3 = loadImage("assets/images/animals-03.png");
  decoyImage4 = loadImage("assets/images/animals-04.png");
  decoyImage5 = loadImage("assets/images/animals-05.png");
  decoyImage6 = loadImage("assets/images/animals-06.png");
  decoyImage7 = loadImage("assets/images/animals-07.png");
  decoyImage8 = loadImage("assets/images/animals-08.png");
  decoyImage9 = loadImage("assets/images/animals-09.png");
  decoyImage10 = loadImage("assets/images/animals-10.png");

  specialFont = loadFont("assets/fonts/specialElite.ttf");
}

// setup()
//
// Creates the canvas, sets basic modes, draws correct number
// of decoys in random positions, then the target
function setup() {
  createCanvas(windowWidth,windowHeight);
  background("#ffff00");
  imageMode(CENTER);



  // Use a for loop to draw as many decoys as we need
  for (var i = 0; i < numDecoys; i++) {
    // Choose a random location for this decoy
    var x = random(0,width);
    var y = random(0,height);
    // Generate a random number we can use for probability
    var r = random();
    // Use the random number to display one of the ten decoy
    // images, each with a 10% chance of being shown
    // We'll talk more about this nice quality of random soon enough
    if (r < 0.1) {
      image(decoyImage1,x,y);
    }
    else if (r < 0.2) {
      image(decoyImage2,x,y);
    }
    else if (r < 0.3) {
      image(decoyImage3,x,y);
    }
    else if (r < 0.4) {
      image(decoyImage4,x,y);
    }
    else if (r < 0.5) {
      image(decoyImage5,x,y);
    }
    else if (r < 0.6) {
      image(decoyImage6,x,y);
    }
    else if (r < 0.7) {
      image(decoyImage7,x,y);
    }
    else if (r < 0.8) {
      image(decoyImage8,x,y);
    }
    else if (r < 0.9) {
      image(decoyImage9,x,y);
    }
    else if (r < 1.0) {
      image(decoyImage10,x,y);
    }
  }

  // Once we've displayed all decoys, we choose a location for the target
  targetX = random(0,width);
  targetY = random(0,height);

  // If the random location of the target falls within the user interface box, reroll the random dice and get a new position until it does
  // not fall within the box
  while (targetX > windowWidth/3 && targetY < windowHeight/5) {
    targetX = random(0,width);
    targetY = random(0,height);
  }
  // And draw it (this means it will always be on top)
  image(targetImage,targetX,targetY);

  // Creating the frame for the target image, the user interface, using a rectangle object, calling it last so it is above the decoy images
  fill("#750814");
  stroke("#ffb200");
  strokeWeight(10);
  rect(windowWidth/1.5, 0, windowWidth/3, windowHeight/5);

  // draw the target image within the user interface rectangle
  image(targetImage,(windowWidth - 115), 75);

  // Add a caption to the image that serves as instructions to the player, along with the styling for it
  textFont(specialFont);
  textSize(20);
  textAlign(CENTER);
  noStroke();
  fill(255);
  text("Invasive Species Detected", (windowWidth - 350), 70);
  text("Eliminate Target on Sight", (windowWidth - 350), 100);
}

function draw() {
  if (gameOver) {
    // Prepare our typography
    textFont("Helvetica");
    textSize(128);
    textAlign(CENTER,CENTER);
    noStroke();
    fill(random(255));
    // Tell them they won!
    text("YOU HAVE HUNTED.",width/2,height/2);

    noFill();
    stroke(random(255));
    strokeWeight(10);
    ellipse(targetX,targetY,targetImage.width,targetImage.height);
  }
}

// mousePressed()
//
// Checks if the player clicked on the target and if so tells them they won
function mousePressed() {
  // Check if the mouse is in the x range of the target
  if (mouseX > targetX - targetImage.width/2 && mouseX < targetX + targetImage.width/2) {
    // Check if the mouse is also in the y range of the target
    if (mouseY > targetY - targetImage.height/2 && mouseY < targetY + targetImage.height/2) {
      gameOver = true;
    }
  }
}
