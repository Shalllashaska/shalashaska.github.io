let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;


let R = 7;
let r = 1;
let mult = 100;
let speed = 0.01;

let count = 0;

let a = 3;
let b = 2;

let t0 = 0;

let x0 = -2;
let y0 = -b * Math.pow(1 - Math.pow(x0, 2) / Math.pow(a, 2),1/2);

let u0 = 1 / 2;
let v0 = Math.sqrt(1 - Math.pow(u0, 2));

let tn = t0;

let xn = x0;
let yn = y0;
let un = u0;
let vn = v0;

let lybda = 1/(a*a);
let nu =1/(b*b);
console.log(y0);
console.log(v0);



var x_axis_distance_grid_lines = Math.floor(height / mult / 2);
var y_axis_distance_grid_lines = Math.floor(width / mult / 2);

ctx.translate(y_axis_distance_grid_lines * mult, x_axis_distance_grid_lines * mult);

function draw() {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#4e1128";
    ctx.moveTo(x * mult, y * mult);
    epis(t);
    ctx.lineTo(x * mult, y * mult);
    ctx.stroke();
    t += speed;
}

function drawElips() {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#2929df";
    ctx.ellipse(0, 0, a * mult, b * mult, 0, 0, 2 * Math.PI);
    ctx.stroke();
}

function drawTrace() {
    //считаем следующие точки
    tn = -2 * ((lybda * xn * un + nu * yn * vn) / (lybda * Math.pow(un, 2) + nu * Math.pow(vn, 2)));
    let xn1 = xn + tn * un;
    let yn1 = yn + tn * vn;
    //рисуем линию
    ctx.beginPath();
    ctx.strokeStyle = "#c23a3a";
    ctx.moveTo(xn * mult, yn * mult);
    ctx.lineTo(xn1 * mult, yn1 * mult);
    ctx.stroke();
    //приравние точки и скорости
    xn = xn1;
    yn = yn1;

    let an1 = -(lybda * xn1) / (Math.sqrt(Math.pow(lybda * xn1, 2) + Math.pow(nu * yn1, 2)));
    let bn1 = -(nu * yn1) / (Math.sqrt(Math.pow(lybda * xn1, 2) + Math.pow(nu * yn1, 2)));

    let un1 = un - 2 * (an1 * un + bn1 * vn) * an1;
    let vn1 = vn - 2 * (an1 * un + bn1 * vn) * bn1;

    un = un1;
    vn = vn1;
    console.log(count);
    if(count == 500){
        clearInterval(inter);
    }
    count++;
}


drawElips();

let inter = setInterval(drawTrace, 500);