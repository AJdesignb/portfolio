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

// Custom cursor scroll-direction tracking
let lastScrollY = 0;
let scrollDirection = "";
let scrollTimeout;

let scaleFactor = 1;
let canvasWidth = 1600;          // logical content width (design space)
// The single tall image (bbimgB.png, 1048x7500) is drawn at full width (1600),
// so its height ≈ 1600 * 7500/1048 ≈ 11450. It starts at y=690 → ends ~12140.
// Add a small margin so the scroll (and dark frame) ends just past it.
const CONTENT_HEIGHT = 12180;    // logical content height (design space)
let canvasHeight = 12180;

function preload() {
  font = loadFont("Rosean.ttf");
  fontB = loadFont("Coolvetica Rg.otf");

  MBimg = loadImage("MBimg.png");
  MBimgB = loadImage("bbimgB.png"); // replaced jpg → png

  LinkdIn = loadImage("Linkdin.png");
  GitHb = loadImage("GhubL.png");
  Insta = loadImage("Insta.png");
  emailB = loadImage("emailB.png");
}

function setup() {
  // Don't let the browser restore an old scroll position onto our tall spacer,
  // which would translate all content off-screen on reload.
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.scrollTo(0, 0);

  calculateCanvasSize();

  // VIEWPORT-SIZED canvas (fixed to the screen). The page scrolls via a spacer
  // div; we draw content offset by scrollY. This keeps the canvas tiny (~1 screen)
  // instead of a 12600px surface, so repaints are cheap and the cursor is smooth.
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
  text("Mercedes Benz R&D India", 50 * scaleFactor, 100 * scaleFactor);

  // ── Subtitle ──────────────────────────────────────────────────────────────
  textFont(fontB);
  textSize(40 * scaleFactor);
  fill(248, 244, 236, 200);
  text("Concept Presentation", 50 * scaleFactor, 240 * scaleFactor);

  textSize(25 * scaleFactor);
  fill(234, 255, 151);
  text("User Experience Design | Wireframing | Prototyping", 50 * scaleFactor, 320 * scaleFactor);
  text("1 Week | Bangalore, India", 50 * scaleFactor, 350 * scaleFactor);

  // ── Body Text ───────────────────────────────────────────────────────────────
  textSize(25 * scaleFactor);
  fill(248, 244, 236);
  text(
    "This project reimagines the Mercedes-AMG Track Pace App through a product and interaction design lens, exploring how racing data can be experienced rather than simply viewed. The concept focuses on designing intuitive interactions that allow users to relive race highlights while capturing the emotional context behind each moment.\n\n By borrowing interaction patterns from reels, flash stories, and social feeds, the experience turns performance metrics into dynamic, shareable narratives enhancing engagement, emotional connection, and overall user experience.",
    50 * scaleFactor,
    420 * scaleFactor,
    1400 * scaleFactor,
    1200 * scaleFactor
  );

  // The main (very tall) image — drawn at full content width, height derived
  // from its TRUE aspect ratio so the replaced file is never stretched.
  const imgTop = 690 * scaleFactor;
  let imgH = 11800 * scaleFactor; // fallback until the image reports its size
  if (MBimgB && MBimgB.width) {
    imgH = (1600 * scaleFactor) * (MBimgB.height / MBimgB.width);
  }
  drawCull(MBimgB, 0, imgTop, 1600 * scaleFactor, imgH);

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
