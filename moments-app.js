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

