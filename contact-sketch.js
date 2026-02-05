let font;
let fontB;
let Starimg;

let DwnldB;
let email;
let emailB;
let lcshn;

let Insta;
let LinkdIn;
let GitHb;

let illus;

let menuActive = false;
let animRadius = 0;
let targetRadius = 0;
let maxRadius = 0;

let stars = [];
const STAR_COUNT = 600;

let scaleFactor = 1;
let canvasWidth = 1600;
let canvasHeight = 1200;

function preload() {
  font = loadFont("Rosean.ttf");
  fontB = loadFont("Coolvetica Rg.otf");
  Starimg = loadImage("Star.png");
  DwnldB = loadImage("Dwnld.gif");
  email = loadImage("email.png");
  emailB = loadImage("emailB.png");
  lcshn = loadImage("Lcshn.png");
  LinkdIn = loadImage("Linkdin.png");
  GitHb = loadImage("GhubL.png");
  Insta = loadImage("Insta.png");
  illus = loadImage("ContactPIllus.png");
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
      size: random(1, 3) * scaleFactor,
      speed: random(0.05, 0.2)
    });
  }

}

function calculateCanvasSize() {
  const baseWidth = 1600;
  const baseHeight = 1200;
  
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
  text("Hello! I am Aashi", 150 * scaleFactor, 100 * scaleFactor);

  // body
  textFont(fontB);
  textSize(35 * scaleFactor);
  fill(234, 255, 151);
  text(
    "I’m a graphic designer & visual strategist with 4+ years of experience \n collaborating with global brands including Amazon and Anheuser-Busch InBev. \n With a foundation in Visual Communications and Strategic Branding,\n I design clear, purposeful solutions that sit at the intersection of \n creativity, strategy, and user experience. \n\n I’m currently pursuing a Master’s in Interaction Design & Interactive Art \n at California State University, East Bay, where I’m expanding my practice \n into product-focused digital experiences, user-centered design, interactive \n storytelling, & AI-driven creative workflows. I’m especially interested \n in how emerging technologies can enhance storytelling, usability,\n and impact at scale.\n\n My approach combines strong visual systems, thoughtful storytelling, \n & experimentation across digital platforms to build work that feels \n both intuitive and impactful.",
    50 * scaleFactor,
    250 * scaleFactor,
    1400 * scaleFactor,
    1200 * scaleFactor
  );
  
  image(
    illus, 
    600 * scaleFactor,
    50 * scaleFactor,
    1000 * scaleFactor,
    1000 * scaleFactor
  );

  //Resume Button
  rect(
    1273 * scaleFactor, 
    0 * scaleFactor, 
    200 * scaleFactor, 
    250 * scaleFactor, 
    0 * scaleFactor,
    0 * scaleFactor,
    50 * scaleFactor,
    50 * scaleFactor
  );
  
  image(
    DwnldB, 
    1325 * scaleFactor,
    80 * scaleFactor,
    100 * scaleFactor,
    100 * scaleFactor
  );

  textFont(font);
  textSize(50 * scaleFactor);
  fill(15, 15, 16);
  text(
    "Resume",
    1300 * scaleFactor,
    170 * scaleFactor,
    1400 * scaleFactor,
    1200 * scaleFactor
  );
  
  //Contact
  image(
    email, 
    50 * scaleFactor,
    1000 * scaleFactor,
    50 * scaleFactor,
    50 * scaleFactor
  );

  textFont(fontB);
  textSize(36 * scaleFactor);
  fill(248, 244, 236);
  text(
    "ajain42@horizon.csueastbay.edu",
    130 * scaleFactor,
    1000 * scaleFactor,
    1400 * scaleFactor,
    1200 * scaleFactor
  );

  image(
    lcshn, 
    57 * scaleFactor,
    1060 * scaleFactor,
    35 * scaleFactor,
    50 * scaleFactor
  );

  textFont(fontB);
  textSize(36 * scaleFactor);
  fill(248, 244, 236);
  text(
    "Sunnyvale, California, USA",
    130 * scaleFactor,
    1060 * scaleFactor,
    1400 * scaleFactor,
    1200 * scaleFactor
  );
  
  //Socials
  image(
    LinkdIn, 
    1200 * scaleFactor,
    1045 * scaleFactor,
    60 * scaleFactor,
    60 * scaleFactor
  );

  image(
    GitHb, 
    1270 * scaleFactor,
    1040 * scaleFactor,
    60 * scaleFactor,
    60 * scaleFactor
  );
  
  image(
    Insta, 
    1340 * scaleFactor,
    1044 * scaleFactor,
    65 * scaleFactor,
    65 * scaleFactor
  );

  // Decorative stars
  image(Starimg, 20 * scaleFactor, 90 * scaleFactor, 120 * scaleFactor, 120 * scaleFactor);
  image(Starimg, 1000* scaleFactor, 90 * scaleFactor, 120 * scaleFactor, 120 * scaleFactor);

  //cursor management
  let isHovering = false;

  // Check Resume Download GIF hover
  if (mouseX >= 1325 * scaleFactor && 
      mouseX <= 1325 * scaleFactor + 100 * scaleFactor &&
      mouseY >= 80 * scaleFactor && 
      mouseY <= 80 * scaleFactor + 100 * scaleFactor) {
    isHovering = true;
  }
  
  // Check Resume text hover
  textFont(font);
  textSize(50 * scaleFactor);
  let resumeTextWidth = textWidth("Resume");
  if (mouseX >= 1300 * scaleFactor && 
      mouseX <= 1300 * scaleFactor + resumeTextWidth &&
      mouseY >= 170 * scaleFactor && 
      mouseY <= 170 * scaleFactor + 50 * scaleFactor) {
    isHovering = true;
  }

  // Check LinkedIn icon hover
  if (mouseX >= 1200 * scaleFactor && 
      mouseX <= 1200 * scaleFactor + 60 * scaleFactor &&
      mouseY >= 1045 * scaleFactor && 
      mouseY <= 1045 * scaleFactor + 60 * scaleFactor) {
    isHovering = true;
  }
  
  // Check GitHub icon hover
  if (mouseX >= 1270 * scaleFactor && 
      mouseX <= 1270 * scaleFactor + 60 * scaleFactor &&
      mouseY >= 1040 * scaleFactor && 
      mouseY <= 1040 * scaleFactor + 60 * scaleFactor) {
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

   // Check if clicking on Resume Download GIF
  if (mouseX >= 1325 * scaleFactor && 
      mouseX <= 1325 * scaleFactor + 100 * scaleFactor &&
      mouseY >= 80 * scaleFactor && 
      mouseY <= 80 * scaleFactor + 100 * scaleFactor) {
    let link = document.createElement('a');
    link.href = 'AashiJain_Resume.pdf';
    link.download = 'AashiJain_Resume.pdf';
    link.click();
    return;
  }
  
  // Check if clicking on "Resume" text
  textFont(font);
  textSize(50 * scaleFactor);
  let resumeTextWidth = textWidth("Resume");
  if (mouseX >= 1300 * scaleFactor && 
      mouseX <= 1300 * scaleFactor + resumeTextWidth &&
      mouseY >= 170 * scaleFactor && 
      mouseY <= 170 * scaleFactor + 50 * scaleFactor) {
    let link = document.createElement('a');
    link.href = 'AashiJain_Resume.pdf';
    link.download = 'AashiJain_Resume.pdf';
    link.click();
    return;
  }

 //check if clicking linkedIn icon
  if (mouseX >= 1200 * scaleFactor && 
      mouseX <= 1200 * scaleFactor + 60 * scaleFactor &&
      mouseY >= 1045 * scaleFactor && 
      mouseY <= 1045 * scaleFactor + 60 * scaleFactor) {
    window.open('https://www.linkedin.com/in/aashi-jain29/', '_blank');
  }

  // Check if clicking on GitHub icon
  if (mouseX >= 1270 * scaleFactor && 
      mouseX <= 1270 * scaleFactor + 60 * scaleFactor &&
      mouseY >= 1040 * scaleFactor && 
      mouseY <= 1040 * scaleFactor + 60 * scaleFactor) {
    window.open('https://ajdesignb.github.io/AJ-Github/', '_blank');
    return;
  }
  
  // Check if clicking on Instagram icon
  if (mouseX >= 1340 * scaleFactor && 
      mouseX <= 1340 * scaleFactor + 65 * scaleFactor &&
      mouseY >= 1044 * scaleFactor && 
      mouseY <= 1044 * scaleFactor + 65 * scaleFactor) {
    window.open('https://www.instagram.com/aashij__', '_blank');
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
