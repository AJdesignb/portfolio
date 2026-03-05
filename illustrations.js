let menuActive = false;
let animRadius = 0;
let targetRadius = 0;
let maxRadius;

let redFolderOffset = 0;
let lblueFolderOffset = 0;
let pinkFolderOffset = 0;
let yellowFolderOffset = 0;
let dblueFolderOffset = 0;
let orangeFolderOffset = 0;

let font;
let fontB;

let IllusRedFolder;
let IllusLBlueFolder;
let IllusPinkFolder;
let IllusYellowFolder;
let IllusDBlueFolder;
let IllusOrangeFolder;
let IllusGreenFolder;

let IllusA;
let IllusB;
let IllusC;
let IllusD;
let IllusE;
let IllusF;
let IllusG;
let IllusH;
let IllusI;
let IllusJ;
let IllusK;
let IllusL;
let IllusM;
let IllusN;
let IllusO;
let IllusP;
let IllusQ;
let IllusR;
let IllusS;
let IllusT;

let emailB;
let LinkdIn;
let GitHb;
let Insta;

let stars = [];
const STAR_COUNT = 600;

let scaleFactor = 1;
let canvasWidth = 1600;
let canvasHeight = 5290; // adjust as you add more illustrations

function preload() {
  font  = loadFont("Rosean.ttf");
  fontB = loadFont("Coolvetica Rg.otf");

  IllusRedFolder = loadImage("IllusRedFolder.png");
  IllusLBlueFolder = loadImage("IllusLBlueFolder.png");
  IllusPinkFolder = loadImage("IllusPinkFolder.png");
  IllusYellowFolder = loadImage("IllusYellowFolder.png");
  IllusDBlueFolder = loadImage("IllusDBlueFolder.png");
  IllusOrangeFolder = loadImage("IllusOrangeFolder.png");
  IllusGreenFolder = loadImage("IllusGreenFolder.png");

  IllusA = loadImage("IllusA.png");
  IllusB = loadImage("IllusB.png");
  IllusC = loadImage("IllusC.png");
  IllusD = loadImage("IllusD.png");
  IllusE = loadImage("IllusE.png");
  IllusF = loadImage("IllusF.png");
  IllusG = loadImage("IllusG.png");
  IllusH = loadImage("IllusH.png");
  IllusI = loadImage("IllusI.png");
  IllusJ = loadImage("IllusJ.png");
  IllusK = loadImage("IllusK.png");
  IllusL = loadImage("IllusL.png");
  IllusM = loadImage("IllusM.png");
  IllusN = loadImage("IllusN.png");
  IllusO = loadImage("IllusO.png");
  IllusP = loadImage("IllusP.png");
  IllusQ = loadImage("IllusQ.png");
  IllusR = loadImage("IllusR.png");
  IllusS = loadImage("IllusS.png");
  IllusT = loadImage("IllusT.png");

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
  const baseHeight = 5290;

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

// ─────────────────────────────────────────────────────────────────────────────
// DRAW
// ─────────────────────────────────────────────────────────────────────────────

function draw() {
  background(15);
  drawGalaxy();

  // ── FOLDER HOVER DETECTION ────────────────────────────────────────────────
  // Each hit area targets only the thin visible tab strip of that folder,
  // so stacked folders don't all fire at once.

    let redHover =
    mouseX >= 30  * scaleFactor && mouseX <= 1570 * scaleFactor &&
    mouseY >= 150 * scaleFactor && mouseY <= 200  * scaleFactor;

    let lblueHover =
    mouseX >= 30  * scaleFactor && mouseX <= 1570 * scaleFactor &&
    mouseY >= 200 * scaleFactor && mouseY <= 250  * scaleFactor;

    let pinkHover =
    mouseX >= 30  * scaleFactor && mouseX <= 1570 * scaleFactor &&
    mouseY >= 250 * scaleFactor && mouseY <= 300  * scaleFactor;

    let yellowHover =
    mouseX >= 30  * scaleFactor && mouseX <= 1570 * scaleFactor &&
    mouseY >= 300 * scaleFactor && mouseY <= 350  * scaleFactor;

    let dblueHover =
    mouseX >= 30  * scaleFactor && mouseX <= 1570 * scaleFactor &&
    mouseY >= 350 * scaleFactor && mouseY <= 400  * scaleFactor;

    let orangeHover =
    mouseX >= 30  * scaleFactor && mouseX <= 1570 * scaleFactor &&
    mouseY >= 400 * scaleFactor && mouseY <= 450  * scaleFactor;

  // ── SMOOTH LIFT ───────────────────────────────────────────────────────────
  // -25 = lift amount in base px. Increase for more dramatic pop.
  redFolderOffset    = lerp(redFolderOffset,    redHover    ? -55 * scaleFactor : 0, 0.15);
  lblueFolderOffset  = lerp(lblueFolderOffset,  lblueHover  ? -55 * scaleFactor : 0, 0.15);
  pinkFolderOffset   = lerp(pinkFolderOffset,   pinkHover   ? -55 * scaleFactor : 0, 0.15);
  yellowFolderOffset = lerp(yellowFolderOffset, yellowHover ? -55 * scaleFactor : 0, 0.15);
  dblueFolderOffset  = lerp(dblueFolderOffset,  dblueHover  ? -55 * scaleFactor : 0, 0.15);
  orangeFolderOffset = lerp(orangeFolderOffset, orangeHover ? -55 * scaleFactor : 0, 0.15);

  // ── DRAW FOLDERS (back to front) ──────────────────────────────────────────
  
  // Hoverable Folders - offset applied to Y
  if (IllusRedFolder) {
    image(IllusRedFolder, 30 * scaleFactor, 150 * scaleFactor + redFolderOffset, 1540 * scaleFactor, 800 * scaleFactor);
  }

  if (IllusLBlueFolder) {
    image(IllusLBlueFolder, 30 * scaleFactor, 200 * scaleFactor + lblueFolderOffset, 1540 * scaleFactor, 800 * scaleFactor);
  }

  if (IllusPinkFolder) {
    image(IllusPinkFolder, 30 * scaleFactor, 250 * scaleFactor + pinkFolderOffset, 1540 * scaleFactor, 800 * scaleFactor);
  }

  if (IllusYellowFolder) {
    image(IllusYellowFolder, 30 * scaleFactor, 300 * scaleFactor + yellowFolderOffset, 1540 * scaleFactor, 800 * scaleFactor);
  }

  if (IllusDBlueFolder) {
    image(IllusDBlueFolder, 30 * scaleFactor, 350 * scaleFactor + dblueFolderOffset, 1540 * scaleFactor, 800 * scaleFactor);
  }

  if (IllusOrangeFolder) {
    image(IllusOrangeFolder, 30 * scaleFactor, 400 * scaleFactor  + orangeFolderOffset, 1540 * scaleFactor, 800 * scaleFactor);
  }

  // Green draws first — bottom of stack, no hover
  if (IllusGreenFolder) {
    image(IllusGreenFolder, 30 * scaleFactor, 450 * scaleFactor, 1540 * scaleFactor, 800 * scaleFactor);
  }

  // ── CURSOR ────────────────────────────────────────────────────────────────
  if (redHover || lblueHover || pinkHover || dblueHover || orangeHover) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }

  //Gallery img 1 faces
  image(
    IllusA,
    0 * scaleFactor,
    1300 * scaleFactor, 
    550 * scaleFactor, 
    600 * scaleFactor
  );

  //Gallery img 2 Afloat
  image(
    IllusB,
    540 * scaleFactor,
    1280 * scaleFactor, 
    500 * scaleFactor, 
    650 * scaleFactor
  );

  //Gallery img 3 Shopper girl BG
  image(
    IllusC,
    1070 * scaleFactor,
    1320 * scaleFactor, 
    500 * scaleFactor, 
    550 * scaleFactor
  );

  //Gallery img 3B Shopper girl 
  image(
    IllusT,
    1080 * scaleFactor,
    1260 * scaleFactor, 
    460 * scaleFactor, 
    740 * scaleFactor
  );


  //Gallery img 4 Monica O my Darling
  image(
    IllusD,
    30 * scaleFactor,
    1930 * scaleFactor, 
    480 * scaleFactor, 
    350 * scaleFactor
  );
  
  //Gallery img 6 Girl with the wine glass
  image(
    IllusF,
    1090 * scaleFactor,
    2010 * scaleFactor, 
    500 * scaleFactor, 
    500 * scaleFactor
  );

  //Gallery img 5 Hoshruba Laides with light
  image(
    IllusE,
    450 * scaleFactor,
    1960 * scaleFactor, 
    700 * scaleFactor, 
    650 * scaleFactor
  );
  
  //Gallery img 7 Hoshruba Cover Illustration
  image(
    IllusG,
    30 * scaleFactor,
    2310 * scaleFactor, 
    480 * scaleFactor, 
    700 * scaleFactor
  );

  //Gallery img 8 Green Cartoon girl
  image(
    IllusH,
    520 * scaleFactor,
    2600 * scaleFactor, 
    520 * scaleFactor, 
    520 * scaleFactor
  );
  
  //Gallery img 9 Bombay Blues full Illustrartion
  image(
    IllusI,
    1050 * scaleFactor,
    2530 * scaleFactor, 
    520 * scaleFactor, 
    520 * scaleFactor
  );

  //Gallery img 10 Yoga Lady Illustration
  image(
    IllusJ,
    0 * scaleFactor,
    3030 * scaleFactor, 
    550 * scaleFactor, 
    550 * scaleFactor
  );
  
  //Gallery img 11 Hoshruba Jail Illustration
  image(
    IllusK,
    510 * scaleFactor,
    3130 * scaleFactor, 
    550 * scaleFactor, 
    680 * scaleFactor
  );

  //Gallery img 12 Hoshruba Ladies
  image(
    IllusL,
    1050 * scaleFactor,
    3080 * scaleFactor, 
    520 * scaleFactor, 
    700 * scaleFactor
  );

  //Gallery img 14 box Illustration
  image(
    IllusN,
    540 * scaleFactor,
    3840 * scaleFactor, 
    500 * scaleFactor, 
    500 * scaleFactor
  );

  //Gallery img 13 Whale Illustration
  image(
    IllusM,
    30 * scaleFactor,
    3610 * scaleFactor, 
    550 * scaleFactor, 
    650 * scaleFactor
  );

  //Gallery img 15 Corona Illustrations
  image(
    IllusO,
    1050 * scaleFactor,
    3800 * scaleFactor, 
    570 * scaleFactor, 
    620 * scaleFactor
  );

  //Gallery img 16 Hoshruba eyes Illustration
  image(
    IllusP,
    30 * scaleFactor,
    4290 * scaleFactor, 
    550 * scaleFactor, 
    550 * scaleFactor
  );

  //Gallery img 17 Eye Sketch
  image(
    IllusQ,
    1140 * scaleFactor,
    4440 * scaleFactor, 
    450 * scaleFactor, 
    350 * scaleFactor
  );

  //Gallery img 18 box Illustration
  image(
    IllusS,
    620 * scaleFactor,
    4370 * scaleFactor, 
    460 * scaleFactor, 
    460 * scaleFactor
  );

  //Gallery img 19 Waves
  image(
    IllusR,
    0 * scaleFactor,
    4640 * scaleFactor, 
    1600 * scaleFactor, 
    650 * scaleFactor
  );

  

  // ── Menu overlay ──────────────────────────────────────────────────────────
  animRadius = lerp(animRadius, targetRadius, 0.15);
  if (animRadius > 1) {
    drawSpotlightOverlay(animRadius);
    if (animRadius > 40) drawMenuPanel();
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// GALAXY
// ─────────────────────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────────────────────
// MENU
// ─────────────────────────────────────────────────────────────────────────────

function toggleMenu() {
  menuActive   = !menuActive;
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

  const p2x = lerp(anchorX, 0,        progress);
  const p2y = lerp(anchorY, h * 0.32, progress);
  const p3x = lerp(anchorX, 0,        progress);
  const p3y = lerp(anchorY, h,        progress);
  const p4x = lerp(anchorX, width,    progress);
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
    { text: "HOME",          link: "index.html"          },
    { text: "Illustrations", link: "illustrations.html"  },
    { text: "Let's Connect", link: "contact.html"        }
  ];

  const h = min(windowHeight, height);
  textFont(font);
  textAlign(LEFT, TOP);
  textSize(68 * scaleFactor);

  const x     = 120 * scaleFactor;
  let   y     = h * 0.5;
  const lineH = 70 * scaleFactor;

  for (let i = 0; i < items.length; i++) {
    const item       = items[i];
    const itemWidth  = textWidth(item.text);
    const itemHeight = 68 * scaleFactor;

    const isHovering =
      mouseX >= x && mouseX <= x + itemWidth &&
      mouseY >= y && mouseY <= y + itemHeight;

    fill(isHovering ? color(63, 73, 23) : color(0));
    text(item.text, x, y);
    items[i].bounds = { x, y, w: itemWidth, h: itemHeight };
    y += lineH;
  }

  // Social icons
  let iconY      = y + 30 * scaleFactor;
  const iconSize = 40 * scaleFactor;
  const iconSpc  = 50 * scaleFactor;
  let iconX      = x;

  window.menuIcons = [];

  const iconDefs = [
    { img: emailB,  link: "mailto:ajain42@horizon.csueastbay.edu"    },
    { img: LinkdIn, link: "https://www.linkedin.com/in/aashi-jain29/" },
    { img: GitHb,   link: "https://ajdesignb.github.io/AJ-Github/"   },
    { img: Insta,   link: "https://www.instagram.com/aashij__"        }
  ];

  for (const def of iconDefs) {
    image(def.img, iconX, iconY, iconSize, iconSize);
    window.menuIcons.push({ x: iconX, y: iconY, w: iconSize, h: iconSize, link: def.link });
    iconX += iconSpc;
  }

  window.menuItems = items;
}

// ─────────────────────────────────────────────────────────────────────────────
// MOUSE
// ─────────────────────────────────────────────────────────────────────────────

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
        icon.link.startsWith("mailto:")
          ? window.location.href = icon.link
          : window.open(icon.link, "_blank", "noopener,noreferrer");
        return;
      }
    }
  }
}