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
// Last image (HSimgL) sits at y=6700 and is 1150 tall → ends at ~7850. Add a
// small margin so the scroll (and dark frame) ends just past it.
const CONTENT_HEIGHT = 7900;    // logical content height (design space)
let canvasHeight = 7900;

// let HSimgB; // (commented out — not used)
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
  HSimg  = loadImage("HSimg.png");
  HSimgC = loadImage("HSimgC.jpg");
  HSimgD = loadImage("HSimgD.jpg");
  HSimgE = loadImage("HSimgE.jpg");
  HSimgF = loadImage("HSimgF.jpg");
  HSimgG = loadImage("HSimgG.jpg");
  HSimgH = loadImage("HSimgH.png"); // replaced jpg → png
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
  // Don't let the browser restore an old scroll position onto our tall spacer,
  // which would translate all content off-screen on reload.
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.scrollTo(0, 0);

  calculateCanvasSize();

  // VIEWPORT-SIZED canvas (fixed to the screen). The page scrolls via a spacer
  // div; we draw content offset by scrollY. This keeps the canvas tiny (~1 screen)
  // instead of an 8000px surface, so repaints are cheap and the cursor is smooth.
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

  // The header and footer are in normal flow (they scroll with the page), while
  // the canvas is fixed to the viewport. Measure where each sits in the viewport
  // RIGHT NOW so the frame starts just below the header's visible bottom edge and
  // ends just above the footer's visible top edge — keeping all four corners clear.
  const headerEl = document.querySelector(".site-header");
  const footerEl = document.querySelector(".footer");
  const headerRect = headerEl ? headerEl.getBoundingClientRect() : null;
  const footerRect = footerEl ? footerEl.getBoundingClientRect() : null;

  const gap = 24; // breathing room between the frame and the bars / screen edges
  const headerBottom = headerRect ? Math.max(0, headerRect.bottom) : 0;
  const footerTop = footerRect ? Math.min(height, footerRect.top) : height;

  const frameTop = headerBottom + gap;
  const frameH = Math.max(0, footerTop - gap - frameTop);

  // Dark rounded frame behind the content, with a soft drop shadow (same as the
  // old CSS canvas: 0 20px 40px rgba(0,0,0,0.6)).
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
  drawGalaxy(contentW, frameH);
  drawingContext.restore();
  pop();

  // ── Everything below scrolls: shift the whole content block up by scrollY ──
  // Center the 1600px-wide column horizontally, and push it down so it starts
  // inside the frame with breathing room below the top edge.
  const contentPadTop = frameTop + 20 * scaleFactor;
  push();
  translate(offsetX, contentPadTop - (window.scrollY || 0));

  // ── Main Heading ────────────────────────────────────────────────────────────
  textFont(font);
  textSize(120 * scaleFactor);
  fill(248, 244, 236);
  textAlign(LEFT, TOP);
  text("HASTASHILP", 50 * scaleFactor, 100 * scaleFactor);

  // ── Subtitle ──────────────────────────────────────────────────────────────
  textFont(fontB);
  textSize(40 * scaleFactor);
  fill(248, 244, 236, 200);
  text("Handicrafts of India (Card Game Design)", 50 * scaleFactor, 200 * scaleFactor);

  textSize(25 * scaleFactor);
  fill(234, 255, 151);
  text("Game Design | Conceptualisation | Prototyping | User testing", 50 * scaleFactor, 280 * scaleFactor);
  text("8 Weeks | Bangalore, India", 50 * scaleFactor, 310 * scaleFactor);

  // 2nd image (here because we wanted an overlap)
  drawCull(HSimgC, 0 * scaleFactor, 750 * scaleFactor, 1600 * scaleFactor, 1150 * scaleFactor);

  // Cover Image
  drawCull(HSimg, 690 * scaleFactor, 120 * scaleFactor, 900 * scaleFactor, 720 * scaleFactor);

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

  // 3rd Image
  drawCull(HSimgD, 0 * scaleFactor, 1460 * scaleFactor, 1600 * scaleFactor, 1150 * scaleFactor);
  // 4th Image
  drawCull(HSimgE, 0 * scaleFactor, 2313 * scaleFactor, 1600 * scaleFactor, 560 * scaleFactor);
  // 5th Image
  drawCull(HSimgF, 0 * scaleFactor, 2870 * scaleFactor, 1600 * scaleFactor, 560 * scaleFactor);
  // 6th Image
  drawCull(HSimgG, 0 * scaleFactor, 3430 * scaleFactor, 1600 * scaleFactor, 1000 * scaleFactor);
  // 7th Image
  drawCull(HSimgH, 0 * scaleFactor, 4000 * scaleFactor, 1600 * scaleFactor, 1000 * scaleFactor);
  // 8th Image
  drawCull(HSimgI, 0 * scaleFactor, 5000 * scaleFactor, 800 * scaleFactor, 600 * scaleFactor);
  // 9th Image
  drawCull(HSimgJ, 800 * scaleFactor, 5000 * scaleFactor, 800 * scaleFactor, 600 * scaleFactor);
  // 10th Image
  drawCull(HSimgK, 0 * scaleFactor, 5550 * scaleFactor, 1600 * scaleFactor, 1150 * scaleFactor);
  // 11th Image
  drawCull(HSimgL, 0 * scaleFactor, 6700 * scaleFactor, 1600 * scaleFactor, 1150 * scaleFactor);

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
