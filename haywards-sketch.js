// ─────────────────────────────────────────────────────────────────────────────
// HAYWARDS BRAND EXPLORATIONS — minimal skeleton page
// (starry background + title + body text; images/sections to be added later)
// ─────────────────────────────────────────────────────────────────────────────

let font;
let fontB;

let stars = [];
const STAR_COUNT = 600;

let scaleFactor = 1;
let canvasWidth = 1600;
let canvasHeight = 13300; // fits the intro + 11 stacked full-width images

let coverImg;
let tmrImgs = [];   // Haywards _TMR 2..12, stacked full-width in order

function preload() {
  font  = loadFont("Rosean.ttf");
  fontB = loadFont("Coolvetica Rg.otf");
  coverImg = loadImage("Haywards cover.png");
  for (let i = 2; i <= 12; i++) {
    tmrImgs.push(loadImage("Haywards _TMR " + i + ".png"));
  }
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
  const baseHeight = 13300;

  if (windowWidth < 768) {
    scaleFactor = 0.4;
  } else if (windowWidth < 1024) {
    scaleFactor = 0.6;
  } else if (windowWidth < 1440) {
    scaleFactor = 0.8;
  } else {
    scaleFactor = 1;
  }

  canvasWidth = baseWidth * scaleFactor;
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

function draw() {
  background(15);
  drawGalaxy();

  // ── Left column: title + copy ──
  const leftX = 50 * scaleFactor;
  const leftW = 760 * scaleFactor;   // keeps text clear of the image on the right

  // Main Heading
  textFont(font);
  textSize(110 * scaleFactor);
  fill(248, 244, 236);
  textAlign(LEFT, TOP);
  text("HAYWARDS BRAND", leftX, 100 * scaleFactor);
  text("EXPLORATIONS", leftX, 210 * scaleFactor);

  // Subtitle
  textFont(fontB);
  textSize(40 * scaleFactor);
  fill(248, 244, 236, 200);
  text("Brand Exploration", leftX, 350 * scaleFactor);

  // Keyword / meta line
  textSize(25 * scaleFactor);
  fill(234, 255, 151);
  text("Branding | Packaging | Typography", leftX, 425 * scaleFactor);

  // Body text
  textSize(26 * scaleFactor);
  fill(248, 244, 236);
  text(
    "A creative exploration of a Modern Retro theme for the Haywards brand — " +
    "bringing back the old with a flavour of the new (à la The Archies) to " +
    "rebrand the packaging for Haywards 5000.",
    leftX,
    510 * scaleFactor,
    leftW,
    600 * scaleFactor
  );

  // ── Right side: cover image, beside the title & copy ──
  let coverBottom = 0;
  if (coverImg) {
    const imgAr = coverImg.width / coverImg.height;
    const iw = 800 * scaleFactor;
    const ih = iw / imgAr;
    const ix = width - iw;   // touching the right edge
    const iy = 0;            // touching the top
    image(coverImg, ix, iy, iw, ih);
    coverBottom = iy + ih;
  }

  // ── Full-width edge-to-edge images below the intro (stacked in order) ──
  let y = max(720 * scaleFactor, coverBottom + 20 * scaleFactor);
  for (const img of tmrImgs) {
    if (!img) continue;
    const tw = width;                       // full canvas width
    const th = tw * (img.height / img.width);
    image(img, 0, y, tw, th);
    y += th;                                // stack the next one directly below
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
