let menuActive = false;
let animRadius = 0;
let targetRadius = 0;
let maxRadius;

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

let scaleFactor = 1;
let canvasWidth = 1600;
let canvasHeight = 12600;

function preload() {
  font = loadFont("Rosean.ttf");
  fontB = loadFont("Coolvetica Rg.otf");
  
  MBimg = loadImage("MBimg.png");
  MBimgB = loadImage("bbimgB.jpg");
 
  LinkdIn = loadImage("Linkdin.png");
  GitHb = loadImage("GhubL.png");
  Insta = loadImage("Insta.png");
  emailB = loadImage("emailB.png");
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
  const baseHeight = 12600;
  
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
  text("Mercedes Bens R&D India", 50 * scaleFactor, 100 * scaleFactor);

  // Subtitle
  textFont(fontB);
  textSize(40 * scaleFactor);
  fill(248, 244, 236, 200);
  text("Concept Presentation", 50 * scaleFactor, 240 * scaleFactor);

  textSize(25 * scaleFactor);
  fill(234, 255, 151);
  text("User Experience Design | Wireframing | Prototyping", 50 * scaleFactor, 320 * scaleFactor);
  text("1 Week | Bangalore, India", 50 * scaleFactor, 350 * scaleFactor);

  // Body Text
  textSize(25 * scaleFactor);
  fill(248, 244, 236);
  text(
    "This project reimagines the Mercedes-AMG Track Pace App through a product and interaction design lens, exploring how racing data can be experienced rather than simply viewed. The concept focuses on designing intuitive interactions that allow users to relive race highlights while capturing the emotional context behind each moment.\n\n By borrowing interaction patterns from reels, flash stories, and social feeds, the experience turns performance metrics into dynamic, shareable narratives enhancing engagement, emotional connection, and overall user experience.",
    50 * scaleFactor,
    420 * scaleFactor,
    1400 * scaleFactor,
    1200 * scaleFactor
  );
  
  // Cover image 
  if (MBimgB) {
    let imgX = 0 * scaleFactor;
    let imgY = 690 * scaleFactor;
    let imgW = 1600 * scaleFactor;
    let imgH = 11800 * scaleFactor;
    image(MBimgB, imgX, imgY, imgW, imgH);
  }

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
    { text: "HOME", link: null },
    { text: "Illustrations", link: null },
    { text: "Let's Connect", link: null }
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
    link: 'https://github.com/yourusername' // Replace with your GitHub URL
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