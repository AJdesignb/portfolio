let menuActive = false;
let animRadius = 0;
let targetRadius = 0;
let maxRadius;
let font;
let fontB;
let MAimg;
let MAimgA;
let MAimgAA;
let MAimgB;
let MAimgC;
let MAimgD;
let MAimgE;
let MAimgF;
let MAimgG;
let MAimgI;
let MAimgJ;
let MAimgK;
let MAimgL;
let MAimgM;
let MAimgN;
let MAimgO;
let MAimgS;

let stars = [];
const STAR_COUNT = 600;
let scaleFactor = 1;
let canvasWidth = 1600;
let canvasHeight = 11650;
let email;
let LinkdIn;
let GitHb;
let Insta;
let emailB;

function preload() {
  font = loadFont("Rosean.ttf");
  fontB = loadFont("Coolvetica Rg.otf");
  MAimg = loadImage("MAimg.png");
  MAimgA = loadImage("MAimgA.png");
  MAimgAA = loadImage("MAimgAA.png");
  MAimgB = loadImage("MAimgB.png");
  MAimgC = loadImage("MAimgC.png");
  MAimgD = loadImage("MAimgD.png");
  MAimgE = loadImage("MAimgE.png");
  MAimgF = loadImage("MAimgF.png");
  MAimgG = loadImage("MAimgG.png");
  MAimgI = loadImage("MAimgI.png");
  MAimgJ = loadImage("MAimgJ.png");
  MAimgK = loadImage("MAimgK.png");
  MAimgL = loadImage("MAimgL.png");
  MAimgM = loadImage("MAimgM.png");
  MAimgN = loadImage("MAimgN.png");
  MAimgO = loadImage("MAimgO.png");
  MAimgS = loadImage("MAimgS.png");
  
  // Social icons
  email = loadImage("email.png");
  emailB = loadImage("emailB.png");
  LinkdIn = loadImage("Linkdin.png");
  GitHb = loadImage("GhubL.png");
  Insta = loadImage("Insta.png");
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
  const baseWidth = 1600;
  const baseHeight = 11650;

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

function draw() {
  background(15);
  drawGalaxy();

  // Main Heading
  textFont(font);
  textSize(120 * scaleFactor);
  fill(248, 244, 236);
  textAlign(LEFT, TOP);
  text("Moments APP", 100 * scaleFactor, 100 * scaleFactor);

  // Subtitle
  textFont(fontB);
  textSize(40 * scaleFactor);
  fill(248, 244, 236, 200);
  text("AI-Driven Preventive Wellness", 100 * scaleFactor, 220 * scaleFactor);

  textSize(25 * scaleFactor);
  fill(234, 255, 151);
  text("Interaction Design | AI Research | Prompting", 100 * scaleFactor, 300 * scaleFactor);
  text("Human-Centered Social Intervention - Screen", 100 * scaleFactor, 330 * scaleFactor);
   text("TEAM: Daniela Buendia Olmos, Aashi Jain, Subin Choi, Vivian Gölz", 100 * scaleFactor, 380 * scaleFactor);

  // // Cover Image
  // if (MAimg) {
  //   let imgX = 0 * scaleFactor;
  //   let imgY = 350 * scaleFactor;
  //   let imgW = 1700 * scaleFactor;
  //   let imgH = 1000 * scaleFactor;
  //   image(MAimg, imgX, imgY, imgW, imgH);
  // }
  
  // Body Text
  textSize(25 * scaleFactor);
  fill(248, 244, 236);
  text(
    "This project explores how artificial intelligence and design can promote longer, healthier lives through prevention. Moments is an interactive app concept that reframes digital distraction as an opportunity for mindfulness and emotional resilience.\n\n The entire project was developed using AI as the primary research and design engine, from insight generation to concept structuring and behavioral pattern analysis. Our role as a team was to strategically craft prompts, guide direction, and critically evaluate outputs, demonstrating how human intention combined with AI capability can shape meaningful preventive wellness solutions.",
    100 * scaleFactor,
    430 * scaleFactor,
    1400 * scaleFactor,
    1200 * scaleFactor
  );

  //Img 1
  image(
    MAimgA,
    0 * scaleFactor,
    700 * scaleFactor, 
    1600 * scaleFactor, 
    900 * scaleFactor
  );

  //Img 2
  image(
    MAimgB,
    0 * scaleFactor,
    1450 * scaleFactor, 
    1600 * scaleFactor, 
    900 * scaleFactor
  );

  //Img 3
  image(
    MAimgC,
    0 * scaleFactor,
    2000 * scaleFactor, 
    1600 * scaleFactor, 
    900 * scaleFactor
  );

  //Img 4
  image(
    MAimgD,
    0 * scaleFactor,
    2900 * scaleFactor, 
    1600 * scaleFactor, 
    900 * scaleFactor
  );

  //Img 5
  image(
    MAimgE,
    0 * scaleFactor,
    3615 * scaleFactor, 
    1600 * scaleFactor, 
    900 * scaleFactor
  );

  //Img 6
  image(
    MAimgF,
    0 * scaleFactor,
    4325 * scaleFactor, 
    1600 * scaleFactor, 
    900 * scaleFactor
  );

  //Img 7
  image(
    MAimgG,
    0 * scaleFactor,
    4850 * scaleFactor, 
    1600 * scaleFactor, 
    900 * scaleFactor
  );

  //Img 8
  image(
    MAimgI,
    0 * scaleFactor,
    5585 * scaleFactor, 
    1600 * scaleFactor, 
    900 * scaleFactor
  );

  //Img 9
  image(
    MAimgJ,
    0 * scaleFactor,
    6380 * scaleFactor, 
    1600 * scaleFactor, 
    900 * scaleFactor
  );

  //Img 10
  image(
    MAimgK,
    0 * scaleFactor,
    7000 * scaleFactor, 
    1600 * scaleFactor, 
    900 * scaleFactor
  );

  //Img 11
  image(
    MAimgL,
    0 * scaleFactor,
    7900 * scaleFactor, 
    1600 * scaleFactor, 
    900 * scaleFactor
  );

  //Img 14
  image(
    MAimgO,
    0 * scaleFactor,
    10330 * scaleFactor, 
    1600 * scaleFactor, 
    900 * scaleFactor
  );

  //Img 13
  image(
    MAimgN,
    0 * scaleFactor,
    9630 * scaleFactor, 
    1600 * scaleFactor, 
    900 * scaleFactor
  );

  //Img 12
  image(
    MAimgM,
    0 * scaleFactor,
    8800 * scaleFactor, 
    1600 * scaleFactor, 
    900 * scaleFactor
  );

  //Img 15
  image(
    MAimgS,
    0 * scaleFactor,
    11070 * scaleFactor, 
    1600 * scaleFactor, 
    450 * scaleFactor
  );

  animRadius = lerp(animRadius, targetRadius, 0.15);
  if (animRadius > 1) {
    drawSpotlightOverlay(animRadius);
    if (animRadius > 40) drawMenuPanel();
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

function toggleMenu() {
  menuActive = !menuActive;
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

  const base2x = 0;
  const base2y = h * 0.32;
  const base3x = 0;
  const base3y = h;
  const base4x = width;
  const base4y = h * 0.68;

  const anchorX = width;
  const anchorY = 0;

  const p2x = lerp(anchorX, base2x, progress);
  const p2y = lerp(anchorY, base2y, progress);
  const p3x = lerp(anchorX, base3x, progress);
  const p3y = lerp(anchorY, base3y, progress);
  const p4x = lerp(anchorX, base4x, progress);
  const p4y = lerp(anchorY, base4y, progress);

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
    { text: "HOME", link: "index.html" },
    { text: "Illustrations", link: null },
    { text: "Let's Connect", link: "contact.html" }
  ];

  const h = min(windowHeight, height);

  textFont(font);
  textAlign(LEFT, TOP);
  textSize(68 * scaleFactor);
  fill(0);

  const x = 120 * scaleFactor;
  let y = h * 0.5;
  const lineH = 70 * scaleFactor;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    const itemWidth = textWidth(item.text);
    const itemHeight = 68 * scaleFactor;

    const isHovering =
      mouseX >= x &&
      mouseX <= x + itemWidth &&
      mouseY >= y &&
      mouseY <= y + itemHeight;

    if (isHovering) {
      fill(63, 73, 23);
    } else {
      fill(0);
    }

    text(item.text, x, y);
    items[i].bounds = { x, y, w: itemWidth, h: itemHeight };

    y += lineH;
  }

  // Draw social icons row below the menu items
  let iconY = y + 30 * scaleFactor;
  let iconSize = 40 * scaleFactor;
  let iconSpacing = 50 * scaleFactor;
  let iconX = x;

  // Store icon positions for click detection
  window.menuIcons = [];

  // Email icon
  image(emailB, iconX, iconY, iconSize, iconSize);
  window.menuIcons.push({
    x: iconX,
    y: iconY,
    w: iconSize,
    h: iconSize,
    link: 'mailto:ajain42@horizon.csueastbay.edu'
  });
  iconX += iconSpacing;

  // LinkedIn icon
  image(LinkdIn, iconX, iconY, iconSize, iconSize);
  window.menuIcons.push({
    x: iconX,
    y: iconY,
    w: iconSize,
    h: iconSize,
    link: 'https://www.linkedin.com/in/aashi-jain29/'
  });
  iconX += iconSpacing;

  // GitHub icon
  image(GitHb, iconX, iconY, iconSize, iconSize);
  window.menuIcons.push({
    x: iconX,
    y: iconY,
    w: iconSize,
    h: iconSize,
    link: 'https://ajdesignb.github.io/AJ-Github/' 
  });
  iconX += iconSpacing;

  // Instagram icon
  image(Insta, iconX, iconY, iconSize, iconSize);
  window.menuIcons.push({
    x: iconX,
    y: iconY,
    w: iconSize,
    h: iconSize,
    link: 'https://www.instagram.com/aashij__'
  });

  window.menuItems = items;
}

function mousePressed() {
  if (!menuActive) return;

  // 1) click on menu text items
  if (window.menuItems) {
    for (let item of window.menuItems) {
      if (
        item.link &&
        item.bounds &&
        mouseX >= item.bounds.x &&
        mouseX <= item.bounds.x + item.bounds.w &&
        mouseY >= item.bounds.y &&
        mouseY <= item.bounds.y + item.bounds.h
      ) {
        window.location.href = item.link;
        return;
      }
    }
  }

  // 2) click on social icons
  if (window.menuIcons) {
    for (let icon of window.menuIcons) {
      if (
        mouseX >= icon.x &&
        mouseX <= icon.x + icon.w &&
        mouseY >= icon.y &&
        mouseY <= icon.y + icon.h
      ) {
        // open external links safely (and mailto works too)
        window.open(icon.link, "_blank", "noopener,noreferrer");
        return;
      }
    }
  }
}