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

  // Set cursor based on hover state
  if (isHovering) {
    cursor(HAND);
  } else {
    cursor(ARROW);
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
}
