let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
let rLess = document.getElementById('rLess');

let sartBut = document.getElementById('start');
let stopBut = document.getElementById('stop');

let R = 7;
let r = 1;
let mult = 17;
let speed = 0.01;

let t = 0;
let x = R;
let y = 0;

console.log(typeof(rLess.value));
var x_axis_distance_grid_lines = Math.floor(height / mult / 2);
var y_axis_distance_grid_lines = Math.floor(width / mult / 2);

ctx.translate(y_axis_distance_grid_lines * mult, x_axis_distance_grid_lines * mult);

function epis(t) {
    x = (R + r) * Math.cos(t) - r * Math.cos((R + r) * (t / r));
    y = (R + r) * Math.sin(t) - r * Math.sin((R + r) * (t / r));

}

function draw() {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#4e1128";
    ctx.moveTo(x * mult, y * mult);
    epis(t);
    ctx.lineTo(x * mult, y * mult);
    ctx.stroke();
    t += speed;
    updateRless();
}

function drawCircle() {
    ctx.arc(0, 0, R * mult, 0, Math.PI * 2, true);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#2929df";
    ctx.stroke();
}


function updateRless() {
    r = parseFloat(rLess.value);

}
drawCircle();

let timerId;
function start(){
    updateRless();

    timerId = setInterval(draw, 1000 / 60);
}

function stop(){
    clearInterval(timerId);
}

