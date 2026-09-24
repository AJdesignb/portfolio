let font;
let fontB;
let BCimg;
let BCimgA;
let BCimgB;
let BCimgC;
let BCimgD;
let BCimgE;
let BCimgF;
let BCimgG;
let BCimgH;
let BCimgI;
let BCimgJ;
let BCimgK;
let stars = [];
const STAR_COUNT = 600;
let scaleFactor = 1;
let canvasWidth = 1600;
let canvasHeight = 12500;
let email;
let LinkdIn;
let GitHb;
let Insta;
let emailB;

function preload() {
  font = loadFont("Rosean.ttf");
  fontB = loadFont("Coolvetica Rg.otf");
  BCimg = loadImage("BCimg.png");
  BCimgA = loadImage("BCimgA.png");
  BCimgB = loadImage("BCimgB.png");
  BCimgC = loadImage("BCimgC.png");
  BCimgD = loadImage("BCimgD.png");
  BCimgE = loadImage("BCimgE.png");
  BCimgF = loadImage("BCimgF.png");
  BCimgG = loadImage("BCimgG.png");
  BCimgH = loadImage("BCimgH.png");
  BCimgI = loadImage("BCimgI.png");
  BCimgJ = loadImage("BCimgJ.png");
  BCimgK = loadImage("BCimgK.png");
 
  
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
  const baseHeight = 12500;

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
  text("BALANCING CONNECTIONS", 100 * scaleFactor, 100 * scaleFactor);

  // Subtitle
  textFont(fontB);
  textSize(40 * scaleFactor);
  fill(248, 244, 236, 200);
  text("Designing Playful Interactions", 100 * scaleFactor, 220 * scaleFactor);

  textSize(25 * scaleFactor);
  fill(234, 255, 151);
  text("Interaction Design | Research | User Testing", 100 * scaleFactor, 300 * scaleFactor);
  text("Human-Centered Social Intervention", 100 * scaleFactor, 330 * scaleFactor);

  // Cover Image
  if (BCimg) {
    let imgX = 0 * scaleFactor;
    let imgY = 250 * scaleFactor;
    let imgW = 1600 * scaleFactor;
    let imgH = 1100 * scaleFactor;
    image(BCimg, imgX, imgY, imgW, imgH);
  }
  
  // Body Text
  textSize(25 * scaleFactor);
  fill(248, 244, 236);
  text(
    "This project applies human-centered design principles to address social isolation among international students in campus quads. Research uncovered a disconnect between shared space and shared experience, where newcomers lacked accessible entry points into existing social ecosystems.Discover the design process behind an intervention that integrates spatial systems and intentional interaction cues to foster low-pressure engagement and organic peer connection.",
    60 * scaleFactor,
    1350 * scaleFactor,
    1400 * scaleFactor,
    1200 * scaleFactor
  );

  //Img 2
  image(
    BCimgA,
    0 * scaleFactor,
    1530 * scaleFactor, 
    1600 * scaleFactor, 
    1000 * scaleFactor
  );

  //Img 3
  image(
    BCimgB,
    0 * scaleFactor,
    2530 * scaleFactor, 
    1600 * scaleFactor, 
    1000 * scaleFactor
  );

  //Img 4
  image(
    BCimgC,
    0 * scaleFactor,
    3420 * scaleFactor, 
    1600 * scaleFactor, 
    1000 * scaleFactor
  );

  //Img 5
  image(
    BCimgD,
    0 * scaleFactor,
    4420 * scaleFactor, 
    1600 * scaleFactor, 
    1000 * scaleFactor
  );

  //Img 6
  image(
    BCimgE,
    0 * scaleFactor,
    5420 * scaleFactor, 
    1600 * scaleFactor, 
    1000 * scaleFactor
  );

  //Img 7
  image(
    BCimgF,
    0 * scaleFactor,
    6420 * scaleFactor, 
    1600 * scaleFactor, 
    1000 * scaleFactor
  );

  //Img 8
  image(
    BCimgG,
    0 * scaleFactor,
    7420 * scaleFactor, 
    1600 * scaleFactor, 
    1000 * scaleFactor
  );

  //Img 9
  image(
    BCimgH,
    0 * scaleFactor,
    8420 * scaleFactor, 
    1600 * scaleFactor, 
    1000 * scaleFactor
  );

  //Img 10
  image(
    BCimgI,
    0 * scaleFactor,
    9420 * scaleFactor, 
    1600 * scaleFactor, 
    1000 * scaleFactor
  );

  //Img 11
  image(
    BCimgJ,
    0 * scaleFactor,
    10420 * scaleFactor, 
    1600 * scaleFactor, 
    1000 * scaleFactor
  );

  //Img 12
  image(
    BCimgK,
    0 * scaleFactor,
    11420 * scaleFactor, 
    1600 * scaleFactor, 
    1000 * scaleFactor
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

