let scrollOffset = 0;
let scrollSpeed = 1;
let totalWidth = 0;

let font;
let fontB;
let fontC;
let fontCB;
let HSimg;
let Hoshimg;
let DDimg;
let PPimg;
let MBimg;
let BCimg;
let MAimg;
let SAimg;

let bgimg;
let Starimg;
let emailB;
let LinkdIn;
let GitHb;
let Insta;

let IllusR;

// Brand logos
let logoAmazon;
let logoABI;
let logoCorona;
let logoHoegaarden;

let skillWords = [];
let SKILL_TEXT_SIZE = 96;

const balancingLink = "balancingconnections.html";
const momentsLink = "momentsapp.html";
const soundaidLink  = "SoundAid.html";
const projectLink = "hastashilp.html";
const hoshLink = "hoshruba.html";
const daredevilLink = "daredevil.html";
const printLink = "printproduction.html";

// Per-project keyword-pill state, keyed by project id.
// { reveal: 0..1 eased opacity/offset, open: latched bool }
let pillState = {};

// Brand-logo hover reveal amounts (eased 0..1), keyed by brand id
let brandHover = {};
// How far the content below the logos is pushed down while a card is open
let contentPush = 0;
let contentPushVel = 0; // velocity, for a springy bounce

// Typewriter animation for the brands label
let brandLabelChars = 0;      // how many chars revealed so far
let brandLabelStarted = false; // becomes true once section scrolls into view

let bcImgArea = {};
let bcTitleArea = {};
let momentsImgArea = {};
let momentsTitleArea = {};
let saImgArea   = {};
let saTitleArea = {};
let hsImgArea = {};
let hsTitleArea = {};
let hoshImgArea = {};
let hoshTitleArea = {};
let ddImgArea = {};
let ddTitleArea = {};
let ppImgArea = {};
let ppTitleArea = {};
let MBimgArea = {};
let bbTitleArea = {};

let stars = [];
const STAR_COUNT = 600;

let scaleFactor = 1;
let canvasWidth = 1600;
let canvasHeight = 7320;

function preload() {
  font = loadFont("Rosean.ttf");
  fontB = loadFont("Coolvetica Rg.otf");
  fontC = loadFont("Courier New.ttf");
  fontCB = loadFont("Courier New Bold.ttf");
  BCimg = loadImage("BCimg.png");
  MAimg = loadImage("MAimg.png");
  SAimg = loadImage("SAimg.png");
  HSimg = loadImage("HSimg.png");
  Hoshimg = loadImage("Hoshimg.png");
  DDimg = loadImage("DDimg.png");
  PPimg = loadImage("PPimgA.png");
  MBimg = loadImage("MBimg.png");
  bgimg = loadImage("WB.png");
  Starimg = loadImage("Star.png");
  emailB = loadImage("emailB.png");
  LinkdIn = loadImage("Linkdin.png");
  GitHb = loadImage("GhubL.png");
  Insta = loadImage("Insta.png");
  IllusR = loadImage("IllusR.png");

  logoAmazon      = loadImage("Amzn.png");
  logoABI         = loadImage("Abi Logo.png");
  logoCorona      = loadImage("Corona White Logo.png");
  logoHoegaarden  = loadImage("Hoegaarden Logo PMS.png");
}

function setup() {
  calculateCanvasSize();
  
  const cnv = createCanvas(canvasWidth, canvasHeight);
  const frame = document.querySelector(".canvas-frame");
  if (frame) cnv.parent(frame);

  setupSkillWords();

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
  const baseHeight = 7320;
  
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
  
  SKILL_TEXT_SIZE = 64 * scaleFactor;
}

function windowResized() {
  calculateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  
  skillWords = [];
  setupSkillWords();
  
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

function setupSkillWords() {
  textFont(font);
  textSize(SKILL_TEXT_SIZE);
  textAlign(LEFT, TOP);

  const skillText = "Product Design · UX / UI · Interaction Design · Design Systems · Prototyping · Branding & Visual Identity · AI-Driven Design · Illustration · ";
  
  const tokens = skillText.split(" ");
  let x = 0;

  for (const token of tokens) {
    const drawText = token + " ";
    const w = textWidth(drawText);
    const isInteractive = !["·", ""].includes(token);

    skillWords.push({
      label: drawText,
      text: token,
      x: x,
      y: 0,
      w: w,
      h: SKILL_TEXT_SIZE * 1.1,
      interactive: isInteractive,
      link: null
    });

    x += w;
  }
}

function draw() {
  background(15);
  drawGalaxy();

  textFont(font);
  textSize(160 * scaleFactor);
  fill(248, 244, 236);
  text("ARTIST & DESIGNER", 20 * scaleFactor, 75 * scaleFactor);
  text("Storyteller", 130 * scaleFactor, 200 * scaleFactor);
  
  textFont(fontB);
  textSize(60 * scaleFactor);
  text("Like what you see? Let's turn ideas into reality.", 135 * scaleFactor, 280 * scaleFactor);
  text("Whether you're here to explore or collaborate,", 135 * scaleFactor, 330 * scaleFactor);
  text("Let's get in touch!", 280 * scaleFactor, 380 * scaleFactor);

  image(bgimg, 0, 0, width, 890 * scaleFactor);
  image(Starimg, 10 * scaleFactor, 135 * scaleFactor, 130 * scaleFactor, 130 * scaleFactor);
  image(Starimg, 910 * scaleFactor, 135 * scaleFactor, 130 * scaleFactor, 130 * scaleFactor);

  drawSkillWords();
  drawBrandLogos();

  // Spring the content below the logos down while a brand card is open,
  // and let it bounce back when the card closes.
  let anyBrandOpen = 0;
  for (const k in brandHover) anyBrandOpen = max(anyBrandOpen, brandHover[k]);
  const pushTarget = anyBrandOpen * 175 * scaleFactor;
  // simple spring for a bouncy settle
  const stiffness = 0.12, damping = 0.72;
  contentPushVel += (pushTarget - contentPush) * stiffness;
  contentPushVel *= damping;
  contentPush += contentPushVel;

  // Fixed downward offset for the whole project section, to clear the logo row
  const projectsBaseOffset = 100 * scaleFactor;
  push();
  translate(0, contentPush + projectsBaseOffset);
  drawBalancingConnections();  
  drawMomentsApp();
  drawSoundAid();
  drawProject1();
  drawProject2();
  drawProject3();
  drawProject4();
  drawProject5();
  pop();

  // Shift all project hit-areas by the same offset so clicks/hovers stay aligned
  const _areaShift = contentPush + projectsBaseOffset;
  const _areas = [bcImgArea, bcTitleArea, momentsImgArea, momentsTitleArea,
    saImgArea, saTitleArea, hsImgArea, hsTitleArea, hoshImgArea, hoshTitleArea,
    ddImgArea, ddTitleArea, ppImgArea, ppTitleArea, MBimgArea, bbTitleArea];
  for (const a of _areas) { if (a && a.y !== undefined) a.y += _areaShift; }

  let isHovering = false;

  if (window.brandAreas) {
    for (const a of window.brandAreas) {
      if (a && mouseX >= a.x && mouseX <= a.x + a.w &&
          mouseY >= a.y && mouseY <= a.y + a.h) {
        isHovering = true;
        break;
      }
    }
  }

  if (mouseX >= bcImgArea.x && mouseX <= bcImgArea.x + bcImgArea.w &&
      mouseY >= bcImgArea.y && mouseY <= bcImgArea.y + bcImgArea.h) {
    isHovering = true;
  }

  if (mouseX >= bcTitleArea.x && mouseX <= bcTitleArea.x + bcTitleArea.w &&
      mouseY >= bcTitleArea.y && mouseY <= bcTitleArea.y + bcTitleArea.h) {
    isHovering = true;
  }

  if (mouseX >= momentsImgArea.x && mouseX <= momentsImgArea.x + momentsImgArea.w &&
      mouseY >= momentsImgArea.y && mouseY <= momentsImgArea.y + momentsImgArea.h) {
    isHovering = true;
  }

  if (mouseX >= momentsTitleArea.x && mouseX <= momentsTitleArea.x + momentsTitleArea.w &&
      mouseY >= momentsTitleArea.y && mouseY <= momentsTitleArea.y + momentsTitleArea.h) {
    isHovering = true;
  }

  if (mouseX >= saImgArea.x && mouseX <= saImgArea.x + saImgArea.w &&
      mouseY >= saImgArea.y && mouseY <= saImgArea.y + saImgArea.h) {
    isHovering = true;
  }

  if (mouseX >= saTitleArea.x && mouseX <= saTitleArea.x + saTitleArea.w &&
      mouseY >= saTitleArea.y && mouseY <= saTitleArea.y + saTitleArea.h) {
    isHovering = true;
  }

  if (mouseX >= hsImgArea.x && mouseX <= hsImgArea.x + hsImgArea.w &&
      mouseY >= hsImgArea.y && mouseY <= hsImgArea.y + hsImgArea.h) {
    isHovering = true;
  }

  if (mouseX >= hsTitleArea.x && mouseX <= hsTitleArea.x + hsTitleArea.w &&
      mouseY >= hsTitleArea.y && mouseY <= hsTitleArea.y + hsTitleArea.h) {
    isHovering = true;
  }

  if (mouseX >= hoshImgArea.x && mouseX <= hoshImgArea.x + hoshImgArea.w &&
      mouseY >= hoshImgArea.y && mouseY <= hoshImgArea.y + hoshImgArea.h) {
    isHovering = true;
  }

  if (mouseX >= hoshTitleArea.x && mouseX <= hoshTitleArea.x + hoshTitleArea.w &&
      mouseY >= hoshTitleArea.y && mouseY <= hoshTitleArea.y + hoshTitleArea.h) {
    isHovering = true;
  }

  if (mouseX >= ddImgArea.x && mouseX <= ddImgArea.x + ddImgArea.w &&
      mouseY >= ddImgArea.y && mouseY <= ddImgArea.y + ddImgArea.h) {
    isHovering = true;
  }

  if (mouseX >= ddTitleArea.x && mouseX <= ddTitleArea.x + ddTitleArea.w &&
      mouseY >= ddTitleArea.y && mouseY <= ddTitleArea.y + ddTitleArea.h) {
    isHovering = true;
  }

  if (mouseX >= ppImgArea.x && mouseX <= ppImgArea.x + ppImgArea.w &&
      mouseY >= ppImgArea.y && mouseY <= ppImgArea.y + ppImgArea.h) {
    isHovering = true;
  }

  if (mouseX >= ppTitleArea.x && mouseX <= ppTitleArea.x + ppTitleArea.w &&
      mouseY >= ppTitleArea.y && mouseY <= ppTitleArea.y + ppTitleArea.h) {
    isHovering = true;
  }

  if (mouseX >= MBimgArea.x && mouseX <= MBimgArea.x + MBimgArea.w &&
      mouseY >= MBimgArea.y && mouseY <= MBimgArea.y + MBimgArea.h) {
    isHovering = true;
  }

  if (mouseX >= bbTitleArea.x && mouseX <= bbTitleArea.x + bbTitleArea.w &&
      mouseY >= bbTitleArea.y && mouseY <= bbTitleArea.y + bbTitleArea.h) {
    isHovering = true;
  }

  if (mouseX >= 1200 * scaleFactor && mouseX <= 1200 * scaleFactor + 60 * scaleFactor &&
      mouseY >= 1045 * scaleFactor && mouseY <= 1045 * scaleFactor + 60 * scaleFactor) {
    isHovering = true;
  }
  
  if (mouseX >= 1340 * scaleFactor && mouseX <= 1340 * scaleFactor + 65 * scaleFactor &&
      mouseY >= 1044 * scaleFactor && mouseY <= 1044 * scaleFactor + 65 * scaleFactor) {
    isHovering = true;
  }

  push();
  translate(0, contentPush + projectsBaseOffset);
  image(
    IllusR,
    0 * scaleFactor,
    6520 * scaleFactor, 
    1600 * scaleFactor, 
    650 * scaleFactor
  );
  pop();

  cursor(isHovering ? HAND : ARROW);
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT DRAW FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

// Returns eased 0..1 reveal amount for a block at the given canvas-Y.
// Ramps from 0 to 1 as the block rises from the bottom of the viewport
// into the lower-middle of the screen.
function revealAmount(canvasY) {
  const screenY = canvasY - (window.scrollY || 0);
  const vh = window.innerHeight || height;
  const start = vh * 0.95; // begins revealing when block is near bottom
  const end = vh * 0.55;   // fully revealed by mid screen
  const t = constrain(map(screenY, start, end, 0, 1), 0, 1);
  // easeOutCubic for a smooth settle
  return 1 - pow(1 - t, 3);
}

// Draws a frosted-glass pill with a bold label centered inside.
// alpha 0..1 controls opacity as it emerges; angle tilts the whole pill.
function drawFrostedPill(cx, cy, label, alpha, angle) {
  if (alpha <= 0.01) return;
  push();
  translate(cx, cy);
  rotate(angle || 0);

  textFont(fontCB);
  textSize(22 * scaleFactor);
  textAlign(CENTER, CENTER);

  const padX = 26 * scaleFactor;
  const w = textWidth(label) + padX * 2;
  const h = 44 * scaleFactor;
  const a = 255 * alpha;

  // Soft drop shadow for lift
  noStroke();
  fill(0, 0, 0, 60 * alpha);
  rect(-w / 2, -h / 2 + 4 * scaleFactor, w, h, h / 2);

  // Frosted glass body: translucent white with a very subtle border
  fill(255, 255, 255, 42 * alpha);
  stroke(255, 255, 255, 55 * alpha);
  strokeWeight(0.8 * scaleFactor);
  rect(-w / 2, -h / 2, w, h, h / 2);

  // Subtle top highlight for the glassy sheen
  noStroke();
  fill(255, 255, 255, 30 * alpha);
  rect(-w / 2 + 2 * scaleFactor, -h / 2 + 2 * scaleFactor, w - 4 * scaleFactor, h * 0.42, h / 2);

  // Label
  noStroke();
  fill(234, 255, 151, a);
  text(label, 0, 0);
  pop();
}

// Generic keyword-pill system for any project.
//   id      : unique string key for latch state
//   imgArea : { x, y, w, h } of the project graphic (canvas coords)
//   pills   : [{ label, dx, dy, rot }]  (dx/dy are offsets in *base* px)
//   opts    : { originFracX, originFracY } fraction of imgArea for the hidden origin
// Pills are drawn BEFORE the image so they appear to emerge from behind it.
// They latch open on hover and reset when the section scrolls off-screen.
function drawKeywordPills(id, imgArea, pills, opts) {
  opts = opts || {};
  if (!pillState[id]) pillState[id] = { reveal: 0, open: false };
  const st = pillState[id];

  const hover =
    mouseX >= imgArea.x && mouseX <= imgArea.x + imgArea.w &&
    mouseY >= imgArea.y && mouseY <= imgArea.y + imgArea.h;
  if (hover) st.open = true;

  // Reset latch when the section scrolls out of the viewport
  const screenY = imgArea.y - (window.scrollY || 0);
  const vh = window.innerHeight || height;
  const onScreen = screenY > -imgArea.h && screenY < vh;
  if (!onScreen) st.open = false;

  st.reveal = lerp(st.reveal, st.open ? 1 : 0, 0.15);

  const originX = imgArea.x + imgArea.w * (opts.originFracX ?? 0.42);
  const originY = imgArea.y + imgArea.h * (opts.originFracY ?? 0.45);

  for (let i = 0; i < pills.length; i++) {
    const t = constrain(map(st.reveal, i * 0.10, 0.55 + i * 0.10, 0, 1), 0, 1);
    const ease = 1 - pow(1 - t, 3); // easeOutCubic
    const px = originX + ease * pills[i].dx * scaleFactor;
    const py = originY + ease * pills[i].dy * scaleFactor;
    drawFrostedPill(px, py, pills[i].label, ease, (pills[i].rot || 0) * ease);
  }
}

// ── Brands I've worked with ─────────────────────────────────────────────────
// A row of 4 logos on frosted plates. On hover a plate lifts/brightens and a
// frosted card with bullet pointers fades in below it.
function drawBrandLogos() {
  const brands = [
    {
      id: "amazon", img: logoAmazon, fit: 1.0,
      role: "Graphic & UX Designer",
      bullets: ["UX for 5+ global marketplaces",
                "Journey maps, flows, prototypes",
                "Streamlined UPI payment flows"]
    },
    {
      id: "abi", img: logoABI, fit: 1.0,
      role: "Sr. Graphic Designer",
      bullets: ["Brand systems, typography & packaging",
                "Campaign toolkits",
                "Retail + digital campaigns"]
    },
    {
      id: "corona", img: logoCorona, fit: 1.25,
      role: "under AB InBev",
      bullets: ["50+ festival visuals & spaces",
                "Immersive brand experiences",
                "Social media marketing"]
    },
    {
      id: "hoegaarden", img: logoHoegaarden, fit: 1.2,
      role: "under AB InBev",
      bullets: ["Visual & experiential design",
                "Brand partnership storyboarding",
                "Social media marketing"]
    }
  ];

  // Section label with a one-time typewriter animation
  const labelFull = "//Brands I've worked with";
  const labelY = 1010 * scaleFactor;

  // Start typing once the label scrolls into view
  const labelScreenY = labelY - (window.scrollY || 0);
  const vh = window.innerHeight || height;
  if (!brandLabelStarted && labelScreenY < vh * 0.9 && labelScreenY > 0) {
    brandLabelStarted = true;
  }

  if (brandLabelStarted && brandLabelChars < labelFull.length) {
    brandLabelChars += 0.12; // typing speed (chars per frame)
  }

  const shownCount = Math.min(Math.floor(brandLabelChars), labelFull.length);
  let shown = labelFull.substring(0, shownCount);
  // blinking cursor while typing, and briefly after
  const typing = brandLabelChars < labelFull.length;
  const blink = floor(frameCount / 45) % 2 === 0;
  if (brandLabelStarted && (typing || blink)) shown += "_";

  push();
  textFont(fontC);
  textSize(26 * scaleFactor);
  textAlign(CENTER, TOP);
  fill(234, 255, 151);
  text(shown, width / 2, labelY);
  pop();

  // Layout: 4 evenly spaced plates
  const plateW = 280 * scaleFactor;
  const plateH = 95 * scaleFactor;
  const gap = 40 * scaleFactor;
  const totalW = brands.length * plateW + (brands.length - 1) * gap;
  let startX = (width - totalW) / 2;
  const plateY = 1060 * scaleFactor;

  for (let i = 0; i < brands.length; i++) {
    const b = brands[i];
    const px = startX + i * (plateW + gap);

    const hover =
      mouseX >= px && mouseX <= px + plateW &&
      mouseY >= plateY && mouseY <= plateY + plateH;

    // ease hover amount
    if (brandHover[b.id] === undefined) brandHover[b.id] = 0;
    brandHover[b.id] = lerp(brandHover[b.id], hover ? 1 : 0, 0.15);
    const h = brandHover[b.id];

    // store hit area for cursor logic
    b._area = { x: px, y: plateY, w: plateW, h: plateH };

    const lift = h * -8 * scaleFactor;
    const r = 22 * scaleFactor; // pill-like rounded radius

    push();
    // frosted-glass plate — same language as the keyword pills (visible idle)
    // soft drop shadow
    noStroke();
    fill(0, 0, 0, 55 + 25 * h);
    rect(px, plateY + 5 * scaleFactor + lift, plateW, plateH, r);
    // translucent white body + subtle border
    fill(255, 255, 255, 42 + 18 * h);
    stroke(255, 255, 255, 55 + 45 * h);
    strokeWeight(0.8 * scaleFactor);
    rect(px, plateY + lift, plateW, plateH, r);
    // top sheen highlight
    noStroke();
    fill(255, 255, 255, 30 + 15 * h);
    rect(px + 3 * scaleFactor, plateY + lift + 3 * scaleFactor,
         plateW - 6 * scaleFactor, plateH * 0.42, r);
    pop();

    // logo, contained within the plate with padding, preserving aspect ratio
    if (b.img) {
      const pad = 22 * scaleFactor;
      const maxW = (plateW - pad * 2) * (b.fit || 1);
      const maxH = (plateH - pad * 2) * (b.fit || 1);
      const iw = b.img.width, ih = b.img.height;
      const scale = Math.min(maxW / iw, maxH / ih);
      const dw = iw * scale, dh = ih * scale;
      const dx = px + (plateW - dw) / 2;
      const dy = plateY + lift + (plateH - dh) / 2;
      push();
      tint(255, 200 + 55 * h); // slightly brighter on hover
      image(b.img, dx, dy, dw, dh);
      pop();
    }

    // hover card with role + bullet pointers
    if (h > 0.02) {
      const cardW = plateW + 110 * scaleFactor;
      const cardX = px - 55 * scaleFactor;
      const cardY = plateY + plateH + 14 * scaleFactor + lift;
      const cardH = 150 * scaleFactor;
      const a = h;

      push();
      noStroke();
      fill(0, 0, 0, 70 * a);
      rect(cardX, cardY + 4 * scaleFactor, cardW, cardH, 14 * scaleFactor);
      fill(255, 255, 255, 42 * a);
      stroke(255, 255, 255, 55 * a);
      strokeWeight(0.8 * scaleFactor);
      rect(cardX, cardY, cardW, cardH, 14 * scaleFactor);

      const padX = 20 * scaleFactor;
      let ty = cardY + 14 * scaleFactor;

      // role subheading
      noStroke();
      textFont(fontC);
      textAlign(LEFT, TOP);
      textSize(13 * scaleFactor);
      fill(255, 255, 255, 255 * a);
      text(b.role, cardX + padX, ty);
      ty += 24 * scaleFactor;

      // bullets — small, readable (single line each)
      textSize(14 * scaleFactor);
      fill(234, 255, 151, 255 * a);
      for (const line of b.bullets) {
        text("• " + line, cardX + padX, ty);
        ty += 28 * scaleFactor;
      }
      pop();
    }
  }

  window.brandAreas = brands.map(b => b._area).filter(Boolean);
}

function drawBalancingConnections() {
  // Slightly smaller graphic to open up room for the emerging pills
  bcImgArea = {
    x: 90 * scaleFactor,
    y: 1150 * scaleFactor,
    w: 880 * scaleFactor,
    h: 580 * scaleFactor
  };

  let bcHover =
    mouseX >= bcImgArea.x && mouseX <= bcImgArea.x + bcImgArea.w &&
    mouseY >= bcImgArea.y && mouseY <= bcImgArea.y + bcImgArea.h;

  // Frosted-glass keyword pills (emerge from behind the graphic, latch on hover)
  drawKeywordPills("bc", bcImgArea, [
    { label: "Human-Centered Design", dx: -230, dy: -230, rot: -0.12 }, // upper left
    { label: "Spatial Systems",        dx: 300,  dy: -170, rot: 0.10 },  // upper right
    { label: "Research",               dx: -340, dy: 40,   rot: 0.09 },  // lower left
    { label: "UX",                     dx: 320,  dy: 40,   rot: -0.08 }  // lower right
  ]);

  // ── Project graphic (with hover zoom, as before) ───────────────────────────
  let bcScale = bcHover ? 1.05 : 1;
  let bcW = bcImgArea.w * bcScale;
  let bcH = bcImgArea.h * bcScale;
  let bcX = bcImgArea.x - (bcW - bcImgArea.w) / 2;
  let bcY = bcImgArea.y - (bcH - bcImgArea.h) / 2;

  push();
  fill(60);
  stroke(234, 255, 151);
  strokeWeight(2);
  image(BCimg, bcX, bcY, bcW, bcH);
  pop();

  // ── Title ───────────────────────────────────────────────────────────────
  textFont(font);
  textSize(72 * scaleFactor);
  let titleX = 880 * scaleFactor;
  let titleY = 1350 * scaleFactor;
  let titleText = "BALANCING CONNECTIONS";
  let titleW = textWidth(titleText);
  let titleH = 72 * scaleFactor * 1.1;

  bcTitleArea = { x: titleX, y: titleY, w: titleW, h: titleH };

  fill(mouseX >= titleX && mouseX <= titleX + titleW &&
       mouseY >= titleY && mouseY <= titleY + titleH
    ? color(234, 255, 151) : color(248, 244, 236));
  text(titleText, titleX, titleY);

  // ── One-line impact statement ─────────────────────────────────────────────
  textFont(fontB);
  textSize(34 * scaleFactor);
  fill(248, 244, 236);
  text(
    "I designed playful spatial interventions that turn campus quads into low-pressure spaces where international students actually connect.",
    880 * scaleFactor, 1320 * scaleFactor, 690 * scaleFactor, 300 * scaleFactor
  );
}

function drawMomentsApp() {
  momentsImgArea = {
    x: 600 * scaleFactor,
    y: 1780 * scaleFactor,
    w: 1000 * scaleFactor,
    h: 600 * scaleFactor
  };

  let momentsHover =
    mouseX >= momentsImgArea.x && mouseX <= momentsImgArea.x + momentsImgArea.w &&
    mouseY >= momentsImgArea.y && mouseY <= momentsImgArea.y + momentsImgArea.h;

  // Keyword pills (emerge from behind the graphic, latch on hover)
  drawKeywordPills("moments", momentsImgArea, [
    { label: "AI-Native",           dx: -100, dy: -310, rot: -0.10 },
    { label: "Product Design",      dx: 260,  dy: -330, rot: 0.10 },
    { label: "Preventive Wellness", dx: -350, dy: -190,  rot: 0.08 }
  ]);

  let momentsScale = momentsHover ? 1.05 : 1;
  let momentsW = momentsImgArea.w * momentsScale;
  let momentsH = momentsImgArea.h * momentsScale;
  let momentsX = momentsImgArea.x - (momentsW - momentsImgArea.w) / 2;
  let momentsY = momentsImgArea.y - (momentsH - momentsImgArea.h) / 2;

  push();
  fill(60);
  stroke(234, 255, 151);
  strokeWeight(2);
  image(MAimg, momentsX, momentsY, momentsW, momentsH);
  pop();

  textFont(font);
  textSize(72 * scaleFactor);
  let titleX = 180 * scaleFactor;
  let titleY = 1930 * scaleFactor;
  let titleText = "MOMENTS APP";
  let titleW = textWidth(titleText);
  let titleH = 72 * scaleFactor * 1.1;

  momentsTitleArea = { x: titleX, y: titleY, w: titleW, h: titleH };

  fill(mouseX >= titleX && mouseX <= titleX + titleW &&
       mouseY >= titleY && mouseY <= titleY + titleH
    ? color(234, 255, 151) : color(248, 244, 236));
  text(titleText, titleX, titleY);

  textFont(fontB);
  textSize(34 * scaleFactor);
  fill(248, 244, 236);
  text(
    "I reframed digital distraction as a moment for mindfulness, designing an AI-first wellness app that turns idle screen time into emotional resilience.",
    180 * scaleFactor, 1920 * scaleFactor, 640 * scaleFactor, 300 * scaleFactor
  );
}

function drawSoundAid() {
  saImgArea = {
    x: -100 * scaleFactor,
    y: 2380 * scaleFactor,
    w: 1200 * scaleFactor,
    h: 700 * scaleFactor
  };

  let saHover =
    mouseX >= saImgArea.x && mouseX <= saImgArea.x + saImgArea.w &&
    mouseY >= saImgArea.y && mouseY <= saImgArea.y + saImgArea.h;

  // Keyword pills (emerge from behind the graphic, latch on hover)
  drawKeywordPills("sa", saImgArea, [
    { label: "Accessibility", dx: 10, dy: -340, rot: -0.10 },
    { label: "Auditory UX",   dx: 250,  dy: -220, rot: 0.10 },
    { label: "Prototyping",   dx: -330, dy: -340,  rot: 0.09 },
    { label: "User Testing",  dx: -270,  dy: 260,  rot: -0.08 }
  ], { originFracX: 0.5, originFracY: 0.5 });

  let saScale = saHover ? 1.05 : 1;
  let saW = saImgArea.w * saScale;
  let saH = saImgArea.h * saScale;
  let saX = saImgArea.x - (saW - saImgArea.w) / 2;
  let saY = saImgArea.y - (saH - saImgArea.h) / 2;

  push();
  stroke(234, 255, 151);
  strokeWeight(2);
  image(SAimg, saX, saY, saW, saH);
  pop();

  textFont(font);
  textSize(72 * scaleFactor);
  let titleX = 880 * scaleFactor;
  let titleY = 2640 * scaleFactor;
  let titleText = "SOUND AID";
  let titleW = textWidth(titleText);
  let titleH = 72 * scaleFactor * 1.1;

  saTitleArea = { x: titleX, y: titleY, w: titleW, h: titleH };

  fill(mouseX >= titleX && mouseX <= titleX + titleW &&
       mouseY >= titleY && mouseY <= titleY + titleH
    ? color(234, 255, 151) : color(248, 244, 236));
  text(titleText, titleX, titleY);

  textFont(fontB);
  textSize(34 * scaleFactor);
  fill(248, 244, 236);
  text(
    "I designed sound-based interactions that help people with visual impairments navigate complex environments with confidence.",
    880 * scaleFactor, 2630 * scaleFactor, 640 * scaleFactor, 300 * scaleFactor
  );
}

function drawProject1() {
  // HASTASHILP
  hsImgArea = {
    x: 90 * scaleFactor,
    y: 3220 * scaleFactor,
    w: 750 * scaleFactor,
    h: 550 * scaleFactor
  };

  let hsHover =
    mouseX >= hsImgArea.x && mouseX <= hsImgArea.x + hsImgArea.w &&
    mouseY >= hsImgArea.y && mouseY <= hsImgArea.y + hsImgArea.h;

  // Keyword pills (emerge from behind the graphic, latch on hover)
  drawKeywordPills("hs", hsImgArea, [
    { label: "Game Design",      dx: -20, dy: -300, rot: -0.10 },
    { label: "Cultural Heritage", dx: 380,  dy: -320, rot: 0.10 },
    { label: "Systems Design",   dx: -120, dy: 360,  rot: 0.09 },
    { label: "Illustration",     dx: 520,  dy: 150,  rot: -0.08 }
  ]);

  let hsScale = hsHover ? 1.05 : 1;
  let hsW = hsImgArea.w * hsScale;
  let hsH = hsImgArea.h * hsScale;
  let hsX = hsImgArea.x - (hsW - hsImgArea.w) / 2;
  let hsY = hsImgArea.y - (hsH - hsImgArea.h) / 2;

  image(HSimg, hsX, hsY, hsW, hsH);

  textFont(font);
  textSize(72 * scaleFactor);
  let titleX = 880 * scaleFactor;
  let titleY = 3350 * scaleFactor;
  let titleText = "HASTASHILP";
  let titleW = textWidth(titleText);
  let titleH = 72 * scaleFactor * 1.1;

  hsTitleArea = { x: titleX, y: titleY, w: titleW, h: titleH };

  fill(mouseX >= titleX && mouseX <= titleX + titleW &&
       mouseY >= titleY && mouseY <= titleY + titleH
    ? color(234, 255, 151) : color(248, 244, 236));
  text(titleText, titleX, titleY);

  textFont(fontB);
  textSize(34 * scaleFactor);
  fill(248, 244, 236);
  text(
    "I designed a card game that reconnects young adults with India's 500+ traditional crafts through learning-through-play.",
    880 * scaleFactor, 3325 * scaleFactor, 640 * scaleFactor, 300 * scaleFactor
  );
}

function drawProject2() {
  // HOSHRUBA
  hoshImgArea = {
    x: 800 * scaleFactor,
    y: 3700 * scaleFactor,
    w: 700 * scaleFactor,
    h: 790 * scaleFactor
  };

  let hoshHover =
    mouseX >= hoshImgArea.x && mouseX <= hoshImgArea.x + hoshImgArea.w &&
    mouseY >= hoshImgArea.y && mouseY <= hoshImgArea.y + hoshImgArea.h;

  // Keyword pills (emerge from behind the graphic, latch on hover)
  drawKeywordPills("hosh", hoshImgArea, [
    { label: "Visual Storytelling", dx: -180, dy: -180, rot: -0.10 },
    { label: "Narrative Design",    dx: 300,  dy: -180, rot: 0.10 },
    { label: "Illustration",        dx: -400, dy: 300,  rot: 0.09 },
    { label: "Poetry",              dx: 420,  dy: 340,  rot: -0.08 }
  ]);

  let hoshScale = hoshHover ? 1.05 : 1;
  let hoshW = hoshImgArea.w * hoshScale;
  let hoshH = hoshImgArea.h * hoshScale;
  let hoshX = hoshImgArea.x - (hoshW - hoshImgArea.w) / 2;
  let hoshY = hoshImgArea.y - (hoshH - hoshImgArea.h) / 2;

  image(Hoshimg, hoshX, hoshY, hoshW, hoshH);

  textFont(font);
  textSize(72 * scaleFactor);
  let hTitleX = 180 * scaleFactor;
  let hTitleY = 4030 * scaleFactor;
  let hTitleText = "Angry God's Dilemma";
  let hTitleW = textWidth(hTitleText);
  let hTitleH = 72 * scaleFactor * 1.1;

  hoshTitleArea = { x: hTitleX, y: hTitleY, w: hTitleW, h: hTitleH };

  fill(mouseX >= hTitleX && mouseX <= hTitleX + hTitleW &&
       mouseY >= hTitleY && mouseY <= hTitleY + hTitleH
    ? color(234, 255, 151) : color(248, 244, 236));
  text(hTitleText, hTitleX, hTitleY);

  textFont(fontB);
  textSize(34 * scaleFactor);
  fill(248, 244, 236);
  text(
    "I reimagined magical excerpts from Tilism-e-Hoshruba to spark reflection on identity, gender, and self-acceptance in the world today.",
    180 * scaleFactor, 4040 * scaleFactor, 480 * scaleFactor, 300 * scaleFactor
  );
}

function drawProject3() {
  // DAREDEVIL
  ddImgArea = {
    x: -40 * scaleFactor,
    y: 4420 * scaleFactor,
    w: 1060 * scaleFactor,
    h: 730 * scaleFactor
  };

  let ddHover =
    mouseX >= ddImgArea.x && mouseX <= ddImgArea.x + ddImgArea.w &&
    mouseY >= ddImgArea.y && mouseY <= ddImgArea.y + ddImgArea.h;

  // Keyword pills (emerge from behind the graphic, latch on hover)
  drawKeywordPills("dd", ddImgArea, [
    { label: "Branding",        dx: -230, dy: -320, rot: -0.10 },
    { label: "Packaging Design", dx: 230,  dy: -340, rot: 0.10 },
    { label: "Visual Identity", dx: -280, dy: 300,  rot: 0.09 },
    { label: "Logo",            dx: 300,  dy: 260,  rot: -0.08 }
  ], { originFracX: 0.5, originFracY: 0.5 });

  let ddScale = ddHover ? 1.05 : 1;
  let ddW = ddImgArea.w * ddScale;
  let ddH = ddImgArea.h * ddScale;
  let ddX = ddImgArea.x - (ddW - ddImgArea.w) / 2;
  let ddY = ddImgArea.y - (ddH - ddImgArea.h) / 2;

  image(DDimg, ddX, ddY, ddW, ddH);

  textFont(font);
  textSize(72 * scaleFactor);
  let titleX = 880 * scaleFactor;
  let titleY = 4750 * scaleFactor;
  let titleText = "DAREDEVIL Brewing Co.";
  let titleW = textWidth(titleText);
  let titleH = 72 * scaleFactor * 1.1;

  ddTitleArea = { x: titleX, y: titleY, w: titleW, h: titleH };

  fill(mouseX >= titleX && mouseX <= titleX + titleW &&
       mouseY >= titleY && mouseY <= titleY + titleH
    ? color(234, 255, 151) : color(248, 244, 236));
  text(titleText, titleX, titleY);

  textFont(fontB);
  textSize(34 * scaleFactor);
  fill(248, 244, 236);
  text(
    "I built a bold visual identity and packaging system that gives the Daredevil beer brand a striking, memorable shelf presence.",
    880 * scaleFactor, 4715 * scaleFactor, 640 * scaleFactor, 300 * scaleFactor
  );
}

function drawProject4() {
  // PRINT PRODUCTION
  ppImgArea = {
    x: 700 * scaleFactor,
    y: 5200 * scaleFactor,
    w: 820 * scaleFactor,
    h: 730 * scaleFactor
  };

  let ppHover =
    mouseX >= ppImgArea.x && mouseX <= ppImgArea.x + ppImgArea.w &&
    mouseY >= ppImgArea.y && mouseY <= ppImgArea.y + ppImgArea.h;

  // Keyword pills (emerge from behind the graphic, latch on hover)
  drawKeywordPills("pp", ppImgArea, [
    { label: "Print Design", dx: -300, dy: -190, rot: -0.10 },
    { label: "Research",     dx: 380,  dy: -280, rot: 0.10 },
    { label: "Editorial",    dx: -280, dy: 200,  rot: 0.09 },
    { label: "Field Study",  dx: 330,  dy: 320,  rot: -0.08 }
  ]);

  let ppScale = ppHover ? 1.05 : 1;
  let ppW = ppImgArea.w * ppScale;
  let ppH = ppImgArea.h * ppScale;
  let ppX = ppImgArea.x - (ppW - ppImgArea.w) / 2;
  let ppY = ppImgArea.y - (ppH - ppImgArea.h) / 2;

  image(PPimg, ppX, ppY, ppW, ppH);

  textFont(font);
  textSize(72 * scaleFactor);
  let titleX = 180 * scaleFactor;
  let titleY = 5450 * scaleFactor;
  let titleText = "PRINT PRODUCTION";
  let titleW = textWidth(titleText);
  let titleH = 72 * scaleFactor * 1.1;

  ppTitleArea = { x: titleX, y: titleY, w: titleW, h: titleH };

  fill(mouseX >= titleX && mouseX <= titleX + titleW &&
       mouseY >= titleY && mouseY <= titleY + titleH
    ? color(234, 255, 151) : color(248, 244, 236));
  text(titleText, titleX, titleY);

  textFont(fontB);
  textSize(34 * scaleFactor);
  fill(248, 244, 236);
  text(
    "I documented Bangalore's dense print-workshop ecosystem in a research-led book blending field study, visuals, and real print samples.",
    180 * scaleFactor, 5460 * scaleFactor, 480 * scaleFactor, 300 * scaleFactor
  );
}

function drawProject5() {
  // MERCEDES BENZ
  MBimgArea = {
    x: 270 * scaleFactor,
    y: 5900 * scaleFactor,
    w: 500 * scaleFactor,
    h: 800 * scaleFactor,
  };

  let bbHover =
    mouseX >= MBimgArea.x && mouseX <= MBimgArea.x + MBimgArea.w &&
    mouseY >= MBimgArea.y && mouseY <= MBimgArea.y + MBimgArea.h;

  // Keyword pills (emerge from behind the graphic, latch on hover)
  drawKeywordPills("mb", MBimgArea, [
    { label: "Product Design",     dx: -260, dy: -260, rot: -0.10 },
    { label: "Interaction Design", dx: -250,  dy: -160, rot: 0.10 },
    { label: "Automotive",         dx: -260, dy: 10,  rot: 0.09 },
    { label: "Concept",            dx: -250,  dy: -80,  rot: -0.08 }
  ]);

  let bbScale = bbHover ? 1.05 : 1;
  let bbW = MBimgArea.w * bbScale;
  let bbH = MBimgArea.h * bbScale;
  let bbX = MBimgArea.x - (bbW - MBimgArea.w) / 2;
  let bbY = MBimgArea.y - (bbH - MBimgArea.h) / 2;

  image(MBimg, bbX, bbY, bbW, bbH);

  textFont(font);
  textSize(72 * scaleFactor);
  let titleX = 880 * scaleFactor;
  let titleY = 6150 * scaleFactor;
  let titleText = "Mercedes Benz R&D";
  let titleW = textWidth(titleText);
  let titleH = 72 * scaleFactor * 1.1;

  bbTitleArea = { x: titleX, y: titleY, w: titleW, h: titleH };

  fill(mouseX >= titleX && mouseX <= titleX + titleW &&
       mouseY >= titleY && mouseY <= titleY + titleH
    ? color(234, 255, 151) : color(248, 244, 236));
  text(titleText, titleX, titleY);

  textFont(fontB);
  textSize(34 * scaleFactor);
  fill(248, 244, 236);
  text(
    "I reimagined the Mercedes-AMG Track Pace app so racing data can be felt as shareable, emotional stories, not just viewed.",
    880 * scaleFactor, 6125 * scaleFactor, 640 * scaleFactor, 300 * scaleFactor
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

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

function drawSkillWords() {
  if (totalWidth === 0) {
    textFont(font);
    textSize(SKILL_TEXT_SIZE);
    for (const word of skillWords) {
      totalWidth += word.w;
    }
  }

  push();
  fill(255);
  noStroke();
  let stripY = 920 * scaleFactor;
  let stripHeight = SKILL_TEXT_SIZE * 1;
  rect(0, stripY, width, stripHeight);
  pop();

  scrollOffset -= scrollSpeed;
  if (scrollOffset <= -totalWidth) {
    scrollOffset = 0;
  }

  textFont(font);
  textAlign(LEFT, CENTER); 
  textSize(SKILL_TEXT_SIZE);

  let currentX = scrollOffset;

  for (let repeat = 0; repeat < 2; repeat++) {
    for (const word of skillWords) {
      const wordX = currentX + word.x + (repeat * totalWidth);
      const wordY = stripY + stripHeight / 2;
      
      if (wordX + word.w > 0 && wordX < width) {
        fill(15);
        text(word.label, wordX, wordY);
        word.displayX = wordX;
        word.displayY = wordY;
      }
    }
  } 
}

// ─────────────────────────────────────────────────────────────────────────────
// MOUSE
// ─────────────────────────────────────────────────────────────────────────────

function mousePressed() {
  // Balancing Connections
  if (mouseX >= bcImgArea.x && mouseX <= bcImgArea.x + bcImgArea.w &&
      mouseY >= bcImgArea.y && mouseY <= bcImgArea.y + bcImgArea.h) {
    window.location.href = balancingLink; return;
  }
  if (mouseX >= bcTitleArea.x && mouseX <= bcTitleArea.x + bcTitleArea.w &&
      mouseY >= bcTitleArea.y && mouseY <= bcTitleArea.y + bcTitleArea.h) {
    window.location.href = balancingLink; return;
  }

  // Moments App
  if (mouseX >= momentsImgArea.x && mouseX <= momentsImgArea.x + momentsImgArea.w &&
      mouseY >= momentsImgArea.y && mouseY <= momentsImgArea.y + momentsImgArea.h) {
    window.location.href = momentsLink; return;
  }
  if (mouseX >= momentsTitleArea.x && mouseX <= momentsTitleArea.x + momentsTitleArea.w &&
      mouseY >= momentsTitleArea.y && mouseY <= momentsTitleArea.y + momentsTitleArea.h) {
    window.location.href = momentsLink; return;
  }

  // SoundAid
  if (mouseX >= saImgArea.x && mouseX <= saImgArea.x + saImgArea.w &&
      mouseY >= saImgArea.y && mouseY <= saImgArea.y + saImgArea.h) {
    window.location.href = soundaidLink; return;
  }
  if (mouseX >= saTitleArea.x && mouseX <= saTitleArea.x + saTitleArea.w &&
      mouseY >= saTitleArea.y && mouseY <= saTitleArea.y + saTitleArea.h) {
    window.location.href = soundaidLink; return;
  }

  // Hastashilp
  if (mouseX >= hsImgArea.x && mouseX <= hsImgArea.x + hsImgArea.w &&
      mouseY >= hsImgArea.y && mouseY <= hsImgArea.y + hsImgArea.h) {
    window.location.href = projectLink; return;
  }
  if (mouseX >= hsTitleArea.x && mouseX <= hsTitleArea.x + hsTitleArea.w &&
      mouseY >= hsTitleArea.y && mouseY <= hsTitleArea.y + hsTitleArea.h) {
    window.location.href = projectLink; return;
  }

  // Hoshruba
  if (mouseX >= hoshImgArea.x && mouseX <= hoshImgArea.x + hoshImgArea.w &&
      mouseY >= hoshImgArea.y && mouseY <= hoshImgArea.y + hoshImgArea.h) {
    window.location.href = hoshLink; return;
  }
  if (mouseX >= hoshTitleArea.x && mouseX <= hoshTitleArea.x + hoshTitleArea.w &&
      mouseY >= hoshTitleArea.y && mouseY <= hoshTitleArea.y + hoshTitleArea.h) {
    window.location.href = hoshLink; return;
  }

  // Daredevil
  if (mouseX >= ddImgArea.x && mouseX <= ddImgArea.x + ddImgArea.w &&
      mouseY >= ddImgArea.y && mouseY <= ddImgArea.y + ddImgArea.h) {
    window.location.href = daredevilLink; return;
  }
  if (mouseX >= ddTitleArea.x && mouseX <= ddTitleArea.x + ddTitleArea.w &&
      mouseY >= ddTitleArea.y && mouseY <= ddTitleArea.y + ddTitleArea.h) {
    window.location.href = daredevilLink; return;
  }

  // Print Production
  if (mouseX >= ppImgArea.x && mouseX <= ppImgArea.x + ppImgArea.w &&
      mouseY >= ppImgArea.y && mouseY <= ppImgArea.y + ppImgArea.h) {
    window.location.href = printLink; return;
  }
  if (mouseX >= ppTitleArea.x && mouseX <= ppTitleArea.x + ppTitleArea.w &&
      mouseY >= ppTitleArea.y && mouseY <= ppTitleArea.y + ppTitleArea.h) {
    window.location.href = printLink; return;
  }

  // Mercedes Benz
  if (mouseX >= MBimgArea.x && mouseX <= MBimgArea.x + MBimgArea.w &&
      mouseY >= MBimgArea.y && mouseY <= MBimgArea.y + MBimgArea.h) {
    window.location.href = "mercedesbens.html"; return;
  }
  if (mouseX >= bbTitleArea.x && mouseX <= bbTitleArea.x + bbTitleArea.w &&
      mouseY >= bbTitleArea.y && mouseY <= bbTitleArea.y + bbTitleArea.h) {
    window.location.href = "mercedesbens.html"; return;
  }

  // Skill words
  for (const word of skillWords) {
    if (word.link && word.displayX !== undefined &&
        mouseX >= word.displayX && mouseX <= word.displayX + word.w &&
        mouseY >= word.displayY && mouseY <= word.displayY + word.h) {
      window.location.href = word.link; return;
    }
  }

  // LinkedIn icon
  if (mouseX >= 1200 * scaleFactor && mouseX <= 1200 * scaleFactor + 60 * scaleFactor &&
      mouseY >= 1045 * scaleFactor && mouseY <= 1045 * scaleFactor + 60 * scaleFactor) {
    window.open('https://www.linkedin.com/in/aashi-jain29/', '_blank'); return;
  }

  // Instagram icon
  if (mouseX >= 1340 * scaleFactor && mouseX <= 1340 * scaleFactor + 65 * scaleFactor &&
      mouseY >= 1044 * scaleFactor && mouseY <= 1044 * scaleFactor + 65 * scaleFactor) {
    window.open('https://www.instagram.com/aashij__', '_blank'); return;
  }

}