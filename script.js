const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// canvas.width = 1280;
// canvas.height = 720;
// console.log(canvas.width);
// console.log(canvas.height);

// Canvas Rescaling
if (window.innerWidth <= 1300) {
  canvas.height = (9 * canvas.width / 16);
}
if (window.innerWidth >= 1350) {
  canvas.width = 1350;
  canvas.height = (9 * 1350 / 16);
}

// function resizeCanvas() {
//   canvas.style.width = window.innerWidth + "px";
//   canvas.style.height = window.innerHeight + "px";
//   const scale = window.devicePixelRatio;
//   canvas.width = window.innerWidth * scale;
//   canvas.height = window.innerHeight * scale;
//   ctx.scale(scale, scale);
// }
// resizeCanvas();
// window.addEventListener("resize", resizeCanvas);

//canvas commands  https://www.w3schools.com/tags/ref_canvas.asp



// ___________________ Actual Game Code ____________________


// ------------------------ Objects ------------------------

// Main Player Ball

const ball = {
  position: {
    x: 100,
    y: canvas.height - 200
  },
  radius: 20,
  speed: 10
};

// Cannon Balls

const cannonball = {
  a: {
    x: 220,
    y: canvas.height - 370,
    radius: 10
  },
  b: {
    x: 220,
    y: canvas.height - 320,
    radius: 10
  },
  c: {
    x: canvas.width - 220,
    y: canvas.height - 370,
    radius: 10
  },
  d: {
    x: canvas.width - 220,
    y: canvas.height - 320,
    radius: 10
  },
  speed: 8
};

// Moving Spikes

const movingspike = {
  a: {
    top: canvas.height - 190,
    bottom: canvas.height - 160,
  },
  b: {
    top: canvas.height - 190,
    bottom: canvas.height - 160,
  },
  c: {
    top: canvas.height - 290,
    bottom: canvas.height - 260,
  },
  speed: 6
};

// Doorway

const door = {
  top: canvas.height - 610,
  bottom: 110,
  speed: 2
};

// --------------------- Variables -------------------------

// Boolean Variables
let shouldJump = true
let detect = true
let interact = false
let left = false
let right = false
let up = false
let down = false
let gravity = true
let jump = false
let detectEnd = false
let end = false

// Counter Variables
let count = 0
let shouldJumpCount = 0
let jumpCount = 0
let laserCount = 0
let cannonCount = 0
let cannonSpeedCount = 0
let spikeCount = 0
let doorCount = 0
let deathCount = 0

// Timer
let msCount = 0
let secondCount = 0
let minuteCount = 0


// ----------------------- Function ---------------------------


function cycle() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "SkyBlue";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // ---------------------- Canvas Text --------------------------

  // Keys
  ctx.strokeStyle = "Black";
  ctx.beginPath();
  ctx.moveTo(10, 100);
  ctx.lineTo(10, 20);
  ctx.lineTo(380, 20);
  ctx.lineTo(380, 100);
  ctx.closePath();
  ctx.stroke();
  ctx.font = "Bold 20px Arial";
  ctx.fillStyle = "Black";
  ctx.textAlign = "left";
  ctx.fillText("A / ⇦: Left", 20, 50);
  ctx.fillText("D / ⇨: Right", 20, 80);
  ctx.fillText("W / Space: Jump", 200, 50);
  ctx.fillText("E: Interact", 200, 80);

  // Death Count
  ctx.strokeStyle = "Black";
  ctx.beginPath();
  ctx.moveTo(canvas.width - 10, 70);
  ctx.lineTo(canvas.width - 10, 20);
  ctx.lineTo(canvas.width - 350, 20);
  ctx.lineTo(canvas.width - 350, 70);
  ctx.closePath();
  ctx.stroke();
  ctx.font = "Bold 20px Arial";
  ctx.fillStyle = "Red";
  ctx.textAlign = "right";
  ctx.fillText("Death Count: " + deathCount, canvas.width - 200, 50);

  // Speedrun Timer
  msCount++;
  if (msCount > 99) {
    secondCount += 1;
    msCount = 0;
  }
  if (secondCount > 59) {
    minuteCount += 1;
    secondCount = 0;
  }
  let timer = minuteCount + ":" + secondCount + "." + msCount
  ctx.font = "Bold 20px Arial";
  ctx.fillStyle = "Green";
  ctx.textAlign = "left";
  ctx.fillText("Time: " + timer, canvas.width - 160, 50);

  //---------------------- General Stuff ------------------------

  // Speed Rates

  // General Speeds
  if (right) ball.position.x += ball.speed
  if (left) ball.position.x -= ball.speed
  // if (up) ball.position.y -= 15
  // if (down) ball.position.y += 15
  if (jump) ball.position.y -= 30
  if (gravity) ball.position.y += 10
  // Door Speed
  if (doorCount > 0 && doorCount <= 50) door.bottom -= door.speed
  if (doorCount > 310) door.bottom += door.speed
  // Cannon Speeds
  if (cannonCount) cannonball.a.x += cannonball.speed
  if (cannonCount) cannonball.b.x += cannonball.speed
  if (cannonCount) cannonball.c.x -= cannonball.speed
  if (cannonCount) cannonball.d.x -= cannonball.speed
  // Moving Spikes Speeds
  if (spikeCount > 10 && spikeCount <= 20) movingspike.a.top += movingspike.speed
  if (spikeCount > 10 && spikeCount <= 20) movingspike.a.bottom += movingspike.speed
  if (spikeCount > 10 && spikeCount <= 20) movingspike.b.top += movingspike.speed
  if (spikeCount > 10 && spikeCount <= 20) movingspike.b.bottom += movingspike.speed
  if (spikeCount > 10 && spikeCount <= 20) movingspike.c.top += movingspike.speed
  if (spikeCount > 10 && spikeCount <= 20) movingspike.c.bottom += movingspike.speed
  if (spikeCount > 20) movingspike.a.top -= movingspike.speed
  if (spikeCount > 20) movingspike.a.bottom -= movingspike.speed
  if (spikeCount > 20) movingspike.b.top -= movingspike.speed
  if (spikeCount > 20) movingspike.b.bottom -= movingspike.speed
  if (spikeCount > 20) movingspike.c.top -= movingspike.speed
  if (spikeCount > 20) movingspike.c.bottom -= movingspike.speed

  // Ball Drawing
  ctx.fillStyle = "Blue";
  ctx.beginPath();
  ctx.arc(ball.position.x, ball.position.y, ball.radius, 0, Math.PI * 2);
  ctx.fill();

  // Window Edges
  if (ball.position.x > 0
    && ball.position.x < 20) {
    ball.position.x = 20;
  }
  if (ball.position.x < canvas.width - 0
    && ball.position.x > canvas.width - 20) {
    ball.position.x = canvas.width - 20;
  }
  if (ball.position.y < 40) {
    ball.position.y = 40;
  }

  //---------------------- Jump Stuff ---------------------------

  if (jump === true) {
    jumpCount++;
  }
  if (jumpCount > 6) {
    jump = false;
    jumpCount = 0;
  }

  if (
    // Ground
    ((ball.position.y >= canvas.height - 130
      && ball.position.y <= canvas.height - 110))
    // Lower Platforms
    || ((ball.position.y >= canvas.height - 220
      && ball.position.y <= canvas.height - 200)
      && ((ball.position.x >= 0
        && ball.position.x <= 80)
        || (ball.position.x >= 390
          && ball.position.x <= 400)
        || (ball.position.x >= canvas.width - 400
          && ball.position.x <= canvas.width - 110)))
    // Middle Platforms
    || ((ball.position.y >= canvas.height - 320
      && ball.position.y <= canvas.height - 300)
      && ((ball.position.x >= 120
        && ball.position.x <= 200)
        || (ball.position.x >= 390
          && ball.position.x <= canvas.width - 390)
        || (ball.position.x >= canvas.width - 300
          && ball.position.x <= canvas.width)))
    //Upper Platforms
    || ((ball.position.y >= canvas.height - 420
      && ball.position.y <= canvas.height - 400)
      && ((ball.position.x >= 0
        && ball.position.x <= 80)
        || (ball.position.x >= 200
          && ball.position.x <= 510)
        || (ball.position.x >= canvas.width - 510
          && ball.position.x <= canvas.width - 200)
        || (ball.position.x >= canvas.width - 80
          && ball.position.x <= canvas.width)))
    // Top Platforms
    || ((ball.position.y >= canvas.height - 520
      && ball.position.y <= canvas.height - 500)
      && (ball.position.x >= 400
        && ball.position.x <= canvas.width - 400))
  ) {
    shouldJump = true;
  } else {
    shouldJump = false;
  }

  //----------------------- Platforms --------------------------

  // Ground Level

  // Drawing
  ctx.fillStyle = "Green";
  ctx.fillRect(0, canvas.height - 100, canvas.width, 10)
  ctx.fillStyle = "SaddleBrown";
  ctx.fillRect(0, canvas.height - 90, canvas.width, 90)
  // Top
  if (ball.position.y >= canvas.height - 130
    && ball.position.y <= canvas.height - 100) {
    ball.position.y = canvas.height - 130;
  }

  // Lower Level Platforms

  // Drawing
  ctx.fillStyle = "Black";
  ctx.fillRect(0, canvas.height - 200, 70, 10)
  ctx.fillRect(canvas.width - 100, canvas.height - 200, -300, 10)
  //Top
  if ((ball.position.y >= canvas.height - 230
    && ball.position.y <= canvas.height - 210)
    && ((ball.position.x >= 0
      && ball.position.x <= 70)
      || (ball.position.x >= canvas.width - 410
        && ball.position.x <= canvas.width - 100))) {
    ball.position.y = canvas.height - 230;
  }
  // Bottom
  if ((ball.position.y <= canvas.height - 150
    && ball.position.y >= canvas.height - 180)
    && ((ball.position.x >= 0
      && ball.position.x <= 70)
      || (ball.position.x >= canvas.width - 410
        && ball.position.x <= canvas.width - 100))) {
    ball.position.y = canvas.height - 150;
  }

  // Middle Level Platforms

  // Drawing
  ctx.fillStyle = "Black";
  ctx.fillRect(130, canvas.height - 300, 70, 10)
  ctx.fillRect(400, canvas.height - 300, canvas.width - 800, 10)
  ctx.fillRect(canvas.width, canvas.height - 300, -300, 10)
  // Top
  if ((ball.position.y >= canvas.height - 330
    && ball.position.y <= canvas.height - 310)
    && ((ball.position.x >= 130
      && ball.position.x <= 200)
      || (ball.position.x >= 400
        && ball.position.x <= canvas.width - 400)
      || (ball.position.x >= canvas.width - 300
        && ball.position.x <= canvas.width))) {
    ball.position.y = canvas.height - 330;
  }
  // Bottom
  if ((ball.position.y <= canvas.height - 250
    && ball.position.y >= canvas.height - 280)
    && ((ball.position.x >= 130
      && ball.position.x <= 200)
      || (ball.position.x >= 400
        && ball.position.x <= canvas.width - 400)
      || (ball.position.x >= canvas.width - 300
        && ball.position.x <= canvas.width))) {
    ball.position.y = canvas.height - 250;
  }

  // Upper Level Platforms

  // Drawing
  ctx.fillStyle = "Black";
  ctx.fillRect(0, canvas.height - 400, 70, 10)
  ctx.fillRect(200, canvas.height - 400, 300, 10)
  ctx.fillRect(canvas.width - 200, canvas.height - 400, -300, 10)
  ctx.fillRect(canvas.width, canvas.height - 400, -70, 10)
  // Top
  if ((ball.position.y >= canvas.height - 430
    && ball.position.y <= canvas.height - 410)
    && ((ball.position.x >= 0
      && ball.position.x <= 80)
      || (ball.position.x >= 200
        && ball.position.x <= 500)
      || (ball.position.x >= canvas.width - 500
        && ball.position.x <= canvas.width - 200)
      || (ball.position.x >= canvas.width - 80
        && ball.position.x <= canvas.width))) {
    ball.position.y = canvas.height - 430;
  }
  // Bottom
  if ((ball.position.y <= canvas.height - 350
    && ball.position.y >= canvas.height - 380)
    && ((ball.position.x >= 0
      && ball.position.x <= 80)
      || (ball.position.x >= 200
        && ball.position.x <= 500)
      || (ball.position.x >= canvas.width - 500
        && ball.position.x <= canvas.width - 200)
      || (ball.position.x >= canvas.width - 80
        && ball.position.x <= canvas.width))) {
    ball.position.y = canvas.height - 350;
  }

  // Top Level Platform

  // Drawing
  ctx.fillStyle = "Black";
  ctx.fillRect(400, canvas.height - 500, canvas.width - 800, 10)
  // Top
  if (ball.position.y >= canvas.height - 530
    && ball.position.y <= canvas.height - 510
    && ball.position.x >= 400
    && ball.position.x <= canvas.width - 400) {
    ball.position.y = canvas.height - 530;
  }
  // Bottom
  if (ball.position.y <= canvas.height - 450
    && ball.position.y >= canvas.height - 480
    && ball.position.x >= 400
    && ball.position.x <= canvas.width - 400) {
    ball.position.y = canvas.height - 450;
  }

  // Roof of Top Room

  // Drawing
  ctx.fillStyle = "Black";
  ctx.fillRect(400, canvas.height - 700, canvas.width - 800, 10)
  // Top
  if (ball.position.y >= canvas.height - 730
    && ball.position.y <= canvas.height - 710
    && ball.position.x >= 400
    && ball.position.x <= canvas.width - 400) {
    ball.position.y = canvas.height - 730;
  }
  // Bottom
  if (ball.position.y <= canvas.height - 650
    && ball.position.y >= canvas.height - 680
    && ball.position.x >= 390
    && ball.position.x <= canvas.width - 390) {
    ball.position.y = canvas.height - 650;
  }


  // ------------------- Platform Sides-------------------------

  // Small Jump Platforms
  if (((ball.position.y >= canvas.height - 400
    && ball.position.y <= canvas.height - 390)
    || (ball.position.y >= canvas.height - 200
      && ball.position.y <= canvas.height - 190))
    && (ball.position.x >= 70
      && ball.position.x <= 90)) {
    ball.position.x = 90;
  }
  if ((ball.position.y >= canvas.height - 300
    && ball.position.y <= canvas.height - 290)
    && (ball.position.x >= 110
      && ball.position.x <= 130)) {
    ball.position.x = 110;
  }
  // Upper MidLeft Platform
  if ((ball.position.y >= canvas.height - 400
    && ball.position.y <= canvas.height - 390)
    && (ball.position.x >= 500
      && ball.position.x <= 520)) {
    ball.position.x = 520;
  }
  // Middle Platform 
  if ((ball.position.y >= canvas.height - 300
    && ball.position.y <= canvas.height - 290)
    && (ball.position.x >= 380
      && ball.position.x <= 400)) {
    ball.position.x = 380;
  }
  // Bottom Right Platform 
  if ((ball.position.y >= canvas.height - 200
    && ball.position.y <= canvas.height - 190)
    && (ball.position.x >= canvas.width - 100
      && ball.position.x <= canvas.width - 80)) {
    ball.position.x = canvas.width - 80;
  }
  // Middle Right Platform 
  if ((ball.position.y >= canvas.height - 300
    && ball.position.y <= canvas.height - 290)
    && (ball.position.x >= canvas.width - 320
      && ball.position.x <= canvas.width - 300)) {
    ball.position.x = canvas.width - 320;
  }
  // Upper Midright Platform 
  if ((ball.position.y >= canvas.height - 400
    && ball.position.y <= canvas.height - 390)
    && (ball.position.x >= canvas.width - 520
      && ball.position.x <= canvas.width - 500)) {
    ball.position.x = canvas.width - 520;
  }
  // Right Jump Platform 
  if ((ball.position.y >= canvas.height - 400
    && ball.position.y <= canvas.height - 390)
    && (ball.position.x >= canvas.width - 100
      && ball.position.x <= canvas.width - 80)) {
    ball.position.x = canvas.width - 90;
  }
  // Top Platform 
  if ((ball.position.y >= canvas.height - 500
    && ball.position.y <= canvas.height - 490)
    && (ball.position.x >= canvas.width - 400
      && ball.position.x <= canvas.width - 380)) {
    ball.position.x = canvas.width - 380;
  }


  //------------------------ Walls -------------------------------

  // Spawn Point Wall

  // Drawing
  ctx.fillStyle = "Black";
  ctx.fillRect(200, canvas.height - 100, 10, -350)
  ctx.strokeStyle = "Grey";
  ctx.beginPath();
  ctx.moveTo(200, canvas.height - 450);
  ctx.lineTo(205, canvas.height - 470);
  ctx.lineTo(210, canvas.height - 450);
  ctx.closePath();
  ctx.stroke();
  ctx.fillStyle = "Grey";
  ctx.fill();
  // Left
  if ((ball.position.y >= canvas.height - 454
    && ball.position.y <= canvas.height - 100)
    && (ball.position.x >= 180
      && ball.position.x <= 200)) {
    ball.position.x = 180;
  }
  // Right
  if ((ball.position.y >= canvas.height - 454
    && ball.position.y <= canvas.height - 100)
    && (ball.position.x >= 210
      && ball.position.x <= 230)) {
    ball.position.x = 230;
  }
  // Spike
  if ((ball.position.y >= canvas.height - 480
    && ball.position.y <= canvas.height - 450)
    && (ball.position.x >= 200
      && ball.position.x <= 210)) {
    ball.position.x = 100;
    ball.position.y = canvas.height - 150;
    deathCount += 1;
  }

  // Bottom Left Wall

  ctx.fillStyle = "Black";
  ctx.fillRect(390, canvas.height - 100, 10, -100)
  // Left
  if ((ball.position.y >= canvas.height - 200
    && ball.position.y <= canvas.height - 100)
    && (ball.position.x >= 370
      && ball.position.x <= 390)) {
    ball.position.x = 370;
  }
  // Right
  if ((ball.position.y >= canvas.height - 200
    && ball.position.y <= canvas.height - 100)
    && (ball.position.x >= 400
      && ball.position.x <= 420)) {
    ball.position.x = 420;
  }
  // Top
  if ((ball.position.y >= canvas.height - 230
    && ball.position.y <= canvas.height - 210)
    && (ball.position.x >= 390
      && ball.position.x <= 400)) {
    ball.position.y = canvas.height - 230;
  }

  // Lower Right Wall

  ctx.fillStyle = "Black";
  ctx.fillRect(canvas.width - 410, canvas.height - 300, 10, 110)
  // Left
  if ((ball.position.y >= canvas.height - 300
    && ball.position.y <= canvas.height - 190)
    && (ball.position.x >= canvas.width - 430
      && ball.position.x <= canvas.width - 410)) {
    ball.position.x = canvas.width - 430;
  }
  // Right
  if ((ball.position.y >= canvas.height - 300
    && ball.position.y <= canvas.height - 190)
    && (ball.position.x >= canvas.width - 400
      && ball.position.x <= canvas.width - 380)) {
    ball.position.x = canvas.width - 380;
  }

  // Middle Right Wall

  // Drawing
  ctx.fillStyle = "Black";
  ctx.fillRect(canvas.width - 200, canvas.height - 300, -10, -150)
  ctx.strokeStyle = "Grey";
  ctx.beginPath();
  ctx.moveTo(canvas.width - 200, canvas.height - 450);
  ctx.lineTo(canvas.width - 205, canvas.height - 470);
  ctx.lineTo(canvas.width - 210, canvas.height - 450);
  ctx.closePath();
  ctx.stroke();
  ctx.fillStyle = "Grey";
  ctx.fill();
  // Left
  if ((ball.position.y >= canvas.height - 450
    && ball.position.y <= canvas.height - 300)
    && (ball.position.x >= canvas.width - 230
      && ball.position.x <= canvas.width - 210)) {
    ball.position.x = canvas.width - 230;
  }
  // Right
  if ((ball.position.y >= canvas.height - 450
    && ball.position.y <= canvas.height - 300)
    && (ball.position.x >= canvas.width - 200
      && ball.position.x <= canvas.width - 180)) {
    ball.position.x = canvas.width - 180;
  }
  // Spike
  if ((ball.position.y >= canvas.height - 480
    && ball.position.y <= canvas.height - 450)
    && (ball.position.x >= canvas.width - 210
      && ball.position.x <= canvas.width - 200)) {
    ball.position.x = 100;
    ball.position.y = canvas.height - 150;
    deathCount += 1;
  }

  // Main Middle Wall

  ctx.fillStyle = "Black";
  ctx.fillRect(canvas.width / 2 - 5, canvas.height - 500, 10, 200)
  // Left
  if ((ball.position.y >= canvas.height - 500
    && ball.position.y <= canvas.height - 300)
    && (ball.position.x >= canvas.width / 2 - 25
      && ball.position.x <= canvas.width / 2 - 5)) {
    ball.position.x = canvas.width / 2 - 25;
  }
  // Right
  if ((ball.position.y >= canvas.height - 500
    && ball.position.y <= canvas.height - 300)
    && (ball.position.x >= canvas.width / 2 + 5
      && ball.position.x <= canvas.width / 2 + 25)) {
    ball.position.x = canvas.width / 2 + 25;
  }

  // Top Left Wall

  ctx.fillStyle = "Black";
  ctx.fillRect(400, canvas.height - 500, 10, -200)
  // Left
  if ((ball.position.y >= canvas.height - 700
    && ball.position.y <= canvas.height - 490)
    && (ball.position.x >= 380
      && ball.position.x <= 400)) {
    ball.position.x = 380;
  }
  // Right
  if ((ball.position.y >= canvas.height - 700
    && ball.position.y <= canvas.height - 490)
    && (ball.position.x >= 410
      && ball.position.x <= 430)) {
    ball.position.x = 430;
  }

  ctx.fillStyle = "Black";
  ctx.fillRect(canvas.width - 400, canvas.height - 690, -10, 80)
  // Right
  if ((ball.position.y >= canvas.height - 690
    && ball.position.y <= canvas.height - 610)
    && (ball.position.x <= canvas.width - 380
      && ball.position.x >= canvas.width - 400)) {
    ball.position.x = canvas.width - 380;
  }
  // Left
  if ((ball.position.y >= canvas.height - 690
    && ball.position.y <= canvas.height - 610)
    && (ball.position.x <= canvas.width - 410
      && ball.position.x >= canvas.width - 430)) {
    ball.position.x = canvas.width - 430;
  }


  //----------------------- Lasers -----------------------------

  // Bottom Lasers Drawing
  ctx.fillStyle = "Grey";
  ctx.fillRect(canvas.width / 2 - 145, canvas.height - 290, -10, 10)
  ctx.fillRect(canvas.width / 2 - 145, canvas.height - 100, -10, -10)
  ctx.fillRect(canvas.width / 2 - 45, canvas.height - 290, -10, 10)
  ctx.fillRect(canvas.width / 2 - 45, canvas.height - 100, -10, -10)
  ctx.fillRect(canvas.width / 2 + 45, canvas.height - 290, 10, 10)
  ctx.fillRect(canvas.width / 2 + 45, canvas.height - 100, 10, -10)
  ctx.fillRect(canvas.width / 2 + 145, canvas.height - 290, 10, 10)
  ctx.fillRect(canvas.width / 2 + 145, canvas.height - 100, 10, -10)
  // Upper Laser Drawing
  ctx.fillStyle = "Grey";
  ctx.fillRect(canvas.width - 200, canvas.height - 400, 10, 10)
  ctx.fillRect(canvas.width - 70, canvas.height - 400, -10, 10)

  // Laser Counter
  laserCount++;
  if (laserCount <= 20) {
    // Bottom Lasers Drawing
    ctx.fillStyle = "Red";
    ctx.fillRect(canvas.width / 2 - 147, canvas.height - 290, -6, 190)
    ctx.fillRect(canvas.width / 2 - 47, canvas.height - 290, -6, 190)
    ctx.fillRect(canvas.width / 2 + 47, canvas.height - 290, 6, 190)
    ctx.fillRect(canvas.width / 2 + 147, canvas.height - 290, 6, 190)
    ctx.fillStyle = "Grey";
    ctx.fillRect(canvas.width / 2 - 145, canvas.height - 290, -10, 10)
    ctx.fillRect(canvas.width / 2 - 145, canvas.height - 100, -10, -10)
    ctx.fillRect(canvas.width / 2 - 45, canvas.height - 290, -10, 10)
    ctx.fillRect(canvas.width / 2 - 45, canvas.height - 100, -10, -10)
    ctx.fillRect(canvas.width / 2 + 45, canvas.height - 290, 10, 10)
    ctx.fillRect(canvas.width / 2 + 45, canvas.height - 100, 10, -10)
    ctx.fillRect(canvas.width / 2 + 145, canvas.height - 290, 10, 10)
    ctx.fillRect(canvas.width / 2 + 145, canvas.height - 100, 10, -10)
    // Upper Laser Drawing
    ctx.fillStyle = "Red";
    ctx.fillRect(canvas.width - 200, canvas.height - 398, 130, 6)
    ctx.fillStyle = "Grey";
    ctx.fillRect(canvas.width - 200, canvas.height - 400, 10, 10)
    ctx.fillRect(canvas.width - 70, canvas.height - 400, -10, 10)

    // Bottom Lasers Killing
    if ((ball.position.y >= canvas.height - 300
      && ball.position.y <= canvas.height - 100)
      && (ball.position.x > canvas.width / 2 - 173
        && ball.position.x < canvas.width / 2 - 127)) {
      ball.position.x = 100
      ball.position.y = canvas.height - 150;
      deathCount += 1;
    }
    if ((ball.position.y >= canvas.height - 300
      && ball.position.y <= canvas.height - 100)
      && (ball.position.x > canvas.width / 2 - 73
        && ball.position.x < canvas.width / 2 - 27)) {
      ball.position.x = 100
      ball.position.y = canvas.height - 150;
      deathCount += 1;
    }
    if ((ball.position.y >= canvas.height - 300
      && ball.position.y <= canvas.height - 100)
      && (ball.position.x > canvas.width / 2 + 27
        && ball.position.x < canvas.width / 2 + 73)) {
      ball.position.x = 100
      ball.position.y = canvas.height - 150;
      deathCount += 1;
    }
    if ((ball.position.y >= canvas.height - 300
      && ball.position.y <= canvas.height - 100)
      && (ball.position.x > canvas.width / 2 + 127
        && ball.position.x < canvas.width / 2 + 173)) {
      ball.position.x = 100
      ball.position.y = canvas.height - 150;
      deathCount += 1;
    }
    // Upper Laser Killing
    if ((ball.position.y > canvas.height - 418
      && ball.position.y < canvas.height - 372)
      && (ball.position.x >= canvas.width - 200
        && ball.position.x <= canvas.width - 70)) {
      ball.position.x = 100
      ball.position.y = canvas.height - 150;
      deathCount += 1;
    }
  }
  // Laser Reset
  if (laserCount > 40) {
    laserCount = 0;
  }


  //----------------------- Cannons -----------------------------

  // Drawing
  ctx.fillStyle = "Black";
  ctx.fillRect(210, canvas.height - 380, 10, 20)
  ctx.fillRect(210, canvas.height - 310, 10, -20)
  ctx.fillRect(canvas.width - 210, canvas.height - 380, -10, 20)
  ctx.fillRect(canvas.width - 210, canvas.height - 310, -10, -20)
  cannonCount++;

  // Top Left Cannon

  cannonCount++;
  if (cannonCount > 0) {
    // Drawing
    ctx.fillStyle = "Grey";
    ctx.beginPath();
    ctx.arc(cannonball.a.x, cannonball.a.y, cannonball.a.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "Black";
    ctx.fillRect(210, canvas.height - 380, 10, 20)
  }
  // Cannon Reset
  if (cannonball.a.x >= canvas.width / 2 - 15) {
    cannonCount = 0
    cannonball.a.x = 220;
  }
  // Cannon Killing
  if ((ball.position.x > cannonball.a.x - 20
    && ball.position.x < cannonball.a.x + 20)
    && (ball.position.y > cannonball.a.y - 20
      && ball.position.y < cannonball.a.y + 20)) {
    ball.position.x = 100
    ball.position.y = canvas.height - 150;
    deathCount += 1;
  }

  // Bottom Left Cannon

  if (cannonCount > 0) {
    // Drawing
    ctx.fillStyle = "Grey";
    ctx.beginPath();
    ctx.arc(cannonball.b.x, cannonball.b.y, cannonball.b.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "Black";
    ctx.fillRect(210, canvas.height - 310, 10, -20)
  }
  // Cannon Reset
  if (cannonball.b.x >= canvas.width / 2 - 15) {
    cannonCount = 0
    cannonball.b.x = 220;
  }
  // Cannon Killing
  if ((ball.position.x > cannonball.b.x - 20
    && ball.position.x < cannonball.b.x + 20)
    && (ball.position.y > cannonball.b.y - 20
      && ball.position.y < cannonball.b.y + 20)) {
    ball.position.x = 100
    ball.position.y = canvas.height - 150;
    deathCount += 1;
  }

  // Top Right Cannon

  if (cannonCount > 0) {
    // Drawing
    ctx.fillStyle = "Grey";
    ctx.beginPath();
    ctx.arc(cannonball.c.x, cannonball.c.y, cannonball.c.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "Black";
    ctx.fillRect(canvas.width - 210, canvas.height - 380, -10, 20)
  }
  // Cannon Reset
  if (cannonball.c.x <= canvas.width / 2 + 15) {
    cannonCount = 0
    cannonball.c.x = canvas.width - 220;
  }
  // Cannon Killing
  if ((ball.position.x > cannonball.c.x - 20
    && ball.position.x < cannonball.c.x + 20)
    && (ball.position.y > cannonball.c.y - 20
      && ball.position.y < cannonball.c.y + 20)) {
    ball.position.x = 100
    ball.position.y = canvas.height - 150;
    deathCount += 1;
  }

  // Bottom Right Cannon

  if (cannonCount > 0) {
    // Drawing
    ctx.fillStyle = "Grey";
    ctx.beginPath();
    ctx.arc(cannonball.d.x, cannonball.d.y, cannonball.d.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "Black";
    ctx.fillRect(canvas.width - 210, canvas.height - 310, -10, -20)
  }
  // Cannon Reset
  if (cannonball.d.x <= canvas.width / 2 + 15) {
    cannonCount = 0
    cannonball.d.x = canvas.width - 220;
  }
  // Cannon Killing
  if ((ball.position.x > cannonball.d.x - 20
    && ball.position.x < cannonball.d.x + 20)
    && (ball.position.y > cannonball.d.y - 20
      && ball.position.y < cannonball.d.y + 20)) {
    ball.position.x = 100
    ball.position.y = canvas.height - 150;
    deathCount += 1;
  }


  // ---------------------- Spikes -------------------------------

  // Spike Pit

  // Drawing
  ctx.beginPath();
  ctx.moveTo(210, canvas.height - 100);
  ctx.lineTo(210, canvas.height - 110);
  ctx.lineTo(220, canvas.height - 140);
  ctx.lineTo(230, canvas.height - 110);
  ctx.lineTo(240, canvas.height - 140);
  ctx.lineTo(250, canvas.height - 110);
  ctx.lineTo(260, canvas.height - 140);
  ctx.lineTo(270, canvas.height - 110);
  ctx.lineTo(280, canvas.height - 140);
  ctx.lineTo(290, canvas.height - 110);
  ctx.lineTo(300, canvas.height - 140);
  ctx.lineTo(310, canvas.height - 110);
  ctx.lineTo(320, canvas.height - 140);
  ctx.lineTo(330, canvas.height - 110);
  ctx.lineTo(340, canvas.height - 140);
  ctx.lineTo(350, canvas.height - 110);
  ctx.lineTo(360, canvas.height - 140);
  ctx.lineTo(370, canvas.height - 110);
  ctx.lineTo(380, canvas.height - 140);
  ctx.lineTo(390, canvas.height - 110);
  ctx.lineTo(390, canvas.height - 100);
  ctx.closePath();
  ctx.stroke();
  ctx.strokeStyle = "Grey";
  ctx.fillStyle = "Grey";
  ctx.fill();
  // Spike Killing
  if ((ball.position.y >= canvas.height - 140
    && ball.position.y <= canvas.height - 100)
    && (ball.position.x >= 210
      && ball.position.x <= 390)) {
    ball.position.x = 100
    ball.position.y = canvas.height - 150;
    deathCount += 1;
  }

  // Moving Spike Count
  spikeCount++;
  if (spikeCount > 30) {
    spikeCount = 0;
  }

  // Left Moving Spikes

  // Drawing
  if (spikeCount <= 30) {
    ctx.beginPath();
    ctx.moveTo(canvas.width - 300, canvas.height - 190);
    ctx.lineTo(canvas.width - 300, movingspike.a.top);
    ctx.lineTo(canvas.width - 308, movingspike.a.bottom);
    ctx.lineTo(canvas.width - 316, movingspike.a.top);
    ctx.lineTo(canvas.width - 324, movingspike.a.bottom);
    ctx.lineTo(canvas.width - 332, movingspike.a.top);
    ctx.lineTo(canvas.width - 340, movingspike.a.bottom);
    ctx.lineTo(canvas.width - 348, movingspike.a.top);
    ctx.lineTo(canvas.width - 356, movingspike.a.bottom);
    ctx.lineTo(canvas.width - 364, movingspike.a.top);
    ctx.lineTo(canvas.width - 372, movingspike.a.bottom);
    ctx.lineTo(canvas.width - 380, movingspike.a.top);
    ctx.lineTo(canvas.width - 380, canvas.height - 190);
    ctx.closePath();
    ctx.stroke();
    ctx.strokeStyle = "Grey";
    ctx.fillStyle = "Grey";
    ctx.fill();
    // Spike Killing
    if ((ball.position.y > movingspike.a.top
      && ball.position.y < movingspike.a.bottom)
      && (ball.position.x >= canvas.width - 390
        && ball.position.x <= canvas.width - 290)) {
      ball.position.x = 100
      ball.position.y = canvas.height - 150;
      deathCount += 1;
    }
  }

  // Right Moving Spikes

  // Drawing
  if (spikeCount <= 30) {
    ctx.beginPath();
    ctx.moveTo(canvas.width - 120, canvas.height - 190);
    ctx.lineTo(canvas.width - 120, movingspike.b.top);
    ctx.lineTo(canvas.width - 128, movingspike.b.bottom);
    ctx.lineTo(canvas.width - 136, movingspike.b.top);
    ctx.lineTo(canvas.width - 144, movingspike.b.bottom);
    ctx.lineTo(canvas.width - 152, movingspike.b.top);
    ctx.lineTo(canvas.width - 160, movingspike.b.bottom);
    ctx.lineTo(canvas.width - 168, movingspike.b.top);
    ctx.lineTo(canvas.width - 176, movingspike.b.bottom);
    ctx.lineTo(canvas.width - 184, movingspike.b.top);
    ctx.lineTo(canvas.width - 192, movingspike.b.bottom);
    ctx.lineTo(canvas.width - 200, movingspike.b.top);
    ctx.lineTo(canvas.width - 200, canvas.height - 190);
    ctx.closePath();
    ctx.stroke();
    ctx.strokeStyle = "Grey";
    ctx.fillStyle = "Grey";
    ctx.fill();
    // Spike Killing
    if ((ball.position.y > movingspike.b.top
      && ball.position.y < movingspike.b.bottom)
      && (ball.position.x >= canvas.width - 210
        && ball.position.x <= canvas.width - 110)) {
      ball.position.x = 100
      ball.position.y = canvas.height - 150;
      deathCount += 1;
    }
  }

  // Top Moving Spikes

  // Drawing
  if (spikeCount <= 30) {
    ctx.beginPath();
    ctx.moveTo(canvas.width - 210, canvas.height - 290);
    ctx.lineTo(canvas.width - 210, movingspike.c.top);
    ctx.lineTo(canvas.width - 218, movingspike.c.bottom);
    ctx.lineTo(canvas.width - 226, movingspike.c.top);
    ctx.lineTo(canvas.width - 234, movingspike.c.bottom);
    ctx.lineTo(canvas.width - 242, movingspike.c.top);
    ctx.lineTo(canvas.width - 250, movingspike.c.bottom);
    ctx.lineTo(canvas.width - 258, movingspike.c.top);
    ctx.lineTo(canvas.width - 266, movingspike.c.bottom);
    ctx.lineTo(canvas.width - 274, movingspike.c.top);
    ctx.lineTo(canvas.width - 282, movingspike.c.bottom);
    ctx.lineTo(canvas.width - 290, movingspike.c.top);
    ctx.lineTo(canvas.width - 290, canvas.height - 290);
    ctx.closePath();
    ctx.stroke();
    ctx.strokeStyle = "Grey";
    ctx.fillStyle = "Grey";
    ctx.fill();
    // Spike Killing
    if ((ball.position.y > movingspike.c.top
      && ball.position.y < movingspike.c.bottom)
      && (ball.position.x >= canvas.width - 300
        && ball.position.x <= canvas.width - 200)) {
      ball.position.x = 100
      ball.position.y = canvas.height - 150;
      deathCount += 1;
    }
  }


  // ----------------------- Doorway and Button -------------------------------

  // Doorway
  if (doorCount <= 360) {
    ctx.fillStyle = "Brown";
    ctx.fillRect(canvas.width - 400, door.top, -10, door.bottom)
    // Right
    if ((ball.position.y >= door.top
      && ball.position.y <= door.top + door.bottom)
      && (ball.position.x <= canvas.width - 380
        && ball.position.x >= canvas.width - 400)) {
      ball.position.x = canvas.width - 380;
    }
    // Left
    if ((ball.position.y >= door.top
      && ball.position.y <= door.top + door.bottom)
      && (ball.position.x <= canvas.width - 410
        && ball.position.x >= canvas.width - 430)) {
      ball.position.x = canvas.width - 430;
    }
  }
  // Doorway Counter
  if (interact === true) {
    doorCount++;
  }

  if (doorCount > 360) {
    doorCount = 0;
    interact = false;
  }

  // Interact Detection
  if ((ball.position.y >= canvas.height - 390
    && ball.position.y <= canvas.height - 300)
    && (ball.position.x >= canvas.width - 80
      && ball.position.x <= canvas.width - 50)) {
    detect = true;
  } else {
    detect = false;
  }

  // Button

  // Drawing
  ctx.fillStyle = "Black";
  ctx.fillRect(canvas.width, canvas.height - 300, -50, -70)
  ctx.fillStyle = "Grey";
  ctx.fillRect(canvas.width - 5, canvas.height - 320, -40, -40)
  ctx.fillStyle = "Red";
  ctx.beginPath();
  ctx.arc(canvas.width - 25, canvas.height - 340, 15, 0, Math.PI * 2);
  ctx.fill();

  // Left
  if ((ball.position.y >= canvas.height - 370
    && ball.position.y <= canvas.height - 300)
    && (ball.position.x >= canvas.width - 70
      && ball.position.x <= canvas.width - 50)) {
    ball.position.x = canvas.width - 70;
  }

  //-------------------------- Chest --------------------------------

  // Chest Drawing
  ctx.fillStyle = "Sienna";
  ctx.fillRect(410, canvas.height - 500, 100, -50)
  ctx.fillStyle = "Gold";
  ctx.fillRect(450, canvas.height - 520, 20, -10)
  ctx.strokeStyle = "Black";
  ctx.beginPath();
  ctx.moveTo(410, canvas.height - 500);
  ctx.lineTo(410, canvas.height - 550);
  ctx.lineTo(510, canvas.height - 550);
  ctx.lineTo(510, canvas.height - 500);
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(410, canvas.height - 525);
  ctx.lineTo(450, canvas.height - 525);
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(450, canvas.height - 520);
  ctx.lineTo(450, canvas.height - 530);
  ctx.lineTo(470, canvas.height - 530);
  ctx.lineTo(470, canvas.height - 520);
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(470, canvas.height - 525);
  ctx.lineTo(510, canvas.height - 525);
  ctx.closePath();
  ctx.stroke();

  // Top
  if ((ball.position.y >= canvas.height - 580
    && ball.position.y <= canvas.height - 560)
    && (ball.position.x >= 410
      && ball.position.x <= 510)) {
    ball.position.y = canvas.height - 580;
  }
  // Right
  if ((ball.position.y >= canvas.height - 550
    && ball.position.y <= canvas.height - 500)
    && (ball.position.x >= 510
      && ball.position.x <= 530)) {
    ball.position.x = 530;
  }

  // Chest Detection
  if ((ball.position.y >= canvas.height - 600
    && ball.position.y <= canvas.height - 500)
    && (ball.position.x >= 410
      && ball.position.x <= 550)) {
    detectEnd = true;
  } else {
    detectEnd = false;
  }

  // --------------------- End Screen ---------------------------

  if (end === true) {
    ctx.fillStyle = "LightGrey";
    ctx.fillRect(canvas.width / 2 - 200, canvas.height / 2 - 80, 400, 150);
    ctx.strokeStyle = "Black";
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 200, canvas.height / 2 - 80);
    ctx.lineTo(canvas.width / 2 + 200, canvas.height / 2 - 80);
    ctx.lineTo(canvas.width / 2 + 200, canvas.height / 2 + 70);
    ctx.lineTo(canvas.width / 2 - 200, canvas.height / 2 + 70);
    ctx.closePath();
    ctx.stroke();
    ctx.font = "Bold 20px Arial";
    ctx.fillStyle = "Black";
    ctx.textAlign = "center";
    ctx.fillText("Hello there. Congratulations on beating", canvas.width / 2, canvas.height / 2 - 20);
    ctx.fillText("the game and finding the One Piece.", canvas.width / 2, canvas.height / 2);
    ctx.fillText("The One Piece is [REDACTED].", canvas.width / 2, canvas.height / 2 + 20);

    return;
  }
  // return;

  requestAnimationFrame(cycle);
}
requestAnimationFrame(cycle);


//----------------------- Key Inputs ----------------------------

// Key Up and Down

window.addEventListener("keyup", function(event) {
  switch (event.code) {
    case "ArrowRight":
      right = false
      break;
    case "ArrowLeft":
      left = false
      break;
    case "KeyD":
      right = false
      break;
    case "KeyA":
      left = false
      break;
  }
});

window.addEventListener("keydown", function(event) {
  switch (event.code) {
    case "ArrowLeft":
      left = true
      break;
    case "ArrowRight":
      right = true
      break;
    case "KeyA":
      left = true
      break;
    case "KeyD":
      right = true
      break;
  }
});

// Key Presses

window.addEventListener("keypress", function(event) {
  if (shouldJump === true) {
    switch (event.code) {
      case "Space":
        jump = true
        break;
      case "KeyW":
        jump = true
        break;
    }
  }
  if (detect === true) {
    switch (event.code) {
      case "KeyE":
        interact = true
        break;
    }
  }
  if (detectEnd === true) {
    switch (event.code) {
      case "KeyE":
        end = true
        break;
    }
  }
});