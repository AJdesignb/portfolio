let menuActive = false;
let animRadius = 0;
let targetRadius = 0;
let maxRadius;

let font;
let fontB;

let stars = [];
const STAR_COUNT = 600;

let scaleFactor = 1;
let canvasWidth = 1600;
let canvasHeight = 6000;

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
let HoshGalA; //Gallery Image 1
let HoshGalB; //Gallery Image 2

let emailB;
let LinkdIn;
let GitHb;
let Insta;

function preload() {
  font = loadFont("Rosean.ttf");
  fontB = loadFont("Coolvetica Rg.otf");
  Hoshimg = loadImage("Hoshimg.png");
  HoshimgB = loadImage("HoshimgB.jpg");
  HoshimgC = loadImage("HoshimgC.png");
  HoshimgD = loadImage("HoshimgD.jpg");
  HoshimgE = loadImage("HoshimgE.jpg");
  HoshimgF = loadImage("HoshimgF.jpg");
  HoshimgG = loadImage("HoshimgG.jpg");
  HoshimgH = loadImage("HoshimgH.jpg");
  HoshimgI = loadImage("HoshimgI.jpg");
  HoshimgJ = loadImage("HoshimgJ.jpg");
  HoshimgK = loadImage("HoshimgK.jpg");
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
  const baseHeight = 6000;
  
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
  text("ANGRY GOD'S", 50 * scaleFactor, 100 * scaleFactor);
  text("DILEMMA ~ A Lament", 50 * scaleFactor, 200 * scaleFactor);

  // Subtitle
  textFont(fontB);
  textSize(40 * scaleFactor);
  fill(248, 244, 236, 200);
  text("Inspired by Tilism e-Hoshruba", 50 * scaleFactor, 320 * scaleFactor);

  textSize(25 * scaleFactor);
  fill(234, 255, 151);
  text("Storytelling | Illustration | Typography", 50 * scaleFactor, 400 * scaleFactor);
  text("8 Weeks | Bangalore, India", 50 * scaleFactor, 430 * scaleFactor);
  
  // 2nd image (here because we wanted an overlap)
  image(
   HoshimgB, 
   0 * scaleFactor, 
   980 * scaleFactor, 
   1600 * scaleFactor, 
   1100 * scaleFactor);

  // Cover Image 
  if (Hoshimg) {
    let imgX = 690 * scaleFactor;
    let imgY = 0 * scaleFactor;
    let imgW = 900 * scaleFactor;
    let imgH = 1100 * scaleFactor;

    image(Hoshimg, imgX, imgY, imgW, imgH);
  }

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
  textSize( 60 * scaleFactor);
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
  
  //project renders
  image(
    HoshimgC, 
    0 * scaleFactor, 
    2885 * scaleFactor, 
    1600 * scaleFactor, 
    850 * scaleFactor
  );
  
  image(
    HoshimgF, 
    0 * scaleFactor, 
    3785 * scaleFactor, 
    800 * scaleFactor, 
    610 * scaleFactor
  );
  
  image(
    HoshimgG, 
    800 * scaleFactor, 
    3785 * scaleFactor, 
    800 * scaleFactor, 
    610 * scaleFactor
  );
  
  //Process sketches...
  // image(HoshimgH, 0, 4450, 800, 600);
  // image(HoshimgI, 800, 4450, 800, 600);

  textFont(font);
  textSize( 120 * scaleFactor);
  fill(248, 244, 236);
  // textAlign(LEFT, TOP);
  text("Illustrated Excerpts", 50 * scaleFactor, 4450 * scaleFactor);
  text("from the Poem...", 500 * scaleFactor, 4550 * scaleFactor);  

  //ecxrpt 1
  image(
    HoshimgJ, 
    0 * scaleFactor, 
    4700 * scaleFactor, 
    800 * scaleFactor, 
    610 * scaleFactor
  );
  
  //ecxrpt 2
  image(
    HoshimgD, 
    800 * scaleFactor, 
    4700 * scaleFactor, 
    800 * scaleFactor, 
    610 * scaleFactor
  );
  
  //ecxrpt 3
  image(
    HoshimgE, 
    0 * scaleFactor, 
    5310 * scaleFactor, 
    800 * scaleFactor, 
    610 * scaleFactor
  );
  
  //ecxrpt 4
  image(
    HoshimgK, 
    800 * scaleFactor, 
    5310 * scaleFactor, 
    800 * scaleFactor, 
    610 * scaleFactor
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