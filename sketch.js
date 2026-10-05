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
let HWimg;

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
const haywardsLink = "haywards.html";

// Per-project keyword-pill state, keyed by project id.
// { reveal: 0..1 eased opacity/offset, open: latched bool }
let pillState = {};

// Brand-logo hover reveal amounts (eased 0..1), keyed by brand id
let brandHover = {};
// Project-card hover amounts (eased 0..1), keyed by card title
let cardHover = {};
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
let hwImgArea = {};
let hwTitleArea = {};
let ppImgArea = {};
let ppTitleArea = {};
let MBimgArea = {};
let bbTitleArea = {};

let stars = [];
const STAR_COUNT = 600;

let scaleFactor = 1;
let canvasWidth = 1600;
let canvasHeight = 4200;

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

  HWimg = loadImage("Haywards cover.png");
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
  const baseHeight = 4200;
  
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
  const projectsBaseOffset = 20 * scaleFactor;
  push();
  translate(0, contentPush + projectsBaseOffset);
  drawBalancingConnections();  // draws all 8 project cards
  pop();

  // Shift all project hit-areas by the same offset so clicks/hovers stay aligned
  const _areaShift = contentPush + projectsBaseOffset;
  const _areas = [bcImgArea, bcTitleArea, momentsImgArea, momentsTitleArea,
    saImgArea, saTitleArea, hsImgArea, hsTitleArea, hoshImgArea, hoshTitleArea,
    ddImgArea, ddTitleArea, hwImgArea, hwTitleArea, ppImgArea, ppTitleArea,
    MBimgArea, bbTitleArea];
  // Each card assigns imgArea === titleArea (same object), so dedupe to avoid
  // shifting the same hit-area twice (which pushed it off the card → dead clicks).
  const _seen = new Set();
  for (const a of _areas) {
    if (a && a.y !== undefined && !_seen.has(a)) { a.y += _areaShift; _seen.add(a); }
  }

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

  if (mouseX >= hwImgArea.x && mouseX <= hwImgArea.x + hwImgArea.w &&
      mouseY >= hwImgArea.y && mouseY <= hwImgArea.y + hwImgArea.h) {
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
    3420 * scaleFactor, 
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
      id: "abi", img: logoABI, fit: 1.0, cardW: 470,
      role: "Sr. Graphic Designer",
      bullets: ["Brand systems, typography & packaging",
                "Campaign toolkits",
                "Retail + digital campaigns"]
    },
    {
      id: "corona", img: logoCorona, fit: 1.25,
      role: "Sr. Graphic Designer",
      bullets: ["50+ festival visuals & spaces",
                "Immersive brand experiences",
                "Social media marketing"]
    },
    {
      id: "hoegaarden", img: logoHoegaarden, fit: 1.2,
      role: "Sr. Graphic Designer",
      bullets: ["Visual & experiential design",
                "Brand partnership storyboarding",
                "Social media marketing"]
    }
  ];

  // Section label with a one-time typewriter animation
  const labelFull = "//Brands I've worked with";
  const labelY = 1030 * scaleFactor;

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

  const labelX = 90 * scaleFactor;
  const labelTextY = labelY + 24 * scaleFactor;  // text nudged down (logos stay on labelY)
  push();
  textFont(fontC);
  textSize(26 * scaleFactor);
  textAlign(LEFT, TOP);
  fill(234, 255, 151);
  text(shown, labelX, labelTextY);
  pop();

  // Measure the full label width (so logos start right after the sentence)
  push();
  textFont(fontC);
  textSize(26 * scaleFactor);
  const labelW = textWidth(labelFull);
  pop();

  // Layout: logos continue on the SAME line, right after the label text
  const plateW = 210 * scaleFactor;
  const plateH = 95 * scaleFactor;
  const gap = 16 * scaleFactor;                 // tight — reads as one line
  let startX = labelX + labelW + 50 * scaleFactor;
  // vertically center the logo row on the label's text line, nudged down a bit
  const plateY = labelY + 13 * scaleFactor - plateH / 2 + 28 * scaleFactor;

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

    // (No plate/box — just the logo. It still lifts & brightens slightly on hover.)

    // logo, contained within the plate area with padding, preserving aspect ratio
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
      tint(255, 255); // full opacity
      image(b.img, dx, dy, dw, dh);
      pop();
    }

    // hover card with role + bullet pointers
    if (h > 0.02) {
      // generous fixed width so the bullet text never gets cut off
      const cardW = (b.cardW || 380) * scaleFactor;
      // centered under the plate, but clamped to stay within the canvas
      let cardX = px + plateW / 2 - cardW / 2;
      cardX = constrain(cardX, 20 * scaleFactor, width - cardW - 20 * scaleFactor);
      const cardY = plateY + plateH + 14 * scaleFactor + lift;
      const cardH = 160 * scaleFactor;
      const a = h;

      push();
      noStroke();
      // soft shadow
      fill(0, 0, 0, 70 * a);
      rect(cardX, cardY + 4 * scaleFactor, cardW, cardH, 14 * scaleFactor);
      // lime-green card body for contrast
      fill(234, 255, 151, 255 * a);
      noStroke();
      rect(cardX, cardY, cardW, cardH, 14 * scaleFactor);

      const padX = 20 * scaleFactor;
      let ty = cardY + 14 * scaleFactor;

      // role subheading — black, bold
      noStroke();
      textFont(fontCB);
      textAlign(LEFT, TOP);
      textSize(15 * scaleFactor);
      fill(0, 0, 0, 220 * a);
      text(b.role, cardX + padX, ty);
      ty += 26 * scaleFactor;

      // bullets — black, readable (single line each)
      textFont(fontC);
      textSize(16 * scaleFactor);
      fill(0, 0, 0, 255 * a);
      for (const line of b.bullets) {
        text("• " + line, cardX + padX, ty);
        ty += 29 * scaleFactor;
      }
      pop();
    }
  }

  window.brandAreas = brands.map(b => b._area).filter(Boolean);
}

// Reusable glass project card.
// cfg = { x, y, w, h, img, keywords[], title, desc }
// Returns the hit-area {x,y,w,h} for click/hover routing.
function drawProjectCard(cfg) {
  const cardX = cfg.x, cardY = cfg.y, cardW = cfg.w, cardH = cfg.h;
  const r = 26 * scaleFactor;
  const textH = cardH - cardH * 0.74;

  const isOver =
    mouseX >= cardX && mouseX <= cardX + cardW &&
    mouseY >= cardY && mouseY <= cardY + cardH;

  // Eased hover state per card, so the zoom flows in/out instead of popping.
  const key = cfg.title || (cfg.x + "," + cfg.y);
  if (!cardHover[key]) cardHover[key] = 0;
  cardHover[key] = lerp(cardHover[key], isOver ? 1 : 0, 0.12);
  const t = cardHover[key];               // 0..1 eased hover amount
  const hover = t > 0.5;                   // for discrete color/label choices

  // smooth lift + zoom driven by the eased value
  const scaleAmt = 1 + 0.06 * t;
  const cw = cardW * scaleAmt;
  const ch = cardH * scaleAmt;
  const cx = cardX - (cw - cardW) / 2;
  const cy = cardY - (ch - cardH) / 2 - 12 * scaleFactor * t;

  push();

  // optional theme tint color (e.g. Interaction Design = yellow)
  const tint = cfg.tint;  // [r, g, b] or undefined

  // soft drop shadow (eased)
  noStroke();
  fill(0, 0, 0, lerp(80, 110, t));
  rect(cx, cy + 12 * scaleFactor, cw, ch, r);

  // hover glow around the card edges (themed color), fades in with t
  if (tint && t > 0.02) {
    push();
    drawingContext.shadowBlur = 34 * scaleFactor * t;
    drawingContext.shadowColor = `rgba(${tint[0]}, ${tint[1]}, ${tint[2]}, ${0.9 * t})`;
    noFill();
    stroke(tint[0], tint[1], tint[2], 220 * t);
    strokeWeight(2 * scaleFactor);
    rect(cx, cy, cw, ch, r);
    drawingContext.shadowBlur = 0;   // reset so it doesn't bleed into later draws
    pop();
  }

  // body — frosted/translucent at rest, fills to SOLID tint color on hover (eased)
  if (tint) {
    fill(tint[0], tint[1], tint[2], lerp(40, 255, t));   // solid on hover
    stroke(tint[0], tint[1], tint[2], lerp(110, 255, t));
  } else {
    fill(255, 255, 255, lerp(48, 60, t));
    stroke(255, 255, 255, lerp(80, 110, t));
  }
  strokeWeight(1.1 * scaleFactor);
  rect(cx, cy, cw, ch, r);

  // top sheen (eased)
  noStroke();
  fill(255, 255, 255, lerp(55, 70, t));
  rect(cx + 4 * scaleFactor, cy + 4 * scaleFactor,
       cw - 8 * scaleFactor, ch * 0.10, r);
  fill(255, 255, 255, lerp(120, 150, t));
  rect(cx + r, cy + 3 * scaleFactor, cw - r * 2, 2.5 * scaleFactor, 2 * scaleFactor);

  const kwSize = 15 * scaleFactor;
  const kwPadX = 12 * scaleFactor;
  const kwPadY = 6 * scaleFactor;
  const kwGap = 8 * scaleFactor;
  const kwRowH = kwSize + kwPadY * 2;
  const kwRowGap = 8 * scaleFactor;
  const imgScale = cfg.imgScale || 1;
  const imgAr = cfg.img.width / cfg.img.height;

  // Helper: draw centered keyword-pill rows within [colX, colX+colW], starting at startY.
  // Returns the Y at the bottom of the last row.
  function drawPills(colX, colW, startY) {
    const cX = colX + colW / 2;
    const maxW = colW - 40 * scaleFactor;
    textFont(fontC); textSize(kwSize); textAlign(LEFT, CENTER);
    const rows = [];
    let row = [], rowW = 0;
    for (const kw of cfg.keywords) {
      const pillW = textWidth(kw) + kwPadX * 2;
      const addW = (row.length ? kwGap : 0) + pillW;
      if (row.length && rowW + addW > maxW) { rows.push({ items: row, w: rowW }); row = []; rowW = 0; }
      row.push({ kw, pillW });
      rowW += (row.length > 1 ? kwGap : 0) + pillW;
    }
    if (row.length) rows.push({ items: row, w: rowW });
    let yy = startY;
    for (const rw of rows) {
      let xx = cX - rw.w / 2;
      for (const it of rw.items) {
        push();
        // pill: no fill, bright lime border + text at rest → black on the solid tint on hover
        noFill();
        stroke(lerp(234, 0, t), lerp(255, 0, t), lerp(151, 0, t), 255);
        strokeWeight(0.8 * scaleFactor);
        rect(xx, yy, it.pillW, kwRowH, kwRowH / 2);
        noStroke();
        // pill text: bright lime → black on hover
        fill(lerp(234, 0, t), lerp(255, 0, t), lerp(151, 0, t), 255);
        text(it.kw, xx + kwPadX, yy + kwRowH / 2);
        pop();
        xx += it.pillW + kwGap;
      }
      yy += kwRowH + kwRowGap;
    }
    return yy - kwRowGap;
  }

  if (cfg.layout === "side") {
    // ── SIDE-BY-SIDE: a fully-visible tilted image on the left, a normal
    //    straight left-aligned content column on the right. ──
    const tilt = cfg.imgTilt !== undefined ? cfg.imgTilt : -0.1;
    const leftFrac = 0.44;                         // width share for the image side
    // fit the image (fully visible) into the left region, then scale
    const regionW = cw * leftFrac - 20 * scaleFactor;
    const regionH = ch - 60 * scaleFactor;
    let bw = regionW, bh = bw / imgAr;
    if (bh > regionH) { bh = regionH; bw = bh * imgAr; }
    bw *= imgScale; bh *= imgScale;
    const imgCx = cx + cw * leftFrac * 0.5 + (cfg.imgOffsetX || 0) * scaleFactor;
    const imgCy = cy + ch / 2 + (cfg.imgOffsetY || 0) * scaleFactor;
    push();
    translate(imgCx, imgCy);
    rotate(tilt);
    image(cfg.img, -bw / 2, -bh / 2, bw, bh);
    pop();

    // content column on the right — normal straight left-aligned block
    const colX = cx + cw * leftFrac + 14 * scaleFactor;
    const colRight = cx + cw - 24 * scaleFactor;
    const colW = colRight - colX;
    let yy = cy + 55 * scaleFactor;

    // keyword pills — left-aligned, wrap within the column
    // bright lime border + text at rest → black on the solid tint on hover
    textFont(fontC); textSize(kwSize); textAlign(LEFT, CENTER);
    let kx = colX;
    for (const kw of cfg.keywords) {
      const pillW = textWidth(kw) + kwPadX * 2;
      if (kx + pillW > colRight && kx > colX) { kx = colX; yy += kwRowH + kwRowGap; }
      push();
      noFill();
      stroke(lerp(234, 0, t), lerp(255, 0, t), lerp(151, 0, t), 255);
      strokeWeight(0.8 * scaleFactor);
      rect(kx, yy, pillW, kwRowH, kwRowH / 2);
      noStroke();
      fill(lerp(234, 0, t), lerp(255, 0, t), lerp(151, 0, t), 255);
      text(kw, kx + kwPadX, yy + kwRowH / 2);
      pop();
      kx += pillW + kwGap;
    }

    // divider under the pills
    let ty = yy + kwRowH + 18 * scaleFactor;
    stroke(255, 255, 255, 45);
    strokeWeight(0.8 * scaleFactor);
    line(colX, ty, colRight, ty);

    // title — left-aligned (cream → black on hover)
    ty += 18 * scaleFactor;
    noStroke();
    textFont(font); textSize(34 * scaleFactor); textAlign(LEFT, TOP);
    fill(lerp(248, 0, t), lerp(244, 0, t), lerp(236, 0, t));
    text(cfg.title, colX, ty, colW);
    const titleLines = textWidth(cfg.title) > colW ? 2 : 1;

    // description — left-aligned (cream → black on hover)
    ty += 40 * scaleFactor * titleLines + 16 * scaleFactor;
    textFont(fontB); textSize(20 * scaleFactor); textAlign(LEFT, TOP);
    fill(lerp(248, 0, t), lerp(244, 0, t), lerp(236, 0, t), lerp(220, 255, t));
    text(cfg.desc, colX, ty, colW, ch);

  } else {
    // ── STACKED (default): image top, content bottom ──
    const inset = 1 * scaleFactor;
    const topInset = 8 * scaleFactor;
    const fw = (cw - inset * 2) * imgScale;
    const fh = fw / imgAr;
    const fx = cx + (cw - fw) / 2;
    const fy = cy + topInset + (cfg.imgOffsetY || 0) * scaleFactor;
    const imgBottom = fy + fh;
    push();
    image(cfg.img, fx, fy, fw, fh);
    pop();

    // divider
    stroke(255, 255, 255, 45);
    strokeWeight(0.8 * scaleFactor);
    line(cx + 20 * scaleFactor, imgBottom + 16 * scaleFactor,
         cx + cw - 20 * scaleFactor, imgBottom + 16 * scaleFactor);

    // keyword pills (centered rows)
    noStroke();
    const centerX = cx + cw / 2;
    let ky = drawPills(cx, cw, imgBottom + 30 * scaleFactor);

    // title
    let ty = ky + 16 * scaleFactor;
    const titleLead = 40 * scaleFactor;   // tighter line spacing for 2-line titles
    textFont(font); textSize(43 * scaleFactor); textAlign(CENTER, TOP);
    textLeading(titleLead);
    // title: cream at rest → black on hover (readable on the solid tint)
    fill(lerp(248, 0, t), lerp(244, 0, t), lerp(236, 0, t));
    text(cfg.title, centerX, ty);

    // description — advance past however many title lines there are
    const titleLines = String(cfg.title).split("\n").length;
    ty += 46 * scaleFactor + (titleLines - 1) * titleLead;
    textFont(fontB); textSize(23 * scaleFactor); textAlign(CENTER, TOP);
    textLeading(28 * scaleFactor);   // normal spacing for the wrapped description
    // description: cream at rest → black on hover
    fill(lerp(248, 0, t), lerp(244, 0, t), lerp(236, 0, t), lerp(220, 255, t));
    text(cfg.desc, cx + 30 * scaleFactor, ty, cw - 60 * scaleFactor, textH);
  }

  pop();

  return { x: cardX, y: cardY, w: cardW, h: cardH };
}

// All 8 project cards laid out in a grid (3 + 3 + 2).
// (function name kept for compatibility with the single call in draw())
function drawBalancingConnections() {
  const cardW = 440 * scaleFactor;
  const cardH = 600 * scaleFactor;
  const cardH2 = 680 * scaleFactor;  // taller cards for row 2
  const gap = 40 * scaleFactor;
  const rowGap = 90 * scaleFactor;
  const rowW = cardW * 3 + gap * 2;
  const startX = (width - rowW) / 2;
  const col = (i) => startX + i * (cardW + gap);
  const row1Y = 1150 * scaleFactor;
  const row2Y = row1Y + cardH + rowGap;
  const row3Y = row2Y + cardH2 + rowGap;

  // ── Row 1 ──
  const interactionTint = [245, 201, 78]; // #f5c94e — Interaction Design theme
  bcImgArea = bcTitleArea = drawProjectCard({
    x: col(0), y: row1Y, w: cardW, h: cardH, img: BCimg, tint: interactionTint,
    keywords: ["Human-Centered Design", "Spatial Systems", "Research", "UX"],
    title: "BALANCING CONNECTIONS",
    desc: "Playful spatial interventions that turn campus quads into low-pressure spaces where students connect."
  });
  momentsImgArea = momentsTitleArea = drawProjectCard({
    x: col(1), y: row1Y, w: cardW, h: cardH, img: MAimg, imgScale: 0.94, imgOffsetY: 30, tint: interactionTint,
    keywords: ["AI-Native", "Product Design", "Preventive Wellness"],
    title: "MOMENTS APP",
    desc: "An AI-first wellness app that reframes idle screen time into moments of mindfulness and resilience."
  });
  saImgArea = saTitleArea = drawProjectCard({
    x: col(2), y: row1Y, w: cardW, h: cardH, img: SAimg, imgScale: 1.16, tint: interactionTint,
    keywords: ["Accessibility", "Auditory UX", "Prototyping", "User Testing"],
    title: "SOUND AID",
    desc: "Sound-based interactions that help people with visual impairments navigate complex spaces with confidence."
  });

  // ── Row 2 (taller cards) ──
  hsImgArea = hsTitleArea = drawProjectCard({
    x: col(0), y: row2Y, w: cardW, h: cardH2, img: HSimg, imgOffsetY: 45, tint: [122, 216, 238],
    keywords: ["Game Design", "Cultural Heritage", "Systems Design", "Illustration"],
    title: "HASTASHILP",
    desc: "A card game that reconnects young adults with India's 500+ traditional crafts through learning-through-play."
  });
  hoshImgArea = hoshTitleArea = drawProjectCard({
    x: col(1), y: row2Y, w: cardW, h: cardH2, img: Hoshimg, imgScale: 0.95, imgOffsetY: -120, tint: [217, 59, 48],
    keywords: ["Visual Storytelling", "Narrative Design", "Illustration", "Poetry"],
    title: "ANGRY GOD'S DILEMMA",
    desc: "A reimagining of Tilism-e-Hoshruba that sparks reflection on identity, gender, and self-acceptance today."
  });
  hwImgArea = hwTitleArea = drawProjectCard({
    x: col(2), y: row2Y, w: cardW, h: cardH2, img: HWimg, imgScale: 0.9, tint: [244, 148, 193],
    keywords: ["Branding", "Packaging", "Typography"],
    title: "HAYWARDS BRAND\nEXPLORATIONS",
    desc: "A modern-retro rebrand of Haywards 5000 packaging — bringing back the old with a fresh twist, a la The Archies."
  });

  // ── Row 3 (3 cards, taller) ──
  const cardH3 = 700 * scaleFactor;
  ddImgArea = ddTitleArea = drawProjectCard({
    x: col(0), y: row3Y, w: cardW, h: cardH3, img: DDimg, imgScale: 1.22, imgOffsetY: 30, tint: [244, 148, 193],
    keywords: ["Branding", "Packaging Design", "Visual Identity", "Logo"],
    title: "DAREDEVIL Brewing Co.",
    desc: "A bold visual identity and packaging system that gives the Daredevil beer brand a striking shelf presence."
  });
  ppImgArea = ppTitleArea = drawProjectCard({
    x: col(1), y: row3Y, w: cardW, h: cardH3, img: PPimg, tint: [224, 102, 59],
    keywords: ["Print Design", "Research", "Editorial", "Field Study"],
    title: "PRINT PRODUCTION",
    desc: "A research-led book documenting Bangalore's dense print-workshop ecosystem, with real print samples."
  });
  MBimgArea = bbTitleArea = drawProjectCard({
    x: col(2), y: row3Y, w: cardW, h: cardH3, img: MBimg,
    layout: "side", imgScale: 1.05, imgTilt: -0.1, tint: [245, 201, 78],
    keywords: ["Product Design", "Interaction Design", "Automotive", "Concept"],
    title: "Mercedes Benz R&D",
    desc: "A reimagined Mercedes-AMG Track Pace app that turns racing data into shareable, emotional stories."
  });
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

  // Haywards Brand Explorations
  if (mouseX >= hwImgArea.x && mouseX <= hwImgArea.x + hwImgArea.w &&
      mouseY >= hwImgArea.y && mouseY <= hwImgArea.y + hwImgArea.h) {
    window.location.href = haywardsLink; return;
  }
  if (mouseX >= hwTitleArea.x && mouseX <= hwTitleArea.x + hwTitleArea.w &&
      mouseY >= hwTitleArea.y && mouseY <= hwTitleArea.y + hwTitleArea.h) {
    window.location.href = haywardsLink; return;
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