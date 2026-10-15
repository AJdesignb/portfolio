let font;
let fontB;

// SoundAid project images — replace filenames with your actual image files
let SAimg;    // cover / hero image
let SAimgA;
let SAimgB;
let SAimgC;
let SAimgD;
let SAimgE;
let SAimgF;
let SAimgG;
let SAimgH;
let SAimgI;
let SAimgJ;

let stars = [];
const STAR_COUNT = 600;

// Custom cursor scroll-direction tracking
let lastScrollY = 0;
let scrollDirection = "";
let scrollTimeout;

let scaleFactor = 1;
let canvasWidth = 1600;
let canvasHeight = 9800;

let email;
let emailB;
let LinkdIn;
let GitHb;
let Insta;

function preload() {
  font  = loadFont("Rosean.ttf");
  fontB = loadFont("Coolvetica Rg.otf");

  // Swap these filenames for your actual SoundAid images
  SAimg  = loadImage("SAimg.png");
  SAimgA = loadImage("SAimgA.png");
  SAimgB = loadImage("SAimgB.png");
  SAimgC = loadImage("SAimgC.png");
  SAimgD = loadImage("SAimgD.png");
  SAimgE = loadImage("SAimgE.png");
  SAimgF = loadImage("SAimgF.png");
  SAimgG = loadImage("SAimgG.png");
  SAimgH = loadImage("SAimgH.png");
  SAimgI = loadImage("SAimgI.png");
  SAimgJ = loadImage("SAimgJ.png");

  // Social icons (same as every other page)
  email   = loadImage("email.png");
  emailB  = loadImage("emailB.png");
  LinkdIn = loadImage("Linkdin.png");
  GitHb   = loadImage("GhubL.png");
  Insta   = loadImage("Insta.png");
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
  const baseWidth  = 1600;
  const baseHeight = 9800;

  if (windowWidth < 768) {
    scaleFactor = 0.4;
  } else if (windowWidth < 1024) {
    scaleFactor = 0.6;
  } else if (windowWidth < 1440) {
    scaleFactor = 0.8;
  } else {
    scaleFactor = 1;
  }

  canvasWidth  = baseWidth  * scaleFactor;
  canvasHeight = baseHeight * scaleFactor;
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

// ─── DRAW ────────────────────────────────────────────────────────────────────

function draw() {
  background(15);
  drawGalaxy();

  // ── Hero heading ──────────────────────────────────────────────────────────
  textFont(font);
  textSize(120 * scaleFactor);
  fill(248, 244, 236);
  textAlign(LEFT, TOP);
  text("SOUND AID", 100 * scaleFactor, 100 * scaleFactor);

  // ── Subtitle ──────────────────────────────────────────────────────────────
  textFont(fontB);
  textSize(40 * scaleFactor);
  fill(248, 244, 236, 200);
  text("Designing for Accessibility through SOUND", 100 * scaleFactor, 220 * scaleFactor);

  // ── Tags ──────────────────────────────────────────────────────────────────
  textSize(25 * scaleFactor);
  fill(234, 255, 151);
  text("UX Design | Accessibility | Research | Prototyping", 100 * scaleFactor, 300 * scaleFactor);
  text("Human-Centered Design Intervention", 100 * scaleFactor, 330 * scaleFactor);

  // ── Project overview text ─────────────────────────────────────────────────
  textFont(fontB);
  textSize(25 * scaleFactor);
  fill(248, 244, 236);
  text(
    "SoundAid explores how sound-based interactions can support individuals with visual impairments or cognitive load challenges in navigating complex environments. " +
    "Through iterative research, prototyping, and user testing, the project investigates the intersection of auditory feedback design and inclusive UX.\n\n" +
    "The outcome is a design framework and interactive prototype that demonstrates how intentional sonic cues can reduce cognitive friction, " +
    "build spatial awareness, and foster greater independence for users who rely on non-visual interfaces.",
    100  * scaleFactor,
    400 * scaleFactor,
    1400 * scaleFactor,
    1200 * scaleFactor
  );

  // ── Stacked full-width images (only drawn when on-screen for performance) ──
  const H = 890 * scaleFactor;
  drawCull(SAimgA, 650 * scaleFactor, H);
  drawCull(SAimgB, 1550 * scaleFactor, H);
  drawCull(SAimgC, 2450 * scaleFactor, H);
  drawCull(SAimgD, 3350 * scaleFactor, H);
  drawCull(SAimgE, 4250 * scaleFactor, H);
  drawCull(SAimgF, 5150 * scaleFactor, H);
  drawCull(SAimgG, 6050 * scaleFactor, H);
  drawCull(SAimgH, 6950 * scaleFactor, H);
  drawCull(SAimgI, 7850 * scaleFactor, H);
  drawCull(SAimgJ, 8750 * scaleFactor, H);

  drawCustomCursor();
}

// Draw a full-width image at canvas-Y `y`, but ONLY if it's within the
// viewport (big perf win — skips the ~90% of images scrolled off-screen).
function drawCull(img, y, h) {
  if (!img) return;
  const scrollY = window.scrollY || 0;
  const vh = window.innerHeight || height;
  const margin = 300; // small buffer so images are ready just before they enter
  const screenTop = y - scrollY;
  if (screenTop + h < -margin || screenTop > vh + margin) return; // off-screen
  image(img, 0, y, 1600 * scaleFactor, h);
}

// Helper — draws one full-width image at the given base-Y (pre-scale)
function drawImg(img, baseY) {
  if (img) {
    image(img, 0, baseY * scaleFactor, 1600 * scaleFactor, 1000 * scaleFactor);
  }
}

// ─── GALAXY ──────────────────────────────────────────────────────────────────

function drawGalaxy() {
  noStroke();
  fill(255);

  for (let s of stars) {
    const twinkle  = random(-0.3, 0.3);
    const starSize = max(0.5, s.size + twinkle);
    circle(s.x, s.y, starSize);
    s.y += s.speed;
    if (s.y > height) {
      s.y = 0;
      s.x = random(width);
    }
  }
}

// ─── MENU ────────────────────────────────────────────────────────────────────

// ─── MOUSE ───────────────────────────────────────────────────────────────────


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
