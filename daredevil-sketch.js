
let font;
let fontB;

let DDimg;
let DDimgA;
let DDimgB;
let DDimgC;
let DDimgD;
let DDimgE;
let DDimgF;
let DDimgG;

let stars = [];
const STAR_COUNT = 600;

// Custom cursor scroll-direction tracking
let lastScrollY = 0;
let scrollDirection = "";
let scrollTimeout;


let scaleFactor = 1;
let canvasWidth = 1600;
let canvasHeight = 8700;
let email;
let LinkdIn;
let GitHb;
let Insta;
let emailB;

function preload() {
  font = loadFont("Rosean.ttf");
  fontB = loadFont("Coolvetica Rg.otf");
  DDimg = loadImage("DDimg.png");
  DDimgA = loadImage("DDimgA.jpg");
  DDimgB = loadImage("DDimgB.jpg");
  DDimgC = loadImage("DDimgC.png");
  DDimgD = loadImage("DDimgD.jpg");
  DDimgE = loadImage("DDimgE.jpg");
  DDimgF = loadImage("DDimgF.jpg");
  DDimgG = loadImage("DDimgG.jpg");
  // Social icons
  email = loadImage("email.png");
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

  // Track scroll direction for the custom cursor's up/down arrow
  window.addEventListener("scroll", () => {
    let currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) scrollDirection = "down";
    else if (currentScrollY < lastScrollY) scrollDirection = "up";
    lastScrollY = currentScrollY;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => { scrollDirection = ""; }, 800);
  });

  noCursor(); // hide the real cursor — we draw a custom one
}

function calculateCanvasSize() {
  const baseWidth = 1600;
  const baseHeight = 8700;
  
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
  text("DAREDEVIL BREWING CO.", 50 * scaleFactor, 100 * scaleFactor);

  // Subtitle
  textFont(fontB);
  textSize(40 * scaleFactor);
  fill(248, 244, 236, 200);
  text("Branding Exploration", 50 * scaleFactor, 240 * scaleFactor);

  textSize(25 * scaleFactor);
  fill(234, 255, 151);
  text("Logo Design | Branding | Concept Design", 50 * scaleFactor, 320 * scaleFactor);
  text("1 week | Bangalore, India", 50 * scaleFactor, 350 * scaleFactor);

  // Body Text
  textSize(25 * scaleFactor);
  fill(248, 244, 236);
  text(
    "A creative exploration of beer branding through bold visual identity and packaging design. This project reimagines the Daredevil brand with a focus on striking aesthetics and memorable consumer experience..",
    50 * scaleFactor,
    420 * scaleFactor,
    1400 * scaleFactor,
    1200 * scaleFactor
  );
  
  //Img 2
  image(
    DDimgA,
    0 * scaleFactor,
    1550 * scaleFactor, 
    1600 * scaleFactor, 
    1200 * scaleFactor
  );

  // cover image 
  if (DDimgC) {
    let imgX = 0 * scaleFactor;
    let imgY = 540 * scaleFactor;
    let imgW = 1600 * scaleFactor;
    let imgH = 1170 * scaleFactor;
    image(DDimgC, imgX, imgY, imgW, imgH);
  }

  //Img 3
  image(
    DDimgB,
    0 * scaleFactor,
    2730 * scaleFactor, 
    1600 * scaleFactor, 
    1200 * scaleFactor
  );
  
  //Img 4
  image(
    DDimgD,
    0 * scaleFactor,
    3930 * scaleFactor, 
    1600 * scaleFactor, 
    1200 * scaleFactor
  );

  //Img 5
  image(
    DDimgE,
    0 * scaleFactor,
    5130 * scaleFactor, 
    1600 * scaleFactor, 
    1150 * scaleFactor
  );

  //Img 6
  image(
    DDimgF,
    0 * scaleFactor,
    6280 * scaleFactor, 
    1600 * scaleFactor, 
    1150 * scaleFactor
  );

  //Img 7
  image(
    DDimgG,
    0 * scaleFactor,
    7430 * scaleFactor, 
    1600 * scaleFactor, 
    1150 * scaleFactor
  );
  


  drawCustomCursor();
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


// ── Custom cursor ────────────────────────────────────────────────────────────
function drawCustomCursor(label) {
  push();
  const cs = (typeof scaleFactor !== "undefined") ? scaleFactor : 1;
  const cursorSize = label ? 70 * cs : 60 * cs;

  stroke(248, 244, 236);
  strokeWeight(2);
  fill(0);
  circle(mouseX, mouseY, cursorSize);

  if (label) {
    noStroke();
    if (typeof fontB !== "undefined" && fontB) textFont(fontB);
    textSize(18 * cs);
    textAlign(CENTER, CENTER);
    fill(248, 244, 236);
    text(label, mouseX, mouseY);
  } else if (scrollDirection === "down") {
    stroke(248, 244, 236);
    strokeWeight(2 * cs);
    const a = 7 * cs;
    line(mouseX, mouseY - a, mouseX, mouseY + a);
    line(mouseX, mouseY + a, mouseX - a, mouseY);
    line(mouseX, mouseY + a, mouseX + a, mouseY);
  } else if (scrollDirection === "up") {
    stroke(248, 244, 236);
    strokeWeight(2 * cs);
    const a = 7 * cs;
    line(mouseX, mouseY + a, mouseX, mouseY - a);
    line(mouseX, mouseY - a, mouseX - a, mouseY);
    line(mouseX, mouseY - a, mouseX + a, mouseY);
  } else {
    noStroke();
    fill(234, 255, 151);
    drawSparkle(mouseX, mouseY, 11 * cs, 3.6 * cs);
  }
  pop();
}

// 4-point sparkle (✦)
function drawSparkle(cx, cy, r, innerR) {
  push();
  translate(cx, cy);
  beginShape();
  for (let i = 0; i < 8; i++) {
    const ang = (PI / 4) * i - PI / 2;
    const rad = i % 2 === 0 ? r : innerR;
    vertex(cos(ang) * rad, sin(ang) * rad);
  }
  endShape(CLOSE);
  pop();
}
