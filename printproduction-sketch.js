
let font;
let fontB;

let stars = [];
const STAR_COUNT = 600;

let scaleFactor = 1;
let canvasWidth = 1600;
let canvasHeight = 4100;
let PPimg;
let PPimgB;
let PPimgC;
let PPimgD;
let PPimgE;
let PPimgF;
let PPimgG;
let PPimgH;
let PPimgI;
let PPimgJ;
let PPimgK;
let PPimgL;
let PPimgM;
let PPimgN;
let PPimgO;

let emailB;
let LinkdIn;
let GitHb;
let Insta;

function preload() {
  font = loadFont("Rosean.ttf");
  fontB = loadFont("Coolvetica Rg.otf");
  // Add your Print Production images here
  PPimg = loadImage("PPimgA.png");
  PPimgB = loadImage("PPimgB.jpg");
  PPimgC = loadImage("PPimgC.jpg");
  PPimgD = loadImage("PPimgD.jpg");
  PPimgE = loadImage("PPimgE.jpg");
  PPimgF = loadImage("PPimgF.jpg");
  PPimgG = loadImage("PPimgG.jpg");
  PPimgH = loadImage("PPimgH.jpg");
  PPimgI = loadImage("PPimgI.jpg");
  PPimgJ = loadImage("PPimgJ.jpg");
  PPimgK = loadImage("PPimgK.jpg");
  PPimgL = loadImage("PPimgL.jpg");
  PPimgM = loadImage("PPimgM.jpg");
  PPimgN = loadImage("PPimgN.jpg");
  PPimgO = loadImage("PPimgO.jpg");
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
  const baseHeight = 4100;
  
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
  text("PRINT", 50 * scaleFactor, 100 * scaleFactor);
  text("PRODUCTION", 50 * scaleFactor, 200 * scaleFactor);

  // Subtitle
  textFont(fontB);
  textSize(40 * scaleFactor);
  fill(248, 244, 236, 200);
  text("Print & Production Design", 50 * scaleFactor, 340 * scaleFactor);

  textSize(25 * scaleFactor);
  fill(234, 255, 151);
  text("Print Design | Production | Curation | Research", 50 * scaleFactor, 420 * scaleFactor);
  text("3 Weeks | Bangalore", 50 * scaleFactor, 450 * scaleFactor);

  // Add your cover image here
  if (PPimg) {
    let imgX = 680 * scaleFactor;
    let imgY = 60 * scaleFactor;
    let imgW = 1100 * scaleFactor;
    let imgH = 1000 * scaleFactor;
    image(PPimg, imgX, imgY, imgW, imgH);
  }
  
  // Body Text
  textSize(25 * scaleFactor);
  fill(248, 244, 236);
  text(
    "Print Production is a research-led publication documenting an \n on-ground study of print production in Bangalore. The project focuses \n on Sultan Pet & Cotton Pet areas known for their dense network of \n print workshops & production units.\n\n The project involved field research & direct observation of multiple \n printing techniques, including rotary press, inkjet, offset, screen, & laser \n printing. Engaging with these processes firsthand offered insight into \n materials, machinery, & real-world production workflows.\n\n The final output is a printed book combining written reflections, visual \n documentation, & physical print samples collected during the research. \n Designed in Adobe InDesign, the publication was printed & manually \n assembled, with original samples integrated into the final copy resulting \n in a tactile archive of traditional & contemporary print practices..",
    50 * scaleFactor,
    520 * scaleFactor,
    1400 * scaleFactor,
    1200 * scaleFactor
  );
  
  //Img C
  image(
    PPimgC,
    0 * scaleFactor,
    1800 * scaleFactor, 
    1600 * scaleFactor, 
    1050 * scaleFactor
  );
  
  //Img B
  image(
    PPimgB,
    0 * scaleFactor,
    1050 * scaleFactor, 
    1600 * scaleFactor, 
    1050 * scaleFactor
  );
  
  //Gallery grid 1
  image(
    PPimgD,
    10 * scaleFactor,
    2860 * scaleFactor, 
    388 * scaleFactor, 
    388 * scaleFactor
  );
  
  //Gallery grid 2
  image(
    PPimgE,
    408 * scaleFactor,
    2860 * scaleFactor, 
    388 * scaleFactor, 
    388 * scaleFactor
  );

  //Gallery grid 3
  image(
    PPimgF,
    806 * scaleFactor,
    2860 * scaleFactor, 
    388 * scaleFactor, 
    388 * scaleFactor
  );

  //Gallery grid 4
  image(
    PPimgG,
    1204 * scaleFactor,
    2860 * scaleFactor, 
    388 * scaleFactor, 
    388 * scaleFactor
  );

  //Gallery grid 5
  image(
    PPimgH,
    10 * scaleFactor,
    3259 * scaleFactor, 
    388 * scaleFactor, 
    388 * scaleFactor
  );

  //Gallery grid 6
  image(
    PPimgI,
    408 * scaleFactor,
    3259 * scaleFactor, 
    388 * scaleFactor, 
    388 * scaleFactor
  );

  //Gallery grid 7
  image(
    PPimgJ,
    806 * scaleFactor,
    3259 * scaleFactor, 
    388 * scaleFactor, 
    388 * scaleFactor
  );

  //Gallery grid 8
  image(
    PPimgK,
    1204 * scaleFactor,
    3259 * scaleFactor, 
    388 * scaleFactor, 
    388 * scaleFactor
  );

  //Gallery grid 9
  image(
    PPimgL,
    10 * scaleFactor,
    3658 * scaleFactor, 
    388 * scaleFactor, 
    388 * scaleFactor
  );

  //Gallery grid 10
  image(
    PPimgM,
    408 * scaleFactor,
    3658 * scaleFactor, 
    388 * scaleFactor, 
    388 * scaleFactor
  );

  //Gallery grid 11
  image(
    PPimgN,
    806 * scaleFactor,
    3658 * scaleFactor, 
    388 * scaleFactor, 
    388 * scaleFactor
  );

  //Gallery grid 12
  image(
    PPimgO,
    1204 * scaleFactor,
    3658 * scaleFactor, 
    388 * scaleFactor, 
    388 * scaleFactor
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

