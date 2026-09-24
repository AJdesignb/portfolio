
let font;
let fontB;

let MBimg;
let MBimgB;

let emailB;
let LinkdIn;
let GitHb;
let Insta;

let stars = [];
const STAR_COUNT = 600;

let scaleFactor = 1;
let canvasWidth = 1600;
let canvasHeight = 12600;

function preload() {
  font = loadFont("Rosean.ttf");
  fontB = loadFont("Coolvetica Rg.otf");
  
  MBimg = loadImage("MBimg.png");
  MBimgB = loadImage("bbimgB.jpg");
 
  LinkdIn = loadImage("Linkdin.png");
  GitHb = loadImage("GhubL.png");
  Insta = loadImage("Insta.png");
  emailB = loadImage("emailB.png");
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
  const baseHeight = 12600;
  
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
  text("Mercedes Benz R&D India", 50 * scaleFactor, 100 * scaleFactor);

  // Subtitle
  textFont(fontB);
  textSize(40 * scaleFactor);
  fill(248, 244, 236, 200);
  text("Concept Presentation", 50 * scaleFactor, 240 * scaleFactor);

  textSize(25 * scaleFactor);
  fill(234, 255, 151);
  text("User Experience Design | Wireframing | Prototyping", 50 * scaleFactor, 320 * scaleFactor);
  text("1 Week | Bangalore, India", 50 * scaleFactor, 350 * scaleFactor);

  // Body Text
  textSize(25 * scaleFactor);
  fill(248, 244, 236);
  text(
    "This project reimagines the Mercedes-AMG Track Pace App through a product and interaction design lens, exploring how racing data can be experienced rather than simply viewed. The concept focuses on designing intuitive interactions that allow users to relive race highlights while capturing the emotional context behind each moment.\n\n By borrowing interaction patterns from reels, flash stories, and social feeds, the experience turns performance metrics into dynamic, shareable narratives enhancing engagement, emotional connection, and overall user experience.",
    50 * scaleFactor,
    420 * scaleFactor,
    1400 * scaleFactor,
    1200 * scaleFactor
  );
  
  // Cover image 
  if (MBimgB) {
    let imgX = 0 * scaleFactor;
    let imgY = 690 * scaleFactor;
    let imgW = 1600 * scaleFactor;
    let imgH = 11800 * scaleFactor;
    image(MBimgB, imgX, imgY, imgW, imgH);
  }

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

