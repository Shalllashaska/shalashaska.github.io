var canvas = document.getElementById("can");
var scoreP = document.getElementById("score");
var ctx = canvas.getContext("2d");

var audioAll = document.getElementsByClassName("myAudio");

audioAll.volume = 0.5;

var bx;
var by;
var ax = 100;
var ay = 100;
var test = rand(100);
var ex = getRandomArbitrary(-70, canvas.width + 70);
var ey = getRandomArbitrary1(-70, canvas.height + 70);

console.log("ex " + ex);
console.log("ey " + ey);
console.log("test " + test);

var speed = 2;
var score = 0;
var mouseX;
var mouseY;

var bullet = [];

var pressedMouse = false;
var pressedRight = false;
var pressedLeft = false;
var pressedUp = false;
var pressedDown = false;
var pressedSpace = false;
var timerEnemy = 20;
var timerEnemyS = timerEnemy;

var audioShot = document.getElementById("shot");
var audioShotE = document.getElementById("shotE");
var audioDeath = document.getElementById("dead");
var audioLose =  document.getElementById("lose");
var audioWin =  document.getElementById("win");
var audioHit =  document.getElementById("hit");



document.addEventListener("keydown", keyDown, false);
document.addEventListener("keyup", keyUp, false);

function getRandomArbitrary(min, max) {

  var a1 = getRandomArbitrary1(min, 0);
  var a2 = getRandomArbitrary1(max - 70, max);
  var a3 = rand(100)
  if ((a3 % 2) == 0) {
    return a1;
  }
  else {
    return a2;
  }
}

function getRandomArbitrary1(min, max) {
  return Math.random() * (max - min) + min;
}

function rand(max) {
  return Math.floor(Math.random() * max);
}

function keyDown(e) {
  if (e.keyCode == 32) {
    pressedSpace = true;
  }
  else if (e.keyCode == 65) {
    pressedRight = true;
  }
  else if (e.keyCode == 68) {
    pressedLeft = true;
  }
  else if (e.keyCode == 87) {
    pressedUp = true;
  }
  else if (e.keyCode == 83) {
    pressedDown = true;
  }
}

function keyUp(e) {
  if (e.keyCode == 32) {
    pressedSpace = false;
  }
  else if (e.keyCode == 65) {
    pressedRight = false;
  }
  else if (e.keyCode == 68) {
    pressedLeft = false;
  }
  else if (e.keyCode == 87) {
    pressedUp = false;
  }
  else if (e.keyCode == 83) {
    pressedDown = false;
  }
}

canvas.addEventListener('mousemove', function (e) {
  var rect = canvas.getBoundingClientRect();
  mouseX = e.clientX;
  mouseY = e.clientY;
  bx = e.clientX - rect.left;
  by = e.clientY - rect.top;
}, false);

var player = {
  timer: 0,
  draw: function (x, y, deg, color) {
    this.radius = 10;
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(deg) * 2 * this.radius,
      y + Math.sin(deg) * 2 * this.radius);
    ctx.stroke();
    ctx.closePath();
  },
  drawLine: function (x, y, deg, color) {
    this.radius = Math.abs(Math.sqrt(Math.pow(x - bx, 2) + Math.pow(y - by, 2))) / 2;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(deg) * 2 * this.radius,
      y + Math.sin(deg) * 2 * this.radius);
    ctx.stroke();
    ctx.closePath();
  },
  drawCircle: function (x, y, color) {
    this.radius = 7;
    ctx.strokeStyle = "#000";
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, this.radius, Math.PI * 2, false);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }
}

function drawCircle(x, y, color) {
  this.radius = 20;
  ctx.strokeStyle = "#000";
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, this.radius, Math.PI * 2, false);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
}

var enemy = {
  draw: function (x, y, deg, color) {
    this.radius = 10;
    ctx.globaAlpha =
      ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(deg) * 2 * this.radius,
      y + Math.sin(deg) * 2 * this.radius);
    ctx.stroke();
    ctx.closePath();
  },
  drawCircle: function (x, y, color) {
    this.radius = 8;
    ctx.strokeStyle = "#000";
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, this.radius, Math.PI * 2, false);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }
}

var bullet = {
  x: 1000,
  y: 1000,
  dx: 0.0,
  dy: 0.0,
  radius: 2.0,

  tick: function () {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x + this.radius < 0.0
      || this.x - this.radius > canvas.width
      || this.y + this.radius < 0.0
      || this.y - this.radius > canvas.height) {
      this.dx = 0.0;
      this.dy = 0.0;
    }
  },

  render: function () {
    ctx.fillStyle = "#003f3f";
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0.0, 2.0 * Math.PI, false);
    ctx.fill();
    ctx.stroke();
  }
};

var bulletEnemy = {
  x: 1000,
  y: 1000,
  dx: 0.0,
  dy: 0.0,
  radius: 2.0,

  tick: function () {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x + this.radius < 0.0
      || this.x - this.radius > canvas.width
      || this.y + this.radius < 0.0
      || this.y - this.radius > canvas.height) {
      this.dx = 0.0;
      this.dy = 0.0;
    }
  },

  render: function () {
    ctx.fillStyle = "#003f3f";
    ctx.strokeStyle = "#d80000";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0.0, 2.0 * Math.PI, false);
    ctx.fill();
    ctx.stroke();
  }
};

function draw() {
  


  if(timerEnemy > 0){
    timerEnemy -= 0.2;
  }
  
  if(timerEnemy <= 0){
    enemyShot();
    timerEnemy = timerEnemyS;
  }

  if (pressedRight) {
    ax -= 3;
  }

  if (pressedLeft) {
    ax += 3;
  }

  if (pressedUp) {
    ay -= 3;
  }
  if (pressedDown) {
    ay += 3;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var angle = Math.atan2(by - ay, bx - ax);
  if (angle < 0) angle += 2 * Math.PI;

  var angle2 = Math.atan2(ay - ey, ax - ex);
  if (angle2 < 0) angle2 += 2 * Math.PI;

  ex += speed * Math.cos(angle2);
  ey += speed * Math.sin(angle2);
  drawCircle(100, 100, '#63fc5e');
  bullet.tick();
  bullet.render();
  bulletEnemy.tick();
  bulletEnemy.render();
  player.drawLine(ax, ay, angle, 'red');
  player.draw(ax, ay, angle, 'black');
  player.drawCircle(ax, ay, 'green');
  enemy.draw(ex, ey, angle2, 'balck');
  enemy.drawCircle(ex, ey, 'red');



  if ((((bullet.x - ex) <= 7) && ((bullet.x - ex) >= -7)) && (((bullet.y - ey) <= 7) && ((bullet.y - ey) >= -7))) {
    test = rand(100);
    if (test % 2 == 0) {
      ex = getRandomArbitrary(-70, canvas.width + 70);
      ey = getRandomArbitrary1(-70, canvas.height + 70);
    }
    else {
      ex = getRandomArbitrary1(-70, canvas.width + 70);
      ey = getRandomArbitrary(-70, canvas.height + 70);
    }
    var hited = true;
    if (true) {
      score++;
      speed += 0.1;
      hited = false;
      timerEnemy = timerEnemyS;
      audioHit.play();
    }

  }

  if (score == 100) {
    audioWin.play();
    alert("YOU WIN");
    ax = 100;
    ay = 100;
    test = rand(100);
    if (test % 2 == 0) {
      ex = getRandomArbitrary(-70, canvas.width + 70);
      ey = getRandomArbitrary1(-70, canvas.height + 70);
    }
    else {
      ex = getRandomArbitrary1(-70, canvas.width + 70);
      ey = getRandomArbitrary(-70, canvas.height + 70);
    }
    score = 0;
    speed = 2;
    pressedMouse = false;
    pressedRight = false;
    pressedLeft = false;
    pressedUp = false;
    pressedDown = false;
    pressedSpace = false;
    timerEnemy = timerEnemyS;
    
  }

  if (((ax - ex) <= 1) && ((ax - ex) >= -1) && ((ay - ey) <= 1) && ((ay - ey) >= -1)) {
    audioDeath.play();
    audioLose.play();
    alert("YOU DEAD");
    ax = 100;
    ay = 100;
    test = rand(100);
    if (test % 2 == 0) {
      ex = getRandomArbitrary(-70, canvas.width + 70);
      ey = getRandomArbitrary1(-70, canvas.height + 70);
    }
    else {
      ex = getRandomArbitrary1(-70, canvas.width + 70);
      ey = getRandomArbitrary(-70, canvas.height + 70);
    }
    score = 0;
    speed = 2;
    pressedMouse = false;
    pressedRight = false;
    pressedLeft = false;
    pressedUp = false;
    pressedDown = false;
    pressedSpace = false;
    timerEnemy = timerEnemyS;
    
  }

  if ((((bulletEnemy.x - ax) <= 6) && ((bulletEnemy.x - ax) >= -6)) && (((bulletEnemy.y - ay) <= 6) && ((bulletEnemy.y - ay) >= -6))) {
    audioDeath.play();
    audioLose.play();
    alert("YOU DEAD");
    ax = 100;
    ay = 100;
    test = rand(100);
    if (test % 2 == 0) {
      ex = getRandomArbitrary(-70, canvas.width + 70);
      ey = getRandomArbitrary1(-70, canvas.height + 70);
    }
    else {
      ex = getRandomArbitrary1(-70, canvas.width + 70);
      ey = getRandomArbitrary(-70, canvas.height + 70);
    }
    score = 0;
    speed = 2;
    pressedMouse = false;
    pressedRight = false;
    pressedLeft = false;
    pressedUp = false;
    pressedDown = false;
    pressedSpace = false;
    timerEnemy = timerEnemyS;
    
  }

  scoreP.innerHTML = "score is " + score;
}



function enemyShot() {
  
  var x = ax - ex;
  var y = ay - ey;
  var angle = Math.atan2(ay - ey, ax - ex);
  if (angle < 0) angle += 2 * Math.PI;
  // Using pythagoras' theorm to find the distance (the length of the vector)
  var l = Math.sqrt(x * x + y * y);

  // Dividing by the distance gives a normalized vector whose length is 1
  x = x / l;
  y = y / l;

  // Reset bullet position
  bulletEnemy.x = ex;
  bulletEnemy.y = ey;


  // Get the bullet to travel towards the mouse pos with a new speed of 10.0 (you can change this)
  bulletEnemy.dx = x * 10.0;
  bulletEnemy.dy = y * 10.0;
  audioShotE.play();
}

window.onmousedown = function (e) {
  // The mouse pos - the player pos gives a vector
  // that points from the player toward the mouse
  var x = bx - ax;
  var y = by - ay;
  var angle = Math.atan2(by - ay, bx - ax);
  if (angle < 0) angle += 2 * Math.PI;
  // Using pythagoras' theorm to find the distance (the length of the vector)
  var l = Math.sqrt(x * x + y * y);

  // Dividing by the distance gives a normalized vector whose length is 1
  x = x / l;
  y = y / l;

  // Reset bullet position
  bullet.x = ax;
  bullet.y = ay;


  // Get the bullet to travel towards the mouse pos with a new speed of 10.0 (you can change this)
  bullet.dx = x * 10.0;
  bullet.dy = y * 10.0;
  audioShot.play();
}


setInterval(draw, 1000 / 60);
