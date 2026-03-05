let menuActive = false;
let animRadius = 0;
let targetRadius = 0;
let maxRadius;
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
  SAimgA = loadImage("SAimgA.jpg");
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

  maxRadius = dist(0, 0, width, height);

  const menuBtn = document.getElementById("menuBtn");
  if (menuBtn) menuBtn.addEventListener("click", toggleMenu);

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
  maxRadius = dist(0, 0, width, height);

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

  // ── Cover image ───────────────────────────────────────────────────────────
  if (SAimg) {
    image(SAimgA, 0 * scaleFactor, 650 * scaleFactor, 1600 * scaleFactor, 890 * scaleFactor);
  }
  
  //Img 2
  image(
    SAimgB,
    0 * scaleFactor,
    1550 * scaleFactor, 
    1600 * scaleFactor, 
    890 * scaleFactor
  );

  //Img 3
  image(
    SAimgC,
    0 * scaleFactor,
    2450 * scaleFactor, 
    1600 * scaleFactor, 
    890 * scaleFactor
  );

  //Img 4
  image(
    SAimgD,
    0 * scaleFactor,
    3350 * scaleFactor, 
    1600 * scaleFactor, 
    890 * scaleFactor
  );

  //Img 5
  image(
    SAimgE,
    0 * scaleFactor,
    4250 * scaleFactor, 
    1600 * scaleFactor, 
    890 * scaleFactor
  );

  //Img 6
  image(
    SAimgF,
    0 * scaleFactor,
    5150 * scaleFactor, 
    1600 * scaleFactor, 
    890 * scaleFactor
  );

  //Img 7
  image(
    SAimgG,
    0 * scaleFactor,
    6050 * scaleFactor, 
    1600 * scaleFactor, 
    890 * scaleFactor
  );

  //Img 8
  image(
    SAimgH,
    0 * scaleFactor,
    6950 * scaleFactor, 
    1600 * scaleFactor, 
    890 * scaleFactor
  );

  //Img 9
  image(
    SAimgI,
    0 * scaleFactor,
    7850 * scaleFactor, 
    1600 * scaleFactor, 
    890 * scaleFactor
  );

  //Img 10
  image(
    SAimgJ,
    0 * scaleFactor,
    8750 * scaleFactor, 
    1600 * scaleFactor, 
    890 * scaleFactor
  );

  // ── Menu overlay ──────────────────────────────────────────────────────────
  animRadius = lerp(animRadius, targetRadius, 0.15);
  if (animRadius > 1) {
    drawSpotlightOverlay(animRadius);
    if (animRadius > 40) drawMenuPanel();
  }
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

function toggleMenu() {
  menuActive  = !menuActive;
  targetRadius = menuActive ? maxRadius : 0;
  const menuBtn = document.getElementById("menuBtn");
  if (menuBtn) menuBtn.classList.toggle("open", menuActive);
}

function drawSpotlightOverlay(radius) {
  push();
  noStroke();

  const progress = constrain(radius / maxRadius, 0, 1);
  const h = min(windowHeight, height);

  fill(0, 180);
  rect(0, 0, width, h);

  const anchorX = width;
  const anchorY = 0;

  const p2x = lerp(anchorX, 0,     progress);
  const p2y = lerp(anchorY, h * 0.32, progress);
  const p3x = lerp(anchorX, 0,     progress);
  const p3y = lerp(anchorY, h,     progress);
  const p4x = lerp(anchorX, width, progress);
  const p4y = lerp(anchorY, h * 0.68, progress);

  fill(234, 255, 150);
  beginShape();
  vertex(anchorX, anchorY);
  vertex(p2x, p2y);
  vertex(p3x, p3y);
  vertex(p4x, p4y);
  endShape(CLOSE);

  pop();
}

function drawMenuPanel() {
  const items = [
    { text: "HOME",          link: "index.html"   },
    { text: "Illustrations", link: "illustrations.html" },
    { text: "Let's Connect", link: "contact.html"  }
  ];

  const h = min(windowHeight, height);
  textFont(font);
  textAlign(LEFT, TOP);
  textSize(68 * scaleFactor);

  const x     = 120 * scaleFactor;
  let   y     = h * 0.5;
  const lineH = 70 * scaleFactor;

  for (let i = 0; i < items.length; i++) {
    const item      = items[i];
    const itemWidth = textWidth(item.text);
    const itemH     = 68 * scaleFactor;

    const isHovering =
      mouseX >= x && mouseX <= x + itemWidth &&
      mouseY >= y && mouseY <= y + itemH;

    fill(isHovering ? color(63, 73, 23) : color(0));
    text(item.text, x, y);
    items[i].bounds = { x, y, w: itemWidth, h: itemH };
    y += lineH;
  }

  // Social icons
  let iconY       = y + 30  * scaleFactor;
  const iconSize  = 40  * scaleFactor;
  const iconSpace = 50  * scaleFactor;
  let iconX       = x;

  window.menuIcons = [];

  const iconDefs = [
    { img: emailB,  link: "mailto:ajain42@horizon.csueastbay.edu" },
    { img: LinkdIn, link: "https://www.linkedin.com/in/aashi-jain29/" },
    { img: GitHb,   link: "https://ajdesignb.github.io/AJ-Github/" },
    { img: Insta,   link: "https://www.instagram.com/aashij__" }
  ];

  for (const def of iconDefs) {
    image(def.img, iconX, iconY, iconSize, iconSize);
    window.menuIcons.push({ x: iconX, y: iconY, w: iconSize, h: iconSize, link: def.link });
    iconX += iconSpace;
  }

  window.menuItems = items;
}

// ─── MOUSE ───────────────────────────────────────────────────────────────────

function mousePressed() {
  if (!menuActive) return;

  if (window.menuItems) {
    for (const item of window.menuItems) {
      if (item.link && item.bounds &&
          mouseX >= item.bounds.x && mouseX <= item.bounds.x + item.bounds.w &&
          mouseY >= item.bounds.y && mouseY <= item.bounds.y + item.bounds.h) {
        window.location.href = item.link;
        return;
      }
    }
  }

  if (window.menuIcons) {
    for (const icon of window.menuIcons) {
      if (mouseX >= icon.x && mouseX <= icon.x + icon.w &&
          mouseY >= icon.y && mouseY <= icon.y + icon.h) {
        window.open(icon.link, "_blank", "noopener,noreferrer");
        return;
      }
    }
  }
}