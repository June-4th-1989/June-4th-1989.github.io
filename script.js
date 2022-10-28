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
    x: 100,
    y: 400
  },
  speed: {
    x: 0,
    y: 0
  }, 
  radius: 20,
  
};

let left = false
let right = false
let up = false
let down = false
let respawn = false
let jump = false
let reload = false

let count = 0
let gravity = 0
let jumpCount = 0


// Ball Function

function cycle() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  count += 10
  gravity += 10

  if (right) ball.position.x += 15
  if (left) ball.position.x -= 15
  // if (up) ball.position.y -= 15
  // if (down) ball.position.y += 15
  if (respawn) ball.position.x /= 10
  if (respawn) ball.position.y /= 10
  if (jump) ball.position.y -= 30
  if (gravity) ball.position.y += 10

  ctx.fillStyle = "Blue";
  ctx.beginPath();
  ctx.arc(ball.position.x, ball.position.y, ball.radius, 0, Math.PI * 2);
  ctx.fill();

  if (ball.position.x < 40) {
    ball.position.x = 40;
  }
  if (ball.position.y < 40) {
    ball.position.y = 40;
  }
  // if (ball.position.x > window.innerWidth - 40) {
  //   ball.position.x = window.innerWidth - 40;
  // }
  if (ball.position.y > window.innerHeight - 130) {
    ball.position.y = window.innerHeight - 130;
  }
  
  if (jump == true) {
    jumpCount++;
  }
  if (jumpCount > 8) {
    jump = false;
    jumpCount = 0;
  }

  
  //Floor and Platforms
  
  // Ground Level
  ctx.fillStyle = "ForestGreen";
  ctx.fillRect(0, canvas.height - 100, canvas.width, 15)

  ctx.fillStyle = "SaddleBrown";
  ctx.fillRect(0, canvas.height - 85, canvas.width, 85)
  
  // 1st Level Platform
  ctx.fillStyle = "Black";
  ctx.fillRect(200, canvas.height - 200, 300, 10)
  
  ctx.fillStyle = "Black";
  ctx.fillRect(canvas.width - 500, canvas.height - 200, 300, 10)
  
  if ((ball.position.y > canvas.height - 230
      && ball.position.y < canvas.height - 210) 
      && ((ball.position.x >= 200 
      && ball.position.x <= 500)
      || (ball.position.x >= canvas.width - 500 
      && ball.position.x <= canvas.width - 200))) {
    ball.position.y = canvas.height - 230;
  }
  if ((ball.position.y < canvas.height - 160
      && ball.position.y > canvas.height - 190) 
      && ((ball.position.x >= 200 
      && ball.position.x <= 500)
      || (ball.position.x >= canvas.width - 500 
      && ball.position.x <= canvas.width - 200))) {
    ball.position.y = canvas.height - 160;
  }

  // 2nd Level Platform
  ctx.fillStyle = "Black";
  ctx.fillRect(400, canvas.height - 300, canvas.width - 800, 10)

  if (ball.position.y > canvas.height - 330 
      && ball.position.y < canvas.height - 310 
      && ball.position.x >= 400 
      && ball.position.x <= canvas.width - 400) {
    ball.position.y = canvas.height - 330;
  } 
  if (ball.position.y < canvas.height - 260 
      && ball.position.y > canvas.height - 290 
      && ball.position.x >= 400 
      && ball.position.x <= canvas.width - 400) {
    ball.position.y = canvas.height - 260;
  } 

  // 3rd Level Platforms
  ctx.fillStyle = "Black";
  ctx.fillRect(200, canvas.height - 400, 300, 10)
  
  ctx.fillStyle = "Black";
  ctx.fillRect(canvas.width - 500, canvas.height - 400, 300, 10)
  
  if ((ball.position.y > canvas.height - 430
      && ball.position.y < canvas.height - 410) 
      && ((ball.position.x >= 200 
      && ball.position.x <= 500)
      || (ball.position.x >= canvas.width - 500 
      && ball.position.x <= canvas.width - 200))) {
    ball.position.y = canvas.height - 430;
  }
  if ((ball.position.y < canvas.height - 360
      && ball.position.y > canvas.height - 390) 
      && ((ball.position.x >= 200 
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
      && ball.position.x >= 400 
      && ball.position.x <= canvas.width - 400) {
    ball.position.y = canvas.height - 460;
  }

  requestAnimationFrame(cycle);
}
requestAnimationFrame(cycle);


// Bullet Function

const bullet = {
  position: {
    x: ball.position.x + 20,
    y: ball.position.y
  }, 
  speed: 0
  
}

function cycleA() {
  speed += 1
  if (speed) bullet.position.x
  if (mouse.down) {
    // shootSpeed += .20
    // let ballAPositionX = ballPositionX + 20
    // let ballAPositionY = ballPositionY
    // if (shootSpeed) {
    //   ballAPositionX += 10
    // }

    ctx.fillStyle = "Black";
    ctx.beginPath();
    ctx.arc(bullet.position.x, bullet.position.y, 10, 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(cycleA);
}
requestAnimationFrame(cycleA);


// Key and Mouse Inputs

window.addEventListener("keyup", function(event) {
  switch (event.code) {
    case "ArrowRight":
      right = false
      break;
    case "ArrowLeft":
      left = false
      break;
    case "ArrowUp":
      up = false
      break;
    case "ArrowDown":
      down = false
      break;
    case "KeyD":
      right = false
      break;
    case "KeyA":
      left = false
      break;
    case "KeyW":
      up = false
      break;
    case "KeyS":
      down = false
      break;
    case "KeyE":
      respawn = false
      break;
    case "Space":
      jump = false
      break;
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
    case "ArrowUp":
      up = true
      break;
    case "ArrowDown":
      down = true
      break;
    case "KeyD":
      right = true
      break;
    case "KeyA":
      left = true
      break;
    case "KeyW":
      up = true
      break;
    case "KeyS":
      down = true
      break;
    case "KeyE":
      respawn = true
      break;
    case "Space":
      jump = true
      break;
    case "KeyR":
      reload = true
      break;
    // if (ball.position.y = 130||230||330||430||530) {
    //   case "Space":
    //     jump = true
    //     break;
    // }
    // else {
    //   case "Space":
    //     jump = false
    //     break;
    // }
  }
});

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

