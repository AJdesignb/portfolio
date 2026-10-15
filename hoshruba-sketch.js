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
// Last content (HoshimgE/K) sits at y=5310 and is 610 tall → ends at ~5920.
// Add a small margin so the scroll (and dark frame) ends just past it.
const CONTENT_HEIGHT = 5920;    // logical content height (design space)
let canvasHeight = 5920;

let Hoshimg;
let HoshimgB;
let HoshimgC;
let HoshimgD;
let HoshimgE;
let HoshimgF;
let HoshimgG;
let HoshimgH;
let HoshimgI;
let HoshimgJ;
let HoshimgK;

let emailB;
let LinkdIn;
let GitHb;
let Insta;

function preload() {
  font = loadFont("Rosean.ttf");
  fontB = loadFont("Coolvetica Rg.otf");
  Hoshimg  = loadImage("Hoshimg.png");
  HoshimgB = loadImage("HoshimgB.jpg");
  HoshimgC = loadImage("HoshimgC.png");
  HoshimgD = loadImage("HoshimgD.jpg");
  HoshimgE = loadImage("HoshimgE.png"); // replaced jpg → png
  HoshimgF = loadImage("HoshimgF.jpg");
  HoshimgG = loadImage("HoshimgG.jpg");
  HoshimgH = loadImage("HoshimgH.jpg");
  HoshimgI = loadImage("HoshimgI.png"); // replaced jpg → png
  HoshimgJ = loadImage("HoshimgJ.jpg");
  HoshimgK = loadImage("HoshimgK.jpg");
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
  // instead of a 6000px surface, so repaints are cheap and the cursor is smooth.
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
  text("ANGRY GOD'S", 50 * scaleFactor, 100 * scaleFactor);
  text("DILEMMA ~ A Lament", 50 * scaleFactor, 200 * scaleFactor);

  // ── Subtitle ──────────────────────────────────────────────────────────────
  textFont(fontB);
  textSize(40 * scaleFactor);
  fill(248, 244, 236, 200);
  text("Inspired by Tilism e-Hoshruba", 50 * scaleFactor, 320 * scaleFactor);

  textSize(25 * scaleFactor);
  fill(234, 255, 151);
  text("Storytelling | Illustration | Typography", 50 * scaleFactor, 400 * scaleFactor);
  text("8 Weeks | Bangalore, India", 50 * scaleFactor, 430 * scaleFactor);

  // 2nd image (here because we wanted an overlap)
  drawCull(HoshimgB, 0 * scaleFactor, 980 * scaleFactor, 1600 * scaleFactor, 1100 * scaleFactor);

  // Cover Image
  drawCull(Hoshimg, 690 * scaleFactor, 0 * scaleFactor, 900 * scaleFactor, 1100 * scaleFactor);

  // Body Text - positioned below image
  textSize(25 * scaleFactor);
  fill(248, 244, 236);
  text(
    "This project adapts magical excerpts from Tilism-e-Hoshruba \n to explore how its fictional world reflects issues in our real one. \n Inspired by Amar Ayyar's Zambil trickery where he disguises \n himself to deceive others, the work draws parallels to how \n people today often hide their true identities to appear \n socially acceptable.\n\nThrough this reinterpretation, the project raises questions \n about gender stereotypes, individuality, self-view, and \n self-acceptance. By using the story's aesthetic, magic, and \n narrative twists, it aims to creatively highlight contemporary \n social crises and encourage readers to reflect on their \n own identities.",
    50 * scaleFactor,
    500 * scaleFactor,
    1400 * scaleFactor,
    1500 * scaleFactor
  );

  textFont(font);
  textSize(60 * scaleFactor);
  fill(248, 244, 236);
  textAlign(LEFT, TOP);
  text("ANGRY GOD'S Dilemma ~ The Lament", 50 * scaleFactor, 2130 * scaleFactor);

  textSize(20 * scaleFactor);
  textFont(fontB);
  fill(248, 244, 236);
  text(
    "What do you do when, \n once what was magic, \n becomes the poison for the town?,\n this world that was a miracle created...\n becomes a snake that gulps you down. \n Who is to be blamed? \n This world, the magicians or the \n imposters who reside?! \n What did you do to my eyes? \n What did you do to my mind? \n How did you change my sight? \n Now I feel I'm blind...\n\n Why did you leave the twinkle\n in your heart behind? \n Why did you change your mind? \n I see you walking forward \n wearing this mask...\n Drowning yourself deep down in \n the pool of doubt! \n I made each one of you, \n with a fire in your heart.\n A fire that burns within,\n made you shine bright and \n find your own path.",
    50 * scaleFactor,
    2210 * scaleFactor,
    1400 * scaleFactor,
    1500 * scaleFactor
  );

  text("Yet far above from here,\n I see this trail of fear,\n as dingy is this path,\n I follow it to there,\n where the sounds of all\n who are caged behind this mask,\n are refusing to fight \n for their own lost light!\n Walking blindly following the mass,\n smothering their own laughs,\n their faces, their bodies,\n the fire in their hearts...\n\n Who is this trickster leading this trail?! \n who is this imposter \n taking over their tale?!\n How did this miracle, this tilism,\n this O' so magical world of thee!,\n become this ugly sphere of lies, sham,\n pretence and trickery?!\n What is it that my magicians seek?!\n Who is it, that's making their\n magic weak?!\n What are they trading their fire for?!\n What is it that they want more?!",
    430 * scaleFactor,
    2210 * scaleFactor,
    1400 * scaleFactor,
    1500 * scaleFactor
  );

  text("When I made them,\n I made them complete.\n I made them of magic,\n with a little dust of love,\n pinch of sorrows,\n dash of adventures,\n dollops of courage \n and a heartbeat.\n Take off the false armour,\n and hear it beat! \n See the light shine bright\n and stand on your feet!\n\n I say you break free\n from the shackles you have tied, \n take off that mask, \n there is no need to hide! \n Tell the world you are someone else,\n spread your wings & show your wealth...\n This colour, this mole,\n those freckles are yours. \n O magician, own up now \n or you'll forever be lost,\n in this maze of darkness \n & at what cost?!",
    810 * scaleFactor,
    2210 * scaleFactor,
    1400 * scaleFactor,
    1500 * scaleFactor
  );

  text("Deemed insignificant \n by your own unsettled mind! \n If you still choose to turn blind... \n then I demand it all back! \n O'Ungracious magician, \n there is nothing that you lack! \n\n I demand the parts of you \n that are tucked away so deep, \n I demand your fragments, your ruins, \n every piece of debris you choose to leap! \n Give it all to me, \n I will only love you more fiercely. \n Release every strand of your \n tightly woven existence, \n else you don't deserve to be!",
    1190 * scaleFactor,
    2210 * scaleFactor,
    1400 * scaleFactor,
    1500 * scaleFactor
  );

  textSize(15 * scaleFactor);
  text("~ Written by, Aashi J. (2021)",
    1260 * scaleFactor,
    2630 * scaleFactor,
    1400 * scaleFactor,
    1500 * scaleFactor
  );

  // project renders
  drawCull(HoshimgC, 0 * scaleFactor, 2885 * scaleFactor, 1600 * scaleFactor, 850 * scaleFactor);
  drawCull(HoshimgF, 0 * scaleFactor, 3785 * scaleFactor, 800 * scaleFactor, 610 * scaleFactor);
  drawCull(HoshimgG, 800 * scaleFactor, 3785 * scaleFactor, 800 * scaleFactor, 610 * scaleFactor);

  // Process sketches...
  // image(HoshimgH, 0, 4450, 800, 600);
  // image(HoshimgI, 800, 4450, 800, 600);

  textFont(font);
  textSize(120 * scaleFactor);
  fill(248, 244, 236);
  text("Illustrated Excerpts", 50 * scaleFactor, 4450 * scaleFactor);
  text("from the Poem...", 500 * scaleFactor, 4550 * scaleFactor);

  // excerpt 1
  drawCull(HoshimgJ, 0 * scaleFactor, 4700 * scaleFactor, 800 * scaleFactor, 610 * scaleFactor);
  // excerpt 2
  drawCull(HoshimgD, 800 * scaleFactor, 4700 * scaleFactor, 800 * scaleFactor, 610 * scaleFactor);
  // excerpt 3
  drawCull(HoshimgE, 0 * scaleFactor, 5310 * scaleFactor, 800 * scaleFactor, 610 * scaleFactor);
  // excerpt 4
  drawCull(HoshimgK, 800 * scaleFactor, 5310 * scaleFactor, 800 * scaleFactor, 610 * scaleFactor);

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
