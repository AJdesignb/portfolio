
let font;
let fontB;

let stars = [];
const STAR_COUNT = 600;

let scaleFactor = 1;
let canvasWidth = 1600;
let canvasHeight = 8000;

// let HSimgB;
let HSimg;
let HSimgC;
let HSimgD;
let HSimgE;
let HSimgF;
let HSimgG;
let HSimgH;
let HSimgI;
let HSimgJ;
let HSimgK;
let HSimgL;

let emailB;
let LinkdIn;
let GitHb;
let Insta;

function preload() {
  font = loadFont("Rosean.ttf");
  fontB = loadFont("Coolvetica Rg.otf");
  HSimg = loadImage("HSimg.png");
  // HSimgB = loadImage("HSimgB.jpg");
  HSimgC = loadImage("HSimgC.jpg");
  HSimgD = loadImage("HSimgD.jpg");
  HSimgE = loadImage("HSimgE.jpg");
  HSimgF = loadImage("HSimgF.jpg");
  HSimgG = loadImage("HSimgG.jpg");
  HSimgH = loadImage("HSimgH.jpg");
  HSimgI = loadImage("HSimgI.jpg");
  HSimgJ = loadImage("HSimgJ.jpg");
  HSimgK = loadImage("HSimgK.jpg");
  HSimgL = loadImage("HSimgL.jpg");
  emailB = loadImage("emailB.png");
  LinkdIn = loadImage("Linkdin.png");
  GitHb = loadImage("GhubL.png");
  Insta = loadImage("Insta.png");
}

function setup() {
  calculateCanvasSize();
  
  const cnv = createCanvas(canvasWidth, canvasHeight);
  const frame = document.querySelector(".canvas-frame");
  if (frame) cnv.parent(frame);


  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3),
      speed: random(0.05, 0.2)
    });
  }
}

function calculateCanvasSize() {
  const baseWidth = 1600;
  const baseHeight = 8000;
  
  if (windowWidth < 768) {
    scaleFactor = 0.4;
    canvasWidth = baseWidth * scaleFactor;
    canvasHeight = baseHeight * scaleFactor;
  } else if (windowWidth < 1024) {
    scaleFactor = 0.6;
    canvasWidth = baseWidth * scaleFactor;
    canvasHeight = baseHeight * scaleFactor;
  } else if (windowWidth < 1440) {
    scaleFactor = 0.8;
    canvasWidth = baseWidth * scaleFactor;
    canvasHeight = baseHeight * scaleFactor;
  } else {
    scaleFactor = 1;
    canvasWidth = baseWidth;
    canvasHeight = baseHeight;
  }
}

function windowResized() {
  calculateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3) * scaleFactor,
      speed: random(0.05, 0.2)
    });
  }
}

function draw() {
  background(15);

  drawGalaxy();

  // Main Heading
  textFont(font);
  textSize(120 * scaleFactor);
  fill(248, 244, 236);
  textAlign(LEFT, TOP);
  text("HASTASHILP", 50 * scaleFactor, 100 * scaleFactor);

  // Subtitle
  textFont(fontB);
  textSize(40 * scaleFactor);
  fill(248, 244, 236, 200);
  text("Handicrafts of India (Card Game Design)", 50 * scaleFactor, 200 * scaleFactor);

  textSize(25 * scaleFactor);
  fill(234, 255, 151);
  text("Game Design | Conceptualisation | Prototyping | User testing", 50 * scaleFactor, 280 * scaleFactor);
  text("8 Weeks | Bangalore, India", 50 * scaleFactor, 310 * scaleFactor);
  
  // 2nd image (here because we wanted an overlap)
  image(
    HSimgC, 
    0 * scaleFactor, 
    750 * scaleFactor, 
    1600 * scaleFactor, 
    1150 * scaleFactor
  );

  // Cover Image 
  if (HSimg) {
    let imgX = 690 * scaleFactor;
    let imgY = 120 * scaleFactor;
    let imgW = 900 * scaleFactor;
    let imgH = 720 * scaleFactor;

    image(HSimg, imgX, imgY, imgW, imgH);
  }

  // Body Text - positioned below image
  textSize(25 * scaleFactor);
  fill(248, 244, 236);
  text(
    "The project focuses on raising awareness about the many \n traditional crafts that surround us. According to Handmade \n in India (NID, 2005), India is home to nearly 516 distinct \n handicrafts, yet most of us can barely name even twenty.\n\nThis game is designed for young adults and above, using \n learning through play to spark curiosity & build cultural \n understanding. By engaging players, the game encourages \n a deeper appreciation of the diverse crafts of India &\nhelps reconnect people with their own cultural heritage.",
    50 * scaleFactor,
    375 * scaleFactor,
    1400 * scaleFactor,
    1200 * scaleFactor
  );
  
  //3rd Image
  image(
    HSimgD, 
    0 * scaleFactor, 
    1460 * scaleFactor, 
    1600 * scaleFactor, 
    1150 * scaleFactor
  );

  //4th Image
  image(
    HSimgE, 
    0 * scaleFactor, 
    2313 * scaleFactor, 
    1600 * scaleFactor, 
    560 * scaleFactor
  );
  
  //5th Image
  image(
    HSimgF, 
    0 * scaleFactor, 
    2870 * scaleFactor, 
    1600 * scaleFactor, 
    560 * scaleFactor
  );

  //6th Image
  image(
    HSimgG, 
    0 * scaleFactor, 
    3430 * scaleFactor, 
    1600 * scaleFactor, 
    1000 * scaleFactor
  );

  //7th Image
  image(
    HSimgH, 
    0 * scaleFactor, 
    4000 * scaleFactor, 
    1600 * scaleFactor, 
    1000 * scaleFactor
  );

  //8th Image
  image(
    HSimgI, 
    0 * scaleFactor, 
    5000 * scaleFactor, 
    800 * scaleFactor, 
    600 * scaleFactor
  );

  //9th Image
  image(
    HSimgJ, 
    800 * scaleFactor, 
    5000 * scaleFactor, 
    800 * scaleFactor, 
    600 * scaleFactor
  );

  //10th Image
  image(
    HSimgK, 
    0 * scaleFactor, 
    5550 * scaleFactor, 
    1600 * scaleFactor, 
    1150 * scaleFactor
  );

  //11th Image
  image(
    HSimgL, 
    0 * scaleFactor, 
    6700 * scaleFactor, 
    1600 * scaleFactor, 
    1150 * scaleFactor
  );

}

function drawGalaxy() {
  noStroke();
  fill(255);

  for (let s of stars) {
    const twinkle = random(-0.3, 0.3);
    const starSize = max(0.5, s.size + twinkle);

    circle(s.x, s.y, starSize);

    s.y += s.speed;

    if (s.y > height) {
      s.y = 0;
      s.x = random(width);
    }
  }
}

