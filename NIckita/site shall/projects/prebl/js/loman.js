var canvas = document.getElementById('can');
var ctx = canvas.getContext('2d');
document.body.style.background = "url(" + canvas.toDataURL("image/jpeg", 0.5) + ")";
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
var gridSize = 17;
var a = -5;
var b = 3;
var step = 0.01;
var shtrihLines = 7;
var countDivs = 1;
var eps = 0.1;

var cont = document.getElementById('contanier');
var closeBut = document.getElementById('close');
var butEx = document.getElementById('ex');
var butX2 = document.getElementById('x2');
var butMinusX2 = document.getElementById('-x2');
var butX2Ex = document.getElementById('x2ex');
var stepBack = document.getElementById('prevStep');
var stepNext = document.getElementById('nextStep');
var start = document.getElementById('start');
var stop = document.getElementById('stop');

var inputA = document.getElementById('a1');
var inputB = document.getElementById('b1');
var inputEps = document.getElementById('e1');

var countInp = document.getElementById('count');
var priblMax = document.getElementById('pribl');

var flag = false;

var inter;
var currentFunction = 'par';


window.onresize = () => {
    drawAll()
}

function inout() {

    cont.classList.toggle("in");
    cont.classList.toggle("out");
    if (cont.classList.contains("in")) {
        closeBut.innerHTML = '>>';
    }
    else {
        closeBut.innerHTML = 'X';
    }
}

window.onkeydown = (event) => {
    if (event.key == 'q') {
        gridSize += 5;
        drawAll()
    }
    if (event.key == 'e') {
        gridSize -= 5;
        drawAll()
    }


}

function ex(x) {
    return Math.exp(x);
}

function par(x) {
    return Math.pow(x, 2);
}

function tan(x) {
    return Math.pow(x, 3);
}

function tan1(x) {
    return Math.pow(x, 4);
}

function parMinus(x) {
    return -Math.pow(x, 2);
}

function some(x) {
    return par(x) * ex(x);
}

function some1(x) {
    return Math.pow(par(x), ex(x));
}

function some1(x) {
    return Math.pow(x, x);
}

function drawFunc(func) {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#4e1128";
    let e = func(a);
    ctx.moveTo(a * gridSize, -e * gridSize);

    for (let i = a + step; i <= b; i += step) {
        e = func(i);
        ctx.lineTo(i * gridSize, -e * gridSize)
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(i * gridSize, -e * gridSize);
    }
}

function linear(x1, x2, y1, y2, x) {
    return (y2 - y1) / (x2 - x1) * x + y1 - (y2 - y1) / (x2 - x1) * x1
}

function drawLines(func) {
    countInp.innerHTML = countDivs;
    let steps = Math.abs((a - b)) / countDivs;
    let e = func(a);
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#e40f0f";
    ctx.fillStyle = '#2828bd';
    ctx.moveTo(a * gridSize, -e * gridSize);
    ctx.fillRect(a * gridSize, -e * gridSize, 5, 5);
    let maxDist = 0;
    let prev;
    for (let j = a; j <= b; j += steps) {
        prev = j - steps;
        e = func(j);
        ctx.lineTo(j * gridSize, -e * gridSize);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(j * gridSize, -e * gridSize);
        ctx.fillRect(j * gridSize, -e * gridSize, 5, 5);
        for (let i = prev; i <= j; i += step) {
            let dist = Math.sqrt(Math.pow(i - i, 2) + Math.pow((func(i) - linear(prev, j, func(prev), func(j), i)), 2))
            if (dist > maxDist) maxDist = dist;
        }
        prev = j;
    }
    prev;
    e = func(b);
    ctx.lineTo(b * gridSize, -e * gridSize);
    ctx.stroke();
    ctx.fillRect(b * gridSize, -e * gridSize, 5, 5);
    for (let i = prev; i <= b; i += step) {
        let dist = Math.sqrt(Math.pow(i - i, 2) + Math.pow((func(i) - linear(prev, b, func(prev), func(b), i)), 2))
        if (dist > maxDist) maxDist = dist;
    }
    if (Math.abs(maxDist) <= eps) {
        clearInterval(inter);
        console.log("Da steps: " + countDivs);
        flag = true;
    }
    else {
        flag = false;
    }
    priblMax.innerHTML = maxDist;
}

function drawAxis() {

    let num_x_lines = Math.floor(height / gridSize);
    let num_y_lines = Math.floor(width / gridSize);
    var x_axis_distance_grid_lines = Math.floor(height / gridSize / 2);
    var y_axis_distance_grid_lines = Math.floor(width / gridSize / 2);
    for (let i = 0; i <= num_x_lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;


        if (i == x_axis_distance_grid_lines)
            ctx.strokeStyle = "#000000";
        else
            ctx.strokeStyle = "#e9e9e9";

        if (i == num_x_lines) {
            ctx.moveTo(0, gridSize * i);
            ctx.lineTo(width, gridSize * i);
        }
        else {
            ctx.moveTo(0, gridSize * i + 0.5);
            ctx.lineTo(width, gridSize * i + 0.5);
        }
        ctx.stroke();
    }

    for (let i = 0; i <= num_y_lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;


        if (i == y_axis_distance_grid_lines)
            ctx.strokeStyle = "#000000";
        else
            ctx.strokeStyle = "#e9e9e9";

        if (i == num_y_lines) {
            ctx.moveTo(gridSize * i, 0);
            ctx.lineTo(gridSize * i, height);
        }
        else {
            ctx.moveTo(gridSize * i + 0.5, 0);
            ctx.lineTo(gridSize * i + 0.5, height);
        }
        ctx.stroke();
    }

    ctx.translate(y_axis_distance_grid_lines * gridSize, x_axis_distance_grid_lines * gridSize);

    for (i = 1; i < (num_y_lines - y_axis_distance_grid_lines); i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";


        ctx.moveTo(gridSize * i + 0.5, -shtrihLines);
        ctx.lineTo(gridSize * i + 0.5, shtrihLines);
        ctx.stroke();
    }


    for (i = 1; i < y_axis_distance_grid_lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";


        ctx.moveTo(-gridSize * i + 0.5, -shtrihLines);
        ctx.lineTo(-gridSize * i + 0.5, shtrihLines);
        ctx.stroke();
    }

    for (i = 1; i < (num_x_lines - x_axis_distance_grid_lines); i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";


        ctx.moveTo(-shtrihLines, gridSize * i + 0.5);
        ctx.lineTo(shtrihLines, gridSize * i + 0.5);
        ctx.stroke();
    }


    for (i = 1; i < x_axis_distance_grid_lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";


        ctx.moveTo(-shtrihLines, -gridSize * i + 0.5);
        ctx.lineTo(shtrihLines, -gridSize * i + 0.5);
        ctx.stroke();
    }
}

drawAll();

function startDraw() {
    applySetting();
    console.log(flag);
    if (!flag) {
        inter = setInterval(countSteps, 1000)
    }
}

function stopDraw() {
    clearInterval(inter);
}

function countSteps() {
    countDivs++;
    drawAll();
    console.log(countDivs);
}

function changeOnPar() {
    currentFunction = 'par';
    flag = false;
    countDivs = 1;
    stopDraw();
    drawAll();
}

function changeOnMinusPar() {
    currentFunction = 'parMinus';
    flag = false;
    countDivs = 1;
    stopDraw();
    drawAll();
}

function changeOnPar3() {
    currentFunction = 'tan';
    flag = false;
    countDivs = 1;
    stopDraw();

    drawAll();
}

function changeOnEx() {
    currentFunction = 'ex';
    flag = false;
    countDivs = 1;
    stopDraw();

    drawAll();
}

function changeOnSome() {
    currentFunction = 'some';
    flag = false;
    countDivs = 1;
    stopDraw();
    drawAll();
}

function stepPrev() {
    applySetting();
    stopDraw();
    if (countDivs > 1) {
        countDivs--;
    }
    drawAll();
}

function nextStep() {
    if (!flag) {
        applySetting();
        stopDraw();
        countDivs++;
        drawAll();
    }
}

function applySetting() {
    if (inputA.value && inputB.value) {
        a = parseFloat(inputA.value);
        b = parseFloat(inputB.value);
    }
    if (inputEps.value) {
        eps = parseFloat(inputEps.value);
    }
    drawAll();
}

function drawAll() {
    ctx.clearRect(0, 0, width, height);
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    drawAxis()
    drawFunc(eval(currentFunction));
    drawLines(eval(currentFunction));
}
