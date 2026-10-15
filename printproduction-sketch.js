let font;
let fontB;

let stars = [];
const STAR_COUNT = 600;

// Custom cursor scroll-direction tracking
let lastScrollY = 0;
let scrollDirection = "";
let scrollTimeout;

let scaleFactor = 1;
let canvasWidth = 1600;         // logical content width (design space)
// Last gallery row sits at y=3658 and is 388 tall → ends at ~4046. Add a small
// margin so the scroll (and dark frame) ends just past it.
const CONTENT_HEIGHT = 4080;    // logical content height (design space)
let canvasHeight = 4080;

let PPimg;
let PPimgB;
let PPimgC;
let PPimgD;
let PPimgE;
let PPimgF;
let PPimgG;
let PPimgH;
let PPimgI;
let PPimgJ;
let PPimgK;
let PPimgL;
let PPimgM;
let PPimgN;
let PPimgO;

let emailB;
let LinkdIn;
let GitHb;
let Insta;

function preload() {
  font = loadFont("Rosean.ttf");
  fontB = loadFont("Coolvetica Rg.otf");
  PPimg  = loadImage("PPimgA.png");
  PPimgB = loadImage("PPimgB.png"); // replaced jpg → png
  PPimgC = loadImage("PPimgC.png"); // replaced jpg → png
  PPimgD = loadImage("PPimgD.jpg");
  PPimgE = loadImage("PPimgE.jpg");
  PPimgF = loadImage("PPimgF.jpg");
  PPimgG = loadImage("PPimgG.jpg");
  PPimgH = loadImage("PPimgH.jpg");
  PPimgI = loadImage("PPimgI.jpg");
  PPimgJ = loadImage("PPimgJ.jpg");
  PPimgK = loadImage("PPimgK.jpg");
  PPimgL = loadImage("PPimgL.jpg");
  PPimgM = loadImage("PPimgM.jpg");
  PPimgN = loadImage("PPimgN.jpg");
  PPimgO = loadImage("PPimgO.jpg");
  emailB = loadImage("emailB.png");
  LinkdIn = loadImage("Linkdin.png");
  GitHb = loadImage("GhubL.png");
  Insta = loadImage("Insta.png");
}

function setup() {
  // Don't let the browser restore an old scroll position onto our tall spacer,
  // which would translate all content off-screen on reload.
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.scrollTo(0, 0);

  calculateCanvasSize();

  // VIEWPORT-SIZED canvas (fixed to the screen). The page scrolls via a spacer
  // div; we draw content offset by scrollY. This keeps the canvas tiny (~1 screen)
  // instead of a 4100px surface, so repaints are cheap and the cursor is smooth.
  const cnv = createCanvas(windowWidth, windowHeight);

  // p5 appends the canvas inside .canvas-section (.canvas-frame). We hide that
  // section (display:none), which would also hide the canvas (a display:none
  // ancestor renders the whole subtree at 0x0). So move the canvas to <body>.
  document.body.appendChild(cnv.elt);

  cnv.style("position", "fixed");
  cnv.style("top", "0");
  cnv.style("left", "0");
  cnv.style("display", "block");
  cnv.style("z-index", "0"); // behind header/footer (z-index:2), above page bg

  // Transparent page backgrounds so the fixed canvas shows through.
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
    const main = document.querySelector(".canvas-section");
    if (main) main.style.display = "none"; // hide the old in-flow canvas frame
    document.body.insertBefore(spacer, document.querySelector(".footer"));
  }
  // Small buffer accounts for the top padding we push the content down by
  // (header height + gaps) so the last image stays fully reachable.
  const topBuffer = 70;
  spacer.style.height = (CONTENT_HEIGHT * scaleFactor + topBuffer) + "px";
}

function calculateCanvasSize() {
  const baseWidth = 1600; // the content's design width

  // Scale the 1600px design space to fit the viewport width, but never scale
  // UP past 1:1 — so on wide monitors the content caps at 1600px wide and sits
  // centered with margins (the "framed" look). A small side padding keeps it
  // off the very edges.
  const sidePadding = 48;
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

  // The centered content frame: 1600px-wide design column.
  const contentW = 1600 * scaleFactor;
  const offsetX = Math.max(0, (width - contentW) / 2);
  const radius = 20 * scaleFactor;

  // Measure header/footer so the frame starts below the header and ends above
  // the footer — keeping all four rounded corners clear of those bars.
  const headerEl = document.querySelector(".site-header");
  const footerEl = document.querySelector(".footer");
  const headerRect = headerEl ? headerEl.getBoundingClientRect() : null;
  const footerRect = footerEl ? footerEl.getBoundingClientRect() : null;

  const gap = 24;
  const headerBottom = headerRect ? Math.max(0, headerRect.bottom) : 0;
  const footerTop = footerRect ? Math.min(height, footerRect.top) : height;

  const frameTop = headerBottom + gap;
  const frameH = Math.max(0, footerTop - gap - frameTop);

  // Dark rounded frame behind the content, with a soft drop shadow.
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

  // Galaxy stars, clipped to the dark frame.
  push();
  drawingContext.save();
  drawingContext.beginPath();
  roundedRectPath(drawingContext, offsetX, frameTop, contentW, frameH, radius);
  drawingContext.clip();
  translate(offsetX, frameTop);
  drawGalaxy(contentW, frameH);
  drawingContext.restore();
  pop();

  // ── Scrolled, centered content column ──
  const contentPadTop = frameTop + 20 * scaleFactor;
  push();
  translate(offsetX, contentPadTop - (window.scrollY || 0));

  // ── Main Heading ────────────────────────────────────────────────────────────
  textFont(font);
  textSize(120 * scaleFactor);
  fill(248, 244, 236);
  textAlign(LEFT, TOP);
  text("PRINT", 50 * scaleFactor, 100 * scaleFactor);
  text("PRODUCTION", 50 * scaleFactor, 200 * scaleFactor);

  // ── Subtitle ──────────────────────────────────────────────────────────────
  textFont(fontB);
  textSize(40 * scaleFactor);
  fill(248, 244, 236, 200);
  text("Print & Production Design", 50 * scaleFactor, 340 * scaleFactor);

  textSize(25 * scaleFactor);
  fill(234, 255, 151);
  text("Print Design | Production | Curation | Research", 50 * scaleFactor, 420 * scaleFactor);
  text("3 Weeks | Bangalore", 50 * scaleFactor, 450 * scaleFactor);

  // Cover image (right side)
  drawCull(PPimg, 680 * scaleFactor, 60 * scaleFactor, 1100 * scaleFactor, 1000 * scaleFactor);

  // ── Body Text ───────────────────────────────────────────────────────────────
  textSize(25 * scaleFactor);
  fill(248, 244, 236);
  text(
    "Print Production is a research-led publication documenting an \n on-ground study of print production in Bangalore. The project focuses \n on Sultan Pet & Cotton Pet areas known for their dense network of \n print workshops & production units.\n\n The project involved field research & direct observation of multiple \n printing techniques, including rotary press, inkjet, offset, screen, & laser \n printing. Engaging with these processes firsthand offered insight into \n materials, machinery, & real-world production workflows.\n\n The final output is a printed book combining written reflections, visual \n documentation, & physical print samples collected during the research. \n Designed in Adobe InDesign, the publication was printed & manually \n assembled, with original samples integrated into the final copy resulting \n in a tactile archive of traditional & contemporary print practices..",
    50 * scaleFactor,
    520 * scaleFactor,
    1400 * scaleFactor,
    1200 * scaleFactor
  );

  // Draw order preserved from the original (C first, then B overlaps on top).
  // Img C
  drawCull(PPimgC, 0 * scaleFactor, 1800 * scaleFactor, 1600 * scaleFactor, 1050 * scaleFactor);
  // Img B
  drawCull(PPimgB, 0 * scaleFactor, 1050 * scaleFactor, 1600 * scaleFactor, 1050 * scaleFactor);

  // ── Gallery grid (4 columns × 3 rows, 388×388 tiles) ──
  const gw = 388 * scaleFactor;
  const col0 = 10 * scaleFactor, col1 = 408 * scaleFactor, col2 = 806 * scaleFactor, col3 = 1204 * scaleFactor;
  const row0 = 2860 * scaleFactor, row1 = 3259 * scaleFactor, row2 = 3658 * scaleFactor;

  drawCull(PPimgD, col0, row0, gw, gw);
  drawCull(PPimgE, col1, row0, gw, gw);
  drawCull(PPimgF, col2, row0, gw, gw);
  drawCull(PPimgG, col3, row0, gw, gw);
  drawCull(PPimgH, col0, row1, gw, gw);
  drawCull(PPimgI, col1, row1, gw, gw);
  drawCull(PPimgJ, col2, row1, gw, gw);
  drawCull(PPimgK, col3, row1, gw, gw);
  drawCull(PPimgL, col0, row2, gw, gw);
  drawCull(PPimgM, col1, row2, gw, gw);
  drawCull(PPimgN, col2, row2, gw, gw);
  drawCull(PPimgO, col3, row2, gw, gw);

  pop(); // end scrolled content block

  // Cursor is drawn in SCREEN space (not scrolled) so it tracks the mouse.
  drawCustomCursor();
}

// Draw an image at content-space (x, y) with size (w, h), but ONLY if it's
// within the viewport — big perf win, skips images scrolled off-screen.
function drawCull(img, x, y, w, h) {
  if (!img) return;
  const scrollY = window.scrollY || 0;
  const vh = window.innerHeight || height;
  const margin = 300; // small buffer so images are ready just before they enter
  const screenTop = y - scrollY;
  if (screenTop + h < -margin || screenTop > vh + margin) return; // off-screen
  image(img, x, y, w, h);
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
  const w = frameW || width;
  const h = frameH || height;
  noStroke();
  fill(255);

  for (let s of stars) {
    const sx = s.x % w;
    const sy = s.y % h;
    const twinkle = random(-0.3, 0.3);
    const starSize = max(0.5, s.size + twinkle);
    circle(sx, sy, starSize);
    s.y += s.speed;
    if (s.y > h) {
      s.y = 0;
      s.x = random(w);
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
