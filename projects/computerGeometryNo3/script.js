let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;


let mult = 30;

let x_axis_distance_grid_lines = Math.floor(height / mult / 2);
let y_axis_distance_grid_lines = Math.floor(width / mult / 2);


let lastDCenter = 0;

ctx.translate(y_axis_distance_grid_lines * mult, x_axis_distance_grid_lines * mult);

let ai;
let n = 20;

let d1;
let d2;

changeData();

let k = 1;

let xi = 0;
let yi = 0;
let prevAngle = 0;


console.log(ai);
console.log(k + "  d1: " + d1 + " F(d1): " + F(d1) + " d2: " + d2 + " F(d2): " + F(d2));



function F(d) {
    let sum = 0;
    for (i = 0; i < 5; i++) {
        sum += Math.asin(ai[i] / d);
    }
    sum -= Math.PI / 2;
    return sum;
}

function prebl() {
    let dCenter = d1 + Math.abs(d2 - d1) / 2;
    let f1 = F(d1);
    let f2 = F(d2);
    let fc = F(dCenter);
    if (f1 * fc < 0) {
        d2 = dCenter;
        lastDCenter = dCenter;
        f2 = fc;
    }
    else if (f2 * fc < 0) {
        d1 = dCenter;
        lastDCenter = dCenter;
        f1 = fc;
    }
    k++;
    console.log(k + " d1: " + d1 + " F(d1): " + f1 + " d2: " + d2 + " F(d2): " + f2);
}

function drawCircle(R) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, R * mult, 0, Math.PI * 2, true);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#557fdabd";
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = "#a52a2a";
    ctx.moveTo(-R * mult, 0);
    ctx.lineTo(R * mult, 0);
    ctx.stroke();


    let x = R;
    let y = 0;
    let prevAngle = 0;
    let prevX = R;
    let prevY = 0;

    for (i = 0; i < 5; i++) {
        prevAngle += findAngle(ai[i], R);
        ctx.beginPath();
        ctx.strokeStyle = "#a52a2a";
        ctx.moveTo(prevX * mult, prevY * mult);
        xi = x * Math.cos(-prevAngle) - y * Math.sin(-prevAngle);
        yi = x * Math.sin(-prevAngle) + y * Math.cos(-prevAngle);
        ctx.lineTo(xi * mult, yi * mult);

        prevX = xi;
        prevY = yi;
        ctx.stroke();
    }
}

function findAngle(aSide, R) {
    let z = (2 * R * R - aSide * aSide) / (2 * R * R);
    let Angle = Math.acos(z);
    //Angle = Angle * (180 / Math.PI);

    return Angle;
}

function changeData(){
    ai = [parseInt(document.getElementById("a1").value), parseInt(document.getElementById("a2").value), parseInt(document.getElementById("a3").value), parseInt(document.getElementById("a4").value), parseInt(document.getElementById("a5").value)];
    d1 = (ai[1] + ai[2] + ai[3] + ai[4] + ai[0]) / 2;
    d2 = ai[1] + ai[2] + ai[3] + ai[4] + ai[0];

    ctx.clearRect(-width / 2, -height / 2, width * mult, height * mult);

    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#a52a2a";
    ctx.moveTo(-(width / 2) + 200, -(height / 2) + 50);
    ctx.lineTo(-(width / 2) + 200 + ai[0] * mult, -(height / 2) + 50);
    ctx.stroke()
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#a52a2a";
    ctx.moveTo(-(width / 2) + 200, -(height / 2) + 100);
    ctx.lineTo(-(width / 2) + 200 + ai[1] * mult, -(height / 2) + 100);
    ctx.stroke()
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#a52a2a";
    ctx.moveTo(-(width / 2) + 200, -(height / 2) + 150);
    ctx.lineTo(-(width / 2) + 200 + ai[2] * mult, -(height / 2) + 150);
    ctx.stroke()
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#a52a2a";
    ctx.moveTo(-(width / 2) + 200, -(height / 2) + 200);
    ctx.lineTo(-(width / 2) + 200 + ai[3] * mult, -(height / 2) + 200);
    ctx.stroke()
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#a52a2a";
    ctx.moveTo(-(width / 2) + 200, -(height / 2) + 250);
    ctx.lineTo(-(width / 2) + 200 + ai[4] * mult, -(height / 2) + 250);
    ctx.stroke()
    ctx.closePath();
}


function startAlgorithm() {
    changeData()
    while (k < n) {
        prebl();
    }
    drawCircle(lastDCenter / 2);
}




