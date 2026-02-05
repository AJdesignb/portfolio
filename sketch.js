let menuActive = false;
let animRadius = 0;
let targetRadius = 0;
let maxRadius;

let scrollOffset = 0;
let scrollSpeed = 1; // speed here (higher = faster)
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

let bgimg;
let Starimg;
let emailB;
let LinkdIn;
let GitHb;
let Insta;

let skillWords = [];
let SKILL_TEXT_SIZE = 96;

const projectLink = "hastashilp.html";
const hoshLink = "hoshruba.html";
const daredevilLink = "daredevil.html";
const printLink = "printproduction.html";

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
let canvasHeight = 5000;

function preload() {
  font = loadFont("Rosean.ttf");
  fontB = loadFont("Coolvetica Rg.otf");
  fontC = loadFont("Courier New.ttf");
  fontCB = loadFont("Courier New Bold.ttf");
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
}

function setup() {
  calculateCanvasSize();
  
  const cnv = createCanvas(canvasWidth, canvasHeight);
  const frame = document.querySelector(".canvas-frame");
  if (frame) cnv.parent(frame);

  maxRadius = dist(0, 0, width, height);

  const menuBtn = document.getElementById("menuBtn");
  if (menuBtn) menuBtn.addEventListener("click", toggleMenu);

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
  const baseHeight = 5000;
  
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
  
  SKILL_TEXT_SIZE = 94 * scaleFactor;
}

function windowResized() {
  calculateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  maxRadius = dist(0, 0, width, height);
  
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

  // Single string of all skills with separator
  const skillText = "Interaction Design · Product & UX Design · Graphic Design · Creative Strategy · AI & Design · Visual Storytelling · Illustrations · ";
  
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
      y: 0, // Will be positioned in draw()
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
  drawProject1();
  drawProject2();
  drawProject3();
  drawProject4();
  drawProject5();
  
  //github repo direct
  // Define the clickable area
  let githubX = 10 * scaleFactor;
  let githubY = 1027 * scaleFactor;
  let githubW = 1580 * scaleFactor;
  let githubH = 60 * scaleFactor;
  
  // Check if hovering
  let githubHover = 
    mouseX >= githubX &&
    mouseX <= githubX + githubW &&
    mouseY >= githubY &&
    mouseY <= githubY + githubH;
  
  // Draw rectangle with hover effect
  stroke(234, 255, 151);
  strokeWeight(1);
  fill(githubHover ? color(234, 255, 151) : color(0));
  rect(githubX, githubY, githubW, githubH);
  
  // Draw text with hover effect
  textSize(43 * scaleFactor);
  textFont(fontC);
  fill(githubHover ? color(0) : color(234, 255, 151));
  text(
    "//Check out some of my Coding Explorations on my Github repo.", 
    15 * scaleFactor, 
    1050 * scaleFactor
  );
  
   let isHovering = false;

  // Check GitHub repo box hover
  if (mouseX >= githubX &&
      mouseX <= githubX + githubW &&
      mouseY >= githubY &&
      mouseY <= githubY + githubH) {
    isHovering = true;
  }

  // Check HASTASHILP image hover
  if (mouseX >= hsImgArea.x &&
      mouseX <= hsImgArea.x + hsImgArea.w &&
      mouseY >= hsImgArea.y &&
      mouseY <= hsImgArea.y + hsImgArea.h) {
    isHovering = true;
  }

  // Check HASTASHILP title hover
  if (mouseX >= hsTitleArea.x &&
      mouseX <= hsTitleArea.x + hsTitleArea.w &&
      mouseY >= hsTitleArea.y &&
      mouseY <= hsTitleArea.y + hsTitleArea.h) {
    isHovering = true;
  }

  // Check HOSHRUBA image hover
  if (mouseX >= hoshImgArea.x &&
      mouseX <= hoshImgArea.x + hoshImgArea.w &&
      mouseY >= hoshImgArea.y &&
      mouseY <= hoshImgArea.y + hoshImgArea.h) {
    isHovering = true;
  }

  // Check HOSHRUBA title hover
  if (mouseX >= hoshTitleArea.x &&
      mouseX <= hoshTitleArea.x + hoshTitleArea.w &&
      mouseY >= hoshTitleArea.y &&
      mouseY <= hoshTitleArea.y + hoshTitleArea.h) {
    isHovering = true;
  }

  // Check DAREDEVIL image hover
  if (mouseX >= ddImgArea.x &&
      mouseX <= ddImgArea.x + ddImgArea.w &&
      mouseY >= ddImgArea.y &&
      mouseY <= ddImgArea.y + ddImgArea.h) {
    isHovering = true;
  }

  // Check DAREDEVIL title hover
  if (mouseX >= ddTitleArea.x &&
      mouseX <= ddTitleArea.x + ddTitleArea.w &&
      mouseY >= ddTitleArea.y &&
      mouseY <= ddTitleArea.y + ddTitleArea.h) {
    isHovering = true;
  }

  // Check PRINT PRODUCTION image hover
  if (mouseX >= ppImgArea.x &&
      mouseX <= ppImgArea.x + ppImgArea.w &&
      mouseY >= ppImgArea.y &&
      mouseY <= ppImgArea.y + ppImgArea.h) {
    isHovering = true;
  }

  // Check PRINT PRODUCTION title hover
  if (mouseX >= ppTitleArea.x &&
      mouseX <= ppTitleArea.x + ppTitleArea.w &&
      mouseY >= ppTitleArea.y &&
      mouseY <= ppTitleArea.y + ppTitleArea.h) {
    isHovering = true;
  }

  // Check Mercedes Benz image hover
  if (mouseX >= MBimgArea.x &&
      mouseX <= MBimgArea.x + MBimgArea.w &&
      mouseY >= MBimgArea.y &&
      mouseY <= MBimgArea.y + MBimgArea.h) {
    isHovering = true;
  }

  // Check Mercedes Benz title hover
  if (mouseX >= bbTitleArea.x &&
      mouseX <= bbTitleArea.x + bbTitleArea.w &&
      mouseY >= bbTitleArea.y &&
      mouseY <= bbTitleArea.y + bbTitleArea.h) {
    isHovering = true;
  }

  // Check LinkedIn icon hover
  if (mouseX >= 1200 * scaleFactor && 
      mouseX <= 1200 * scaleFactor + 60 * scaleFactor &&
      mouseY >= 1045 * scaleFactor && 
      mouseY <= 1045 * scaleFactor + 60 * scaleFactor) {
    isHovering = true;
  }
  
  // Check Instagram icon hover
  if (mouseX >= 1340 * scaleFactor && 
      mouseX <= 1340 * scaleFactor + 65 * scaleFactor &&
      mouseY >= 1044 * scaleFactor && 
      mouseY <= 1044 * scaleFactor + 65 * scaleFactor) {
    isHovering = true;
  }

  // Check menu panel icons hover
  if (menuActive && window.menuIcons) {
    for (let icon of window.menuIcons) {
      if (mouseX >= icon.x &&
          mouseX <= icon.x + icon.w &&
          mouseY >= icon.y &&
          mouseY <= icon.y + icon.h) {
        isHovering = true;
        break;
      }
    }
  }

  // Check menu items hover
  if (menuActive && window.menuItems) {
    for (let item of window.menuItems) {
      if (item.bounds &&
          mouseX >= item.bounds.x &&
          mouseX <= item.bounds.x + item.bounds.w &&
          mouseY >= item.bounds.y &&
          mouseY <= item.bounds.y + item.bounds.h) {
        isHovering = true;
        break;
      }
    }
  }

  // Set cursor based on hover state
  if (isHovering) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
  // END CURSOR MANAGEMENT

  animRadius = lerp(animRadius, targetRadius, 0.15);
  if (animRadius > 1) {
    drawSpotlightOverlay(animRadius);
    if (animRadius > 40) drawMenuPanel();
  }



}

function drawProject1() {
  hsImgArea = {
    x: 90 * scaleFactor,
    y: 1150 * scaleFactor,
    w: 800 * scaleFactor,
    h: 600 * scaleFactor
  };

  let hsHover =
    mouseX >= hsImgArea.x &&
    mouseX <= hsImgArea.x + hsImgArea.w &&
    mouseY >= hsImgArea.y &&
    mouseY <= hsImgArea.y + hsImgArea.h;

  let hsScale = hsHover ? 1.05 : 1;
  let hsW = hsImgArea.w * hsScale;
  let hsH = hsImgArea.h * hsScale;
  let hsX = hsImgArea.x - (hsW - hsImgArea.w) / 2;
  let hsY = hsImgArea.y - (hsH - hsImgArea.h) / 2;

  image(HSimg, hsX, hsY, hsW, hsH);

  textFont(font);
  textSize(72 * scaleFactor);
  let titleX = 880 * scaleFactor;
  let titleY = 1190 * scaleFactor;
  let titleText = "HASTASHILP";

  let titleW = textWidth(titleText);
  let titleH = 72 * scaleFactor * 1.1;

  hsTitleArea = { x: titleX, y: titleY, w: titleW, h: titleH };

  if (
    mouseX >= titleX &&
    mouseX <= titleX + titleW &&
    mouseY >= titleY &&
    mouseY <= titleY + titleH
  ) {
    fill(234, 255, 151);
  } else {
    fill(248, 244, 236);
  }

  text(titleText, titleX, titleY);

  textSize(30 * scaleFactor);
  textFont(fontB);
  fill(248, 244, 236);
  text("Handicrafts of India (Card Game Design)", 880 * scaleFactor, 1250 * scaleFactor);

  textSize(21 * scaleFactor);
  text(
    "The project focuses on raising awareness about the many traditional crafts that surround us. According to Handmade in India (NID, 2005), India is home to nearly 516 distinct handicrafts, yet most of us can barely name even twenty.\n\nThis game is designed for young adults and above, using learning through play to spark curiosity and build cultural understanding. By engaging players, the game encourages a deeper appreciation of the diverse crafts of India and helps reconnect people with their own cultural heritage",
    880 * scaleFactor,
    1260 * scaleFactor,
    500 * scaleFactor,
    400 * scaleFactor
  );
}

function drawProject2() {
  hoshImgArea = {
    x: 650 * scaleFactor,
    y: 1480 * scaleFactor,
    w: 800 * scaleFactor,
    h: 900 * scaleFactor
  };

  let hoshHover =
    mouseX >= hoshImgArea.x &&
    mouseX <= hoshImgArea.x + hoshImgArea.w &&
    mouseY >= hoshImgArea.y &&
    mouseY <= hoshImgArea.y + hoshImgArea.h;

  let hoshScale = hoshHover ? 1.05 : 1;
  let hoshW = hoshImgArea.w * hoshScale;
  let hoshH = hoshImgArea.h * hoshScale;
  let hoshX = hoshImgArea.x - (hoshW - hoshImgArea.w) / 2;
  let hoshY = hoshImgArea.y - (hoshH - hoshImgArea.h) / 2;

  image(Hoshimg, hoshX, hoshY, hoshW, hoshH);

  textFont(font);
  textSize(72 * scaleFactor);

  let hTitleX = 180 * scaleFactor;
  let hTitleY = 1830 * scaleFactor;
  let hTitleText = "Angry God's Dilemma";

  let hTitleW = textWidth(hTitleText);
  let hTitleH = 72 * scaleFactor * 1.1;

  hoshTitleArea = {
    x: hTitleX,
    y: hTitleY,
    w: hTitleW,
    h: hTitleH
  };

  if (
    mouseX >= hTitleX &&
    mouseX <= hTitleX + hTitleW &&
    mouseY >= hTitleY &&
    mouseY <= hTitleY + hTitleH
  ) {
    fill(234, 255, 151);
  } else {
    fill(248, 244, 236);
  }

  text(hTitleText, hTitleX, hTitleY);

  textSize(30 * scaleFactor);
  textFont(fontB);
  fill(248, 244, 236);
  text("Tilism e- Hoshruba", 180 * scaleFactor, 1890 * scaleFactor);

  textSize(20 * scaleFactor);
  text(
    "This project adapts magical excerpts from Tilism-e-Hoshruba to explore how its fictional world reflects issues in our real one. Inspired by Amar Ayyar's Zambil trickery where he disguises himself to deceive others—the work draws parallels to how people today often hide their true identities to appear socially acceptable.\n\nThrough this reinterpretation, the project raises questions about gender stereotypes, individuality, self-view, and self-acceptance. By using the story's aesthetic, magic, and narrative twists, it aims to creatively highlight contemporary social crises and encourage readers to reflect on their own identities.",
    180 * scaleFactor,
    1910 * scaleFactor,
    500 * scaleFactor,
    400 * scaleFactor
  );
}

function drawProject3() {
  ddImgArea = {
    x: 0 * scaleFactor,
    y: 2260 * scaleFactor,
    w: 1060 * scaleFactor,
    h: 730 * scaleFactor
  };

  let ddHover =
    mouseX >= ddImgArea.x &&
    mouseX <= ddImgArea.x + ddImgArea.w &&
    mouseY >= ddImgArea.y &&
    mouseY <= ddImgArea.y + ddImgArea.h;

  let ddScale = ddHover ? 1.05 : 1;
  let ddW = ddImgArea.w * ddScale;
  let ddH = ddImgArea.h * ddScale;
  let ddX = ddImgArea.x - (ddW - ddImgArea.w) / 2;
  let ddY = ddImgArea.y - (ddH - ddImgArea.h) / 2;

  image(DDimg, ddX, ddY, ddW, ddH);

  textFont(font);
  textSize(72 * scaleFactor);
  let titleX = 880 * scaleFactor;
  let titleY = 2450 * scaleFactor;
  let titleText = "DAREDEVIL Brewing Co.";

  let titleW = textWidth(titleText);
  let titleH = 72 * scaleFactor * 1.1;

  ddTitleArea = { x: titleX, y: titleY, w: titleW, h: titleH };

  if (
    mouseX >= titleX &&
    mouseX <= titleX + titleW &&
    mouseY >= titleY &&
    mouseY <= titleY + titleH
  ) {
    fill(234, 255, 151);
  } else {
    fill(248, 244, 236);
  }

  text(titleText, titleX, titleY);

  textSize(30 * scaleFactor);
  textFont(fontB);
  fill(248, 244, 236);
  text("Branding Exploration", 880 * scaleFactor, 2510 * scaleFactor);

  textSize(21 * scaleFactor);
  text(
    "A creative exploration of beer branding through \n bold visual identity and packaging design. \n\n This project reimagines the Daredevil brand \n with a focus on striking aesthetics and \n memorable consumer experience.",
    880 * scaleFactor,
    2440 * scaleFactor,
    500 * scaleFactor,
    400 * scaleFactor
  );
}

function drawProject4() {
  ppImgArea = {
    x: 630 * scaleFactor,
    y: 2790 * scaleFactor,
    w: 920 * scaleFactor,
    h: 820 * scaleFactor
  };

  let ppHover =
    mouseX >= ppImgArea.x &&
    mouseX <= ppImgArea.x + ppImgArea.w &&
    mouseY >= ppImgArea.y &&
    mouseY <= ppImgArea.y + ppImgArea.h;

  let ppScale = ppHover ? 1.05 : 1;
  let ppW = ppImgArea.w * ppScale;
  let ppH = ppImgArea.h * ppScale;
  let ppX = ppImgArea.x - (ppW - ppImgArea.w) / 2;
  let ppY = ppImgArea.y - (ppH - ppImgArea.h) / 2;

  image(PPimg, ppX, ppY, ppW, ppH);

  textFont(font);
  textSize(72 * scaleFactor);
  let titleX = 180 * scaleFactor;
  let titleY = 3010 * scaleFactor;
  let titleText = "PRINT PRODUCTION";

  let titleW = textWidth(titleText);
  let titleH = 72 * scaleFactor * 1.1;

  ppTitleArea = { x: titleX, y: titleY, w: titleW, h: titleH };

  if (
    mouseX >= titleX &&
    mouseX <= titleX + titleW &&
    mouseY >= titleY &&
    mouseY <= titleY + titleH
  ) {
    fill(234, 255, 151);
  } else {
    fill(248, 244, 236);
  }

  text(titleText, titleX, titleY);

  textSize(30 * scaleFactor);
  textFont(fontB);
  fill(248, 244, 236);
  text("Print & Production Design", 180 * scaleFactor, 3070 * scaleFactor);

  textSize(20 * scaleFactor);
  text(
    "Exploring the intersection of digital design and physical production. This project showcases expertise in print design, production workflows, and bringing creative visions to life through tangible mediums. \n\n Print Production is a research-led publication documenting an on-ground study of print production in Bangalore. The project focuses on Sultan Pet and Cotton Pet—areas known for their dense network of print workshops and production units.\n\n The final output is a printed book combining written reflections, visual documentation, and physical print samples collected during the research.",
    180 * scaleFactor,
    3105 * scaleFactor,
    500 * scaleFactor,
    400 * scaleFactor
  );
}

function drawProject5() {
  MBimgArea = {
    x: 280 * scaleFactor,
    y: 3570 * scaleFactor,
    w: 500 * scaleFactor,
    h: 800 * scaleFactor,
  };

  let bbHover =
    mouseX >= MBimgArea.x &&
    mouseX <= MBimgArea.x + MBimgArea.w &&
    mouseY >= MBimgArea.y &&
    mouseY <= MBimgArea.y + MBimgArea.h;

  let bbScale = bbHover ? 1.05 : 1;
  let bbW = MBimgArea.w * bbScale;
  let bbH = MBimgArea.h * bbScale;
  let bbX = MBimgArea.x - (bbW - MBimgArea.w) / 2;
  let bbY = MBimgArea.y - (bbH - MBimgArea.h) / 2;

  image(MBimg, bbX, bbY, bbW, bbH);

  textFont(font);
  textSize(72 * scaleFactor);
  let titleX = 880 * scaleFactor;
  let titleY = 3680 * scaleFactor;
  let titleText = "Mercedes Bens R&D";

  let titleW = textWidth(titleText);
  let titleH = 72 * scaleFactor * 1.1;

  bbTitleArea = { x: titleX, y: titleY, w: titleW, h: titleH };

  if (
    mouseX >= titleX &&
    mouseX <= titleX + titleW &&
    mouseY >= titleY &&
    mouseY <= titleY + titleH
  ) {
    fill(234, 255, 151);
  } else {
    fill(248, 244, 236);
  }

  text(titleText, titleX, titleY);

  textSize(30 * scaleFactor);
  textFont(fontB);
  fill(248, 244, 236);
  text("Concept Presentation", 880 * scaleFactor, 3740 * scaleFactor);

  textSize(21 * scaleFactor);
  text(
    "This project reimagines the Mercedes-AMG Track Pace App through a product and interaction design lens, exploring how racing data can be experienced rather than simply viewed. The concept focuses on designing intuitive interactions that allow users to relive race highlights while capturing the emotional context behind each moment.\n\n By borrowing interaction patterns from reels, flash stories, and social feeds, the experience turns performance metrics into dynamic, shareable narratives enhancing engagement, emotional connection, and overall user experience.",
    880 * scaleFactor,
    3760 * scaleFactor,
    500 * scaleFactor,
    400 * scaleFactor
  );
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

function drawSkillWords() {
  // Calculate total width once
  if (totalWidth === 0) {
    textFont(font);
    textSize(SKILL_TEXT_SIZE);
    for (const word of skillWords) {
      totalWidth += word.w;
    }
  }

  // Draw white strip background
  push();
  fill(255);
  noStroke();
  let stripY = 920 * scaleFactor;
  let stripHeight = SKILL_TEXT_SIZE * 1;
  rect(0, stripY, width, stripHeight);
  pop();

  // Update scroll position
  scrollOffset -= scrollSpeed;
  if (scrollOffset <= -totalWidth) {
    scrollOffset = 0;
  }

  // Draw text with looping
textFont(font);
textAlign(LEFT, CENTER); 
textSize(SKILL_TEXT_SIZE);

let currentX = scrollOffset;

// Draw twice for seamless loop
for (let repeat = 0; repeat < 2; repeat++) {
  for (const word of skillWords) {
    const wordX = currentX + word.x + (repeat * totalWidth);
    const wordY = stripY + stripHeight / 2; // Centered vertically in strip
    
    // Only draw if visible on screen
    if (wordX + word.w > 0 && wordX < width) {
      fill(15); // Always dark color, no hover effect
      text(word.label, wordX, wordY);
      
      // Update word position for click detection
      word.displayX = wordX;
      word.displayY = wordY;
     }
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
  // GITHUB REPO LINK
  let githubX = 10 * scaleFactor;
  let githubY = 1027 * scaleFactor;
  let githubW = 1580 * scaleFactor;
  let githubH = 60 * scaleFactor;
  
  if (mouseX >= githubX &&
      mouseX <= githubX + githubW &&
      mouseY >= githubY &&
      mouseY <= githubY + githubH) {
    window.open('https://ajdesignb.github.io/AJ-Github/', '_blank');
    return;
  }

  // HASTASHILP
  if (
    mouseX >= hsImgArea.x &&
    mouseX <= hsImgArea.x + hsImgArea.w &&
    mouseY >= hsImgArea.y &&
    mouseY <= hsImgArea.y + hsImgArea.h
  ) {
    window.location.href = projectLink;
    return;
  }

  if (
    mouseX >= hsTitleArea.x &&
    mouseX <= hsTitleArea.x + hsTitleArea.w &&
    mouseY >= hsTitleArea.y &&
    mouseY <= hsTitleArea.y + hsTitleArea.h
  ) {
    window.location.href = projectLink;
    return;
  }

  // HOSHRUBA
  if (
    mouseX >= hoshImgArea.x &&
    mouseX <= hoshImgArea.x + hoshImgArea.w &&
    mouseY >= hoshImgArea.y &&
    mouseY <= hoshImgArea.y + hoshImgArea.h
  ) {
    window.location.href = hoshLink;
    return;
  }

  if (
    mouseX >= hoshTitleArea.x &&
    mouseX <= hoshTitleArea.x + hoshTitleArea.w &&
    mouseY >= hoshTitleArea.y &&
    mouseY <= hoshTitleArea.y + hoshTitleArea.h
  ) {
    window.location.href = hoshLink;
    return;
  }

  // DAREDEVIL
  if (
    mouseX >= ddImgArea.x &&
    mouseX <= ddImgArea.x + ddImgArea.w &&
    mouseY >= ddImgArea.y &&
    mouseY <= ddImgArea.y + ddImgArea.h
  ) {
    window.location.href = daredevilLink;
    return;
  }

  if (
    mouseX >= ddTitleArea.x &&
    mouseX <= ddTitleArea.x + ddTitleArea.w &&
    mouseY >= ddTitleArea.y &&
    mouseY <= ddTitleArea.y + ddTitleArea.h
  ) {
    window.location.href = daredevilLink;
    return;
  }

  // PRINT PRODUCTION
  if (
    mouseX >= ppImgArea.x &&
    mouseX <= ppImgArea.x + ppImgArea.w &&
    mouseY >= ppImgArea.y &&
    mouseY <= ppImgArea.y + ppImgArea.h
  ) {
    window.location.href = printLink;
    return;
  }

  if (
    mouseX >= ppTitleArea.x &&
    mouseX <= ppTitleArea.x + ppTitleArea.w &&
    mouseY >= ppTitleArea.y &&
    mouseY <= ppTitleArea.y + ppTitleArea.h
  ) {
    window.location.href = printLink;
    return;
  }

  // Mercedes Bens
  if (
    mouseX >= MBimgArea.x &&
    mouseX <= MBimgArea.x + MBimgArea.w &&
    mouseY >= MBimgArea.y &&
    mouseY <= MBimgArea.y + MBimgArea.h
  ) {
    window.location.href = "mercedesbens.html";
    return;
  }

  if (
    mouseX >= bbTitleArea.x &&
    mouseX <= bbTitleArea.x + bbTitleArea.w &&
    mouseY >= bbTitleArea.y &&
    mouseY <= bbTitleArea.y + bbTitleArea.h
  ) {
    window.location.href = "mercedesbens.html";
    return;
  }

  // SKILL WORDS
  for (const word of skillWords) {
    if (word.link && word.displayX !== undefined &&
        mouseX >= word.displayX &&
        mouseX <= word.displayX + word.w &&
        mouseY >= word.displayY &&
        mouseY <= word.displayY + word.h) {
      window.location.href = word.link;
      return;
    }
  }

  // Check if clicking LinkedIn icon
  if (mouseX >= 1200 * scaleFactor && 
      mouseX <= 1200 * scaleFactor + 60 * scaleFactor &&
      mouseY >= 1045 * scaleFactor && 
      mouseY <= 1045 * scaleFactor + 60 * scaleFactor) {
    window.open('https://www.linkedin.com/in/aashi-jain29/', '_blank');
    return;
  }
  
  // Check if clicking on Instagram icon
  if (mouseX >= 1340 * scaleFactor && 
      mouseX <= 1340 * scaleFactor + 65 * scaleFactor &&
      mouseY >= 1044 * scaleFactor && 
      mouseY <= 1044 * scaleFactor + 65 * scaleFactor) {
    window.open('https://www.instagram.com/aashij__', '_blank');
    return;
  }

  // Check if clicking on menu panel icons
  if (menuActive && window.menuIcons) {
    for (let icon of window.menuIcons) {
      if (mouseX >= icon.x &&
          mouseX <= icon.x + icon.w &&
          mouseY >= icon.y &&
          mouseY <= icon.y + icon.h) {
        if (icon.link.startsWith('mailto:')) {
          window.location.href = icon.link;
        } else {
          window.open(icon.link, '_blank');
        }
        return;
      }
    }
  }

  // MENU ITEM CLICKS
  if (menuActive && window.menuItems) {
    for (let item of window.menuItems) {
      if (item.link && item.bounds &&
          mouseX >= item.bounds.x &&
          mouseX <= item.bounds.x + item.bounds.w &&
          mouseY >= item.bounds.y &&
          mouseY <= item.bounds.y + item.bounds.h) {
        window.location.href = item.link;
        return;
      }
    }
  }
}