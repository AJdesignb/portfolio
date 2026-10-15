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
let canvasWidth = 1600;        // logical content width (design space)
const CONTENT_HEIGHT = 9800;   // logical content height (design space)
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
  // Don't let the browser restore an old scroll position onto our tall spacer,
  // which would translate all content off-screen on reload.
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.scrollTo(0, 0);

  calculateCanvasSize();

  // VIEWPORT-SIZED canvas (fixed to the screen). The page scrolls via a spacer
  // div; we draw content offset by scrollY. This keeps the canvas tiny (~1 screen)
  // instead of a 9800px surface, so repaints are cheap and the cursor is smooth.
  const cnv = createCanvas(windowWidth, windowHeight);

  // p5 appends the canvas inside .canvas-section (.canvas-frame). We hide that
  // section (display:none), which would also hide the canvas (a display:none
  // ancestor renders the whole subtree at 0x0). So move the canvas to <body>
  // where nothing hides it.
  document.body.appendChild(cnv.elt);

  cnv.style("position", "fixed");
  cnv.style("top", "0");
  cnv.style("left", "0");
  cnv.style("display", "block");
  cnv.style("z-index", "0"); // behind header/footer (z-index:2), above page bg

  // Transparent page backgrounds so the fixed canvas (dark) shows through.
  // IMPORTANT: do NOT give <html> a solid background — at z-index:0 that would
  // occlude the canvas. Keep both transparent and switch body off flex.
  document.body.style.background = "transparent";
  document.documentElement.style.background = "transparent";
  document.body.style.display = "block";

  // Spacer gives the document its real scroll height (content height, scaled)
  setSpacerHeight();

  frameRate(60);

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

// Create/size an invisible spacer so the page scrolls the full content height.
function setSpacerHeight() {
  let spacer = document.getElementById("scroll-spacer");
  if (!spacer) {
    spacer = document.createElement("div");
    spacer.id = "scroll-spacer";
    spacer.style.position = "relative";
    spacer.style.width = "1px";
    spacer.style.pointerEvents = "none";
    // insert right after the header so the footer still flows below it
    const main = document.querySelector(".canvas-section");
    if (main) main.style.display = "none"; // hide the old in-flow canvas frame
    document.body.insertBefore(spacer, document.querySelector(".footer"));
  }
  // Add a buffer for the top padding we apply to the content (header height +
  // gaps) so the last image stays reachable at the bottom of the scroll.
  const topBuffer = 200;
  spacer.style.height = (CONTENT_HEIGHT * scaleFactor + topBuffer) + "px";
}

function calculateCanvasSize() {
  const baseWidth = 1600; // the content's design width

  // Scale the 1600px design space to fit the viewport width, but never scale
  // UP past 1:1 — so on wide monitors the content caps at 1600px wide and sits
  // centered with margins (the old "framed" look), instead of stretching
  // edge to edge. A small side padding keeps it off the very edges.
  const sidePadding = 48; // px of breathing room on each side on small screens
  scaleFactor = Math.min(1, (windowWidth - sidePadding * 2) / baseWidth);

  canvasWidth = baseWidth * scaleFactor;
  canvasHeight = CONTENT_HEIGHT * scaleFactor;
}

function windowResized() {
  calculateCanvasSize();
  resizeCanvas(windowWidth, windowHeight);
  setSpacerHeight();

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
  // Cream page background on the sides (matches the rest of the site).
  background(248, 244, 236);

  // The centered content frame: 1600px-wide design column. Inset it from the
  // top and bottom so a cream gap shows there and all four rounded corners are
  // visible (not tucked under the fixed header / footer).
  const contentW = 1600 * scaleFactor;
  const offsetX = Math.max(0, (width - contentW) / 2);
  const radius = 20 * scaleFactor;

  // The header and footer are in normal flow (they scroll with the page), while
  // the canvas is fixed to the viewport. Measure where each sits in the viewport
  // RIGHT NOW so the frame starts just below the header's visible bottom edge and
  // ends just above the footer's visible top edge — keeping all four corners clear.
  const headerEl = document.querySelector(".site-header");
  const footerEl = document.querySelector(".footer");
  const headerRect = headerEl ? headerEl.getBoundingClientRect() : null;
  const footerRect = footerEl ? footerEl.getBoundingClientRect() : null;

  const gap = 24; // breathing room between the frame and the bars / screen edges
  // header's visible bottom within the viewport (0 once scrolled past it)
  const headerBottom = headerRect ? Math.max(0, headerRect.bottom) : 0;
  // footer's visible top within the viewport (height until it scrolls up)
  const footerTop = footerRect ? Math.min(height, footerRect.top) : height;

  const frameTop = headerBottom + gap;
  const frameH = Math.max(0, footerTop - gap - frameTop);

  // Dark rounded frame behind the content (the "canvas" look), with the same
  // soft drop shadow the old CSS canvas had (0 20px 40px rgba(0,0,0,0.6)).
  push();
  drawingContext.save();
  drawingContext.shadowColor = "rgba(0,0,0,0.6)";
  drawingContext.shadowBlur = 40 * scaleFactor;
  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 20 * scaleFactor;
  noStroke();
  fill(15);
  rect(offsetX, frameTop, contentW, frameH, radius);
  drawingContext.restore();
  pop();

  // Galaxy stars, clipped to the dark frame so they don't spill onto the cream.
  push();
  drawingContext.save();
  drawingContext.beginPath();
  roundedRectPath(drawingContext, offsetX, frameTop, contentW, frameH, radius);
  drawingContext.clip();
  translate(offsetX, frameTop);
  drawGalaxy(contentW, frameH); // stars confined to the frame
  drawingContext.restore();
  pop();

  // ── Everything below scrolls: shift the whole content block up by scrollY ──
  // Center the 1600px-wide column horizontally, and push it down so it starts
  // inside the frame with breathing room below the top edge (so the title isn't
  // jammed against the frame's top).
  const contentPadTop = frameTop + 20 * scaleFactor;
  push();
  translate(offsetX, contentPadTop - (window.scrollY || 0));

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

  pop(); // end scrolled content block

  // Cursor is drawn in SCREEN space (not scrolled) so it tracks the mouse.
  drawCustomCursor();
}

// Draw a full-width image at content-Y `y` (inside the translated/scrolled
// space), but ONLY if it's within the viewport — big perf win, skips the
// ~90% of images scrolled off-screen.
function drawCull(img, y, h) {
  if (!img) return;
  const scrollY = window.scrollY || 0;
  const vh = window.innerHeight || height;
  const margin = 300; // small buffer so images are ready just before they enter
  const screenTop = y - scrollY; // y is content-space; subtract scroll to test visibility
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

// Trace a rounded-rectangle path on the raw 2D context (used for clipping the
// galaxy to the dark content frame).
function roundedRectPath(ctx, x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y,     x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x,     y + h, r);
  ctx.arcTo(x,     y + h, x,     y,     r);
  ctx.arcTo(x,     y,     x + w, y,     r);
  ctx.closePath();
}

function drawGalaxy(frameW, frameH) {
  // frameW/frameH = size of the dark content frame the stars are confined to.
  // The caller has already translated to the frame's top-left, so we draw stars
  // in the range 0..frameW horizontally and 0..frameH vertically.
  const w = frameW || width;
  const h = frameH || height;
  noStroke();
  fill(255);

  for (let s of stars) {
    // keep each star inside the frame
    const sx = s.x % w;
    const sy = s.y % h;
    const twinkle  = random(-0.3, 0.3);
    const starSize = max(0.5, s.size + twinkle);
    circle(sx, sy, starSize);
    s.y += s.speed;
    if (s.y > h) {
      s.y = 0;
      s.x = random(w);
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
