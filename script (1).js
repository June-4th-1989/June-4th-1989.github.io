const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//canvas commands  https://www.w3schools.com/tags/ref_canvas.asp



// //___________________ mouse input___________________

// let mouse = {
//   down: false,
//   x: 0,
//   y: 0
// };
// canvas.addEventListener("mousemove", event => {
//   mouse.x = event.clientX;
//   mouse.y = event.clientY;
// });
// canvas.addEventListener("mousedown", event => {
//   mouse.down = true;
//   // console.log(mouse);
// });
// canvas.addEventListener("mouseup", event => {
//   mouse.down = false;
// });


// //___________________ key input___________________
// let left = false
// let right = false
// let up = false
// let down = false

// window.addEventListener("keyup", function(event) {
//     switch (event.code) {
//         case "ArrowRight":
//             right = false
//             break;
//         case "ArrowLeft":
//             left = false
//             break;
//         case "ArrowUp":
//             up = false
//             break;
//         case "ArrowDown":
//             down = false
//             break;
//     }
// });

// window.addEventListener("keydown", function(event) {
//        switch (event.code) {
//         case "ArrowRight":
//             right = true
//             break
//         case "ArrowLeft":
//             left = true
//             break
//         case "ArrowUp":
//             up = true
//             break
//         case "ArrowDown":
//             down = true
//             break
//     }
// })





// //___________________animation loop ___________________

// let count = 0

// function cycle(){ //this runs 60 times a sedcond
//   ctx.clearRect(0, 0, canvas.width, canvas.height); //clears everything

//   // your drawing go here
//   ctx.fillStyle = "SeaGreen"
//   ctx.beginPath();
//   count+=0.01
//   ctx.arc(50, 50 + 100 * Math.sin(count), 30, 0, 2 * Math.PI);
//   ctx.fill();


  
//   requestAnimationFrame(cycle);
// }
// requestAnimationFrame(cycle);




// -----------------Actual Game Code--------------------------

const ball = {
  position: {
    x: 150,
    y: canvas.height - 200
  },
  speed: {
    x: 0,
    y: 0
  }, 
  radius: 20, 
  inventory: {
    
  }
};


let detect = false
// let detect = ball.position.y

let left = false
let right = false
let up = false
let down = false
let respawn = false
let jump = false
let reload = false
let interact = false

let count = 0
let gravity = 0
let jumpCount = 0
let laserCount = 0


// Ball Function

function cycle() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  count += 10
  gravity += 10

  if (right) ball.position.x += 10
  if (left) ball.position.x -= 10
  // if (up) ball.position.y -= 15
  // if (down) ball.position.y += 15
  // if (respawn) ball.position.x /= 10
  // if (respawn) ball.position.y /= 10
  if (jump) ball.position.y -= 30
  if (gravity) ball.position.y += 10

  ctx.fillStyle = "Blue";
  ctx.beginPath();
  ctx.arc(ball.position.x, ball.position.y, ball.radius, 0, Math.PI * 2);
  ctx.fill();
  
  
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

  // if ((ball.position.y = canvas.height - 100)) {
  //   detect = true
  // } else {
  //   detect = false
  // }
  if (jump == true) {
    jumpCount ++;
  }
  if (jumpCount > 6) {
    jump = false;
    jumpCount = 0;
  }
  
  
  //Platforms and Walls
  
  // Ground Level
  ctx.fillStyle = "ForestGreen";
  ctx.fillRect(0, canvas.height - 100, canvas.width, 15)
  ctx.fillStyle = "SaddleBrown";
  ctx.fillRect(0, canvas.height - 85, canvas.width, 85)

  if (ball.position.y > canvas.height - 130) {
    ball.position.y = canvas.height - 130;
  }

// Spawn Point Wall
  ctx.fillStyle = "Black";
  ctx.fillRect(200, canvas.height - 100, 10, -360)
  ctx.fillStyle = "Gray";
  ctx.fillRect(200, canvas.height - 460, 10, -6)
  ctx.fillRect(201, canvas.height - 466, 8, -1)
  ctx.fillRect(202, canvas.height - 467, 6, -1)
  ctx.fillRect(203, canvas.height - 468, 4, -1)
  ctx.fillRect(204, canvas.height - 469, 2, -1)
  
  if ((ball.position.y >= canvas.height - 466
      && ball.position.y <= canvas.height - 100)
      && (ball.position.x > 180
      && ball.position.x < 200)) {
    ball.position.x = 180;
  }
  if ((ball.position.y >= canvas.height - 466
      && ball.position.y <= canvas.height - 100)
      && (ball.position.x > 210
      && ball.position.x < 230)) {
    ball.position.x = 230;
  }
  if ((ball.position.y > canvas.height - 490 
      && ball.position.y > canvas.height - 470)
      && ball.position.x >= 200
      && ball.position.x <= 210) {
    ball.position.x = 100
    ball.position.y = canvas.height - 150;
  }
  
  // 1st Level Platforms
  ctx.fillStyle = "Black";
  ctx.fillRect(0, canvas.height - 200, 70, 10)
  ctx.fillStyle = "Black";
  ctx.fillRect(200, canvas.height - 200, 250, 10)
  ctx.fillStyle = "Black";
  ctx.fillRect(canvas.width - 500, canvas.height - 200, 300, 10)
  
  if ((ball.position.y > canvas.height - 230
      && ball.position.y < canvas.height - 210) 
      && ((ball.position.x >= 0
      && ball.position.x <= 70)
      || (ball.position.x >= 200
      && ball.position.x <= 450)
      || (ball.position.x >= canvas.width - 450 
      && ball.position.x <= canvas.width - 200))) {
    ball.position.y = canvas.height - 230;
  }
  if ((ball.position.y < canvas.height - 160
      && ball.position.y > canvas.height - 190) 
      && ((ball.position.x >= 0
      && ball.position.x <= 70)
      || (ball.position.x >= 200
      && ball.position.x <= 450)
      || (ball.position.x >= canvas.width - 450 
      && ball.position.x <= canvas.width - 200))) {
    ball.position.y = canvas.height - 160;
  }

  // 2nd Level Platforms
  ctx.fillStyle = "Black";
  ctx.fillRect(130, canvas.height - 300, 70, 10)
  ctx.fillStyle = "Black";
  ctx.fillRect(400, canvas.height - 300, canvas.width - 800, 10)

  if ((ball.position.y > canvas.height - 330 
      && ball.position.y < canvas.height - 310) 
      && ((ball.position.x >= 130
      && ball.position.x <= 200)
      || (ball.position.x >= 400 
      && ball.position.x <= canvas.width - 400))) {
    ball.position.y = canvas.height - 330;
  } 
  if ((ball.position.y < canvas.height - 260 
      && ball.position.y > canvas.height - 290) 
      && ((ball.position.x >= 130
      && ball.position.x <= 200)
      || (ball.position.x >= 400 
      && ball.position.x <= canvas.width - 400))) {
    ball.position.y = canvas.height - 260;
  } 

  // 3rd Level Platforms
  ctx.fillStyle = "Black";
  ctx.fillRect(0, canvas.height - 400, 70, 10)
  ctx.fillStyle = "Black";
  ctx.fillRect(200, canvas.height - 400, 300, 10)
  ctx.fillStyle = "Black";
  ctx.fillRect(canvas.width - 500, canvas.height - 400, 300, 10)
  
  if ((ball.position.y > canvas.height - 430
      && ball.position.y < canvas.height - 410) 
      && ((ball.position.x >= 0
      && ball.position.x <= 70)
      || (ball.position.x >= 195
      && ball.position.x <= 500)
      || (ball.position.x >= canvas.width - 500 
      && ball.position.x <= canvas.width - 200))) {
    ball.position.y = canvas.height - 430;
  }
  if ((ball.position.y < canvas.height - 360
      && ball.position.y > canvas.height - 390) 
      && ((ball.position.x >= 0
      && ball.position.x <= 70)
      || (ball.position.x >= 190
      && ball.position.x <= 500)
      || (ball.position.x >= canvas.width - 500 
      && ball.position.x <= canvas.width - 200))) {
    ball.position.y = canvas.height - 360;
  }

  // 4th Level Platform
  ctx.fillStyle = "Black";
  ctx.fillRect(400, canvas.height - 500, canvas.width - 800, 10)

  if (ball.position.y > canvas.height - 530 
      && ball.position.y < canvas.height - 510 
      && ball.position.x >= 400 
      && ball.position.x <= canvas.width - 400) {
    ball.position.y = canvas.height - 530;
  }
  if (ball.position.y < canvas.height - 460 
      && ball.position.y > canvas.height - 490 
      && ball.position.x >= 390
      && ball.position.x <= canvas.width - 390) {
    ball.position.y = canvas.height - 460;
  }

  // Top Left Wall
  ctx.fillStyle = "Black";
  ctx.fillRect(400, canvas.height - 500, 10, -canvas.height)

  if ((ball.position.y >= -canvas.height
      && ball.position.y <= canvas.height - 490)
      && (ball.position.x > 380
      && ball.position.x < 400)) {
    ball.position.x = 380;
  }
  if ((ball.position.y >= -canvas.height
      && ball.position.y <= canvas.height - 490)
      && (ball.position.x > 410
      && ball.position.x < 430)) {
    ball.position.x = 430;
  }

  // Top Right Wall
  ctx.fillStyle = "Black";
  ctx.fillRect(canvas.width - 400, canvas.height - 500, -10, -canvas.height)

  if ((ball.position.y >= -canvas.height
      && ball.position.y <= canvas.height - 490)
      && (ball.position.x < canvas.width - 380
      && ball.position.x > canvas.width - 400)) {
    ball.position.x = canvas.width - 380;
  }
  if ((ball.position.y >= -canvas.height
      && ball.position.y <= canvas.height - 490)
      && (ball.position.x < canvas.width - 410
      && ball.position.x > canvas.width - 430)) {
    ball.position.x = canvas.width - 430;
  }

  // Middle Wall
  ctx.fillStyle = "Black";
  ctx.fillRect(680, canvas.height - 500, 10, 200)

  if ((ball.position.y >= canvas.height - 500
      && ball.position.y <= canvas.height - 300)
      && (ball.position.x > 660
      && ball.position.x < 680)) {
    ball.position.x = 660;
  }
  if ((ball.position.y >= canvas.height - 500
      && ball.position.y <= canvas.height - 300)
      && (ball.position.x > 690
      && ball.position.x < 710)) {
    ball.position.x = 710;
  }

  // Laser
  ctx.fillStyle = "Grey";
  ctx.fillRect(580, canvas.height - 290, 10, 10)
  ctx.fillRect(580, canvas.height - 100, 10, -10)
  ctx.fillRect(680, canvas.height - 290, 10, 10)
  ctx.fillRect(680, canvas.height - 100, 10, -10)
  ctx.fillRect(780, canvas.height - 290, 10, 10)
  ctx.fillRect(780, canvas.height - 100, 10, -10)
  
  laserCount ++;
  if (laserCount < 20) {
  
  ctx.fillStyle = "Red";
  ctx.fillRect(582, canvas.height - 290, 6, 190)
  ctx.fillStyle = "Red";
  ctx.fillRect(682, canvas.height - 290, 6, 190)
  ctx.fillStyle = "Red";
  ctx.fillRect(782, canvas.height - 290, 6, 190)
  ctx.fillStyle = "Grey";
  ctx.fillRect(580, canvas.height - 290, 10, 10)
  ctx.fillRect(580, canvas.height - 100, 10, -10)
  ctx.fillRect(680, canvas.height - 290, 10, 10)
  ctx.fillRect(680, canvas.height - 100, 10, -10)
  ctx.fillRect(780, canvas.height - 290, 10, 10)
  ctx.fillRect(780, canvas.height - 100, 10, -10)

  if ((ball.position.y >= canvas.height - 300
      && ball.position.y <= canvas.height - 100)
      && (ball.position.x > 565
      && ball.position.x < 605)) {
    ball.position.x = 100
    ball.position.y = canvas.height - 150;
    }
  if ((ball.position.y >= canvas.height - 300
      && ball.position.y <= canvas.height - 100)
      && (ball.position.x > 665
      && ball.position.x < 705)) {
    ball.position.x = 100
    ball.position.y = canvas.height - 150;
    }
  if ((ball.position.y >= canvas.height - 300
      && ball.position.y <= canvas.height - 100)
      && (ball.position.x > 765
      && ball.position.x < 805)) {
    ball.position.x = 100
    ball.position.y = canvas.height - 150;
    }
  
  } 
  if (laserCount > 40) {
    laserCount = 0;
  }
  
  requestAnimationFrame(cycle);
}
requestAnimationFrame(cycle);


// Bullet Function

// const bullet = {
//   position: {
//     x: ball.position.x + 20,
//     y: ball.position.y
//   }, 
//   speed: 0
  
// }

// function cycleA() {
//   speed += 1
//   if (speed) bullet.position.x
//   if (mouse.down) {
//     // shootSpeed += .20
//     // let ballAPositionX = ballPositionX + 20
//     // let ballAPositionY = ballPositionY
//     // if (shootSpeed) {
//     //   ballAPositionX += 10
//     // }

//     ctx.fillStyle = "Black";
//     ctx.beginPath();
//     ctx.arc(bullet.position.x, bullet.position.y, 10, 0, Math.PI * 2);
//     ctx.fill();
//   }
//   requestAnimationFrame(cycleA);
// }
// requestAnimationFrame(cycleA);


// Key and Mouse Inputs

window.addEventListener("keyup", function(event) {
  switch (event.code) {
    case "ArrowRight":
      right = false
      break;
    case "ArrowLeft":
      left = false
      break;
    // case "ArrowUp":
    //   up = false
    //   break;
    case "ArrowDown":
      down = false
      break;
    case "KeyD":
      right = false
      break;
    case "KeyA":
      left = false
      break;
    // case "KeyW":
    //   up = false
    //   break;
    case "KeyS":
      down = false
      break;
    // case "KeyE":
    //   respawn = false
    //   break;
    case "KeyR":
      reload = false
      break;
  }
});

window.addEventListener("keydown", function(event) {
  switch (event.code) {
    case "ArrowRight":
      right = true
      break;
    case "ArrowLeft":
      left = true
      break;
    // case "ArrowUp":
    //   up = true
    //   break;
    case "ArrowDown":
      down = true
      break;
    case "KeyD":
      right = true
      break;
    case "KeyA":
      left = true
      break;
    // case "KeyW":
    //   up = true
    //   break;
    case "KeyS":
      down = true
      break;
    // case "KeyE":
    //   respawn = true
    //   break;
    case "KeyR":
      reload = true
      break;
      
  }
});

window.addEventListener("keypress", function(event) {
  // if (detect == true) {
    switch (event.code) {
      case "Space":
        jump = true
        break;
      case "KeyW":
        jump = true
        break;
  } if (detect == false) {
    switch (event.code) {
      case "Space":
        jump = true
        break;
      case "KeyW":
        jump = true
        break;
      }
    }
  // } 
});

window.addEventListener("keypress", function(event) {
  switch (event.code) {
    case "KeyE":
      interact = true
      break;
  }
});

// window.addEventListener("keypress", function(event) {
//   switch (event.code) {
//     case "Space":
//       jump = true
//       break;
//     case "KeyW":
//       jump = true
//       break;
//     // case "ArrowUp":
//     //   jump = true
//     //   break;
//   }
// });

// window.addEventListener("keypress", function(event) {
//   switch (event.code) {
//     case "Space":
//       jump = true
//       break;
//     // if (detect = true) {
//     //   case "Space":
//     //     jump = true
//     //     break;
//     // } 
//   }
// });


let mouse = {
  down: false,
  x: 0,
  y: 0
};
canvas.addEventListener("mousemove", event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});
canvas.addEventListener("mousedown", event => {
  mouse.down = true;
  // console.log(mouse);
});
// canvas.addEventListener("mouseup", event => {
//   mouse.down = false;
// });

