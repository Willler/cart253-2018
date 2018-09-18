// Exercise 1 - Moving pictures
// William L'Eriger
//
// Modified starter code for exercise one provided by Pippin Barr.
// It moves five pictures on the canvas, two in a static direction and three following the cursor.
// One image moves linearly down the screen while the other moves horizontally from left to right.
// The other three move towards the mouse. One directly on it, one trailing a little bit behind and the other much farther behind.

// Creating my image variables

// The image of a clown face
var clownImage;
// The current position of the clown face
var clownImageX;
var clownImageY;

// The image of a spooky skeleton face
var spookyImage;
// The current position of the spooky skeleton face
var spookyImageX;
var spookyImageY;

// The image of cat face
var catImage;
// The current position of the cat face image
var catImageX;
var catImageY;

// The transparent image of "felt" that wipes down the canvas
var feltTextureImage;
// The current position of the transparent image of "felt"
var feltTextureImageX;
var feltTextureImageY;

// The image of vines that go from left to right on the canvas
var vinesImage;
// The current position of the image called "vines"
var vinesImageX;
var vinesImageY;

// preload()
//
// Load the five images we're using before the program starts

function preload() {
  clownImage = loadImage("assets/images/clown.png");
  feltTextureImage = loadImage("assets/images/black-felt-texture.png");
  vinesImage = loadImage("assets/images/vines.png");
  spookyImage = loadImage("assets/images/spooky.png");
  catImage = loadImage("assets/images/cat.png");
}


// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {

  // Create our canvas
  createCanvas(640,640);

  // Start the clown image at the centre of the canvas
  clownImageX = width/2;
  clownImageY = height/2;

  // Start the spooky skeleton face at the center of the canvas
  spookyImageX = width/2;
  spookyImageY = width/2;

  // Start the cat image at the center of the canvas
  catImageX = width/2;
  catImageY = width/2;

  //Start the vines Image off the screen on the left of the canvas
  vinesImageX = 0 - vinesImage.width/2;
  vinesImageY = height/2;

  // Start the felt image perfectly off screen above the canvas
  feltTextureImageX = width/2;
  feltTextureImageY = 0 - feltTextureImage.height/2;

  // We'll use imageMode CENTER for this script
  imageMode(CENTER);
}

// draw()
//
// Moves the felt image and the vines image linearly
// Moves the clown face, the cat face and the spooky skeleton face toward the current mouse location, at different distances

function draw() {

  // Move the felt image down by increasing its y position
  feltTextureImageY += 1;

  // Move the vines image to the right by increasing the x position
  vinesImageX ++;

  // Display the felt image
  image(feltTextureImage,feltTextureImageX,feltTextureImageY);

  // Display the vines image
  image(vinesImage, vinesImageX, vinesImageY);

  // Move the clown by moving it 1/10th of its current distance from the mouse and the cat by 1/50th of its current distance
  // Calculate the distance in X and in Y
  var xDistance = mouseX - clownImageX;
  var yDistance = mouseY - clownImageY;
  // Add 1/10th of the x and y distance to the clown's current (x,y) location
  clownImageX = clownImageX + xDistance/10;
  clownImageY = clownImageY + yDistance/10;
  // Add 1/50th of the x and y distance to the Cat's current (x, y) location, using the same variables as for the clown
  catImageX = catImageX + xDistance/50;
  catImageY = catImageY + yDistance/50;

  // display spooky skeleton face at mouse coordinates
  spookyImageX = mouseX
  spookyImageY = mouseY

  // Display the clown image
  image(clownImage,clownImageX,clownImageY);

  // Display the cat Image
  image(catImage, catImageX, catImageY);

  // Display the skeleton face image
  image(spookyImage, spookyImageX, spookyImageY);
}
