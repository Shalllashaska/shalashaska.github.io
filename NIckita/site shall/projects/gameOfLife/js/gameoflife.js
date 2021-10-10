var canvas = document.getElementById("can");
var ctx = canvas.getContext("2d");
var popS = document.getElementById("popS");
var genS = document.getElementById("genS");
var time = document.getElementById("t");
var birth = document.getElementById("b");
var survive = document.getElementById("s");

var cWidth = canvas.clientWidth
var cHeight = canvas.clientHeight;

var w = Math.floor(cWidth / 10);
var h = Math.floor(cHeight / 10);

var mas = [];

var b = birth;
var s = [];
var t = time;
var timer;
var countGen = 0;
var countPop = 0;
var neighbors = 0;

canvas.addEventListener("mousedown", drawStart);
canvas.addEventListener("mouseup", drawCancel);

window.addEventListener("keydown", eraseKeyD);
window.addEventListener("keyup", eraseKeyU);


function surviveMath(evs) {
    let b = evs.value;
    let a;
    while (b % 10 != 0) {
        a = b % 10;
        s.push(a);
        b = Math.floor(b / 10);
    }
    console.log(s);
}

function applySetting() {
    s = [];
    surviveMath(survive);
    b = birth.value;
    t = time.value;
    
}


function eraseStart(ev) {
    mouseErase(ev);
    canvas.addEventListener("mousemove", mouseErase);
}

function drawCancel() {
    canvas.removeEventListener("mousemove", mouseDraw);
}

function drawStart(ev) {
    mouseDraw(ev);
    canvas.addEventListener("mousemove", mouseDraw);
}

function eraseKeyD(e) {
    if (e.keyCode == 69) {
        canvas.removeEventListener("mousedown", drawStart);
        canvas.addEventListener("mousedown", eraseStart);
    }
}
function eraseKeyU(e) {
    if (e.keyCode == 69) {
        console.log(e.keyCode);
        canvas.removeEventListener("mousedown", eraseStart);
        canvas.addEventListener("mousedown", drawStart);
    }
}

function mouseErase(event) {
    var x = event.offsetX;
    var y = event.offsetY;
    if (mas[Math.floor(y / 10)][Math.floor(x / 10)] == 1) {
        mas[Math.floor(y / 10)][Math.floor(x / 10)] = 0;
        countPop--;
        popS.innerHTML = countPop;
    }
    drawField();
    drawGrid();
}

function mouseDraw(event) {
    var x = event.offsetX;
    var y = event.offsetY;
    if (mas[Math.floor(y / 10)][Math.floor(x / 10)] == 0) {
        mas[Math.floor(y / 10)][Math.floor(x / 10)] = 1;
        countPop++;
        popS.innerHTML = countPop;
    }
    drawField();
    drawGrid();
}

function goLife() {
    for (let i = 0; i <= h; i++) {
        mas[i] = [];
        for (let j = 0; j <= w; j++) {
            mas[i][j] = 0;
        }
    }
}

goLife();
drawGrid();

function drawGrid() {
    ctx.strokeStyle = "grey";

    for (let i = 1; i < h; i++) {
        ctx.beginPath();
        ctx.lineTo(i * 10, 0);
        ctx.lineTo(i * 10, cHeight);
        ctx.stroke();
    }
    for (let i = 1; i < w; i++) {
        ctx.beginPath();
        ctx.lineTo(0, i * 10);
        ctx.lineTo(cWidth, i * 10);
        ctx.stroke();
    }

}

function drawField() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            if (mas[i][j] == 1) {
                ctx.fillRect(j * 10, i * 10, 10, 10);
            }
        }
    }
}

function checkN (masn){
    for(let i = 0; i < masn.length; i++){
        if(neighbors ==  masn[i]){
            return true;
        }
    }
    return false;
}

function startLife() {
    let mas2 = []
    countPop = 0;
    for (let i = 0; i <= h; i++) {
        mas2[i] = [];
        for (let j = 0; j <= w; j++) {
            if (mas[i][j] == 1) {
                neighbors = 0;
                if ((i == 0) && (j > 0) && (j < w)) {
                    if (mas[i][j - 1] == 1) neighbors++;
                    if (mas[i + 1][j - 1] == 1) neighbors++;
                    if (mas[i + 1][j] == 1) neighbors++;
                    if (mas[i + 1][j + 1] == 1) neighbors++;
                    if (mas[i][j + 1] == 1) neighbors++;
                }
                else if ((i == h) && (j > 0) && (j < w)) {
                    if (mas[i][j - 1] == 1) neighbors++;
                    if (mas[i - 1][j - 1] == 1) neighbors++;
                    if (mas[i - 1][j] == 1) neighbors++;
                    if (mas[i - 1][j + 1] == 1) neighbors++;
                    if (mas[i][j + 1] == 1) neighbors++;
                }
                else if ((j == 0) && (i > 0) && (i < h)) {
                    if (mas[i - 1][j] == 1) neighbors++;
                    if (mas[i - 1][j + 1] == 1) neighbors++;
                    if (mas[i][j + 1] == 1) neighbors++;
                    if (mas[i + 1][j + 1] == 1) neighbors++;
                    if (mas[i + 1][j] == 1) neighbors++;
                }
                else if ((j == w) && (i > 0) && (i < h)) {
                    if (mas[i - 1][j] == 1) neighbors++;
                    if (mas[i - 1][j - 1] == 1) neighbors++;
                    if (mas[i][j - 1] == 1) neighbors++;
                    if (mas[i + 1][j - 1] == 1) neighbors++;
                    if (mas[i + 1][j] == 1) neighbors++;
                }
                else if ((j == 0) && (i == 0)) {
                    if (mas[i][j + 1] == 1) neighbors++;
                    if (mas[i + 1][j + 1] == 1) neighbors++;
                    if (mas[i + 1][j] == 1) neighbors++;
                }
                else if ((j == w) && (i == h)) {
                    if (mas[i][j - 1] == 1) neighbors++;
                    if (mas[i - 1][j - 1] == 1) neighbors++;
                    if (mas[i - 1][j] == 1) neighbors++;
                }
                else if ((j == 0) && (i == h)) {
                    if (mas[i][j - 1] == 1) neighbors++;
                    if (mas[i - 1][j + 1] == 1) neighbors++;
                    if (mas[i][j + 1] == 1) neighbors++;
                }
                else if ((j == w) && (i == 0)) {
                    if (mas[i][j - 1] == 1) neighbors++;
                    if (mas[i + 1][j - 1] == 1) neighbors++;
                    if (mas[i + 1][j] == 1) neighbors++;
                }
                else if ((j > 0) && (j < w) && (i > 0) && (i < h)) {
                    if (mas[i - 1][j + 1] == 1) neighbors++;
                    if (mas[i - 1][j] == 1) neighbors++;
                    if (mas[i - 1][j - 1] == 1) neighbors++;
                    if (mas[i][j - 1] == 1) neighbors++;
                    if (mas[i][j + 1] == 1) neighbors++;
                    if (mas[i + 1][j - 1] == 1) neighbors++;
                    if (mas[i + 1][j] == 1) neighbors++;
                    if (mas[i + 1][j + 1] == 1) neighbors++;
                }
                if (checkN(s)) {
                    mas2[i][j] = 1;
                    countPop++;
                    popS.innerHTML = countPop;
                }
                else {
                    mas2[i][j] = 0;
                }
            }
            else {
                neighbors = 0;
                if ((i == 0) && (j > 0) && (j < w)) {
                    if (mas[i][j - 1] == 1) neighbors++;
                    if (mas[i + 1][j - 1] == 1) neighbors++;
                    if (mas[i + 1][j] == 1) neighbors++;
                    if (mas[i + 1][j + 1] == 1) neighbors++;
                    if (mas[i][j + 1] == 1) neighbors++;
                }
                else if ((i == h) && (j > 0) && (j < w)) {
                    if (mas[i][j - 1] == 1) neighbors++;
                    if (mas[i - 1][j - 1] == 1) neighbors++;
                    if (mas[i - 1][j] == 1) neighbors++;
                    if (mas[i - 1][j + 1] == 1) neighbors++;
                    if (mas[i][j + 1] == 1) neighbors++;
                }
                else if ((j == 0) && (i > 0) && (i < h)) {
                    if (mas[i - 1][j] == 1) neighbors++;
                    if (mas[i - 1][j + 1] == 1) neighbors++;
                    if (mas[i][j + 1] == 1) neighbors++;
                    if (mas[i + 1][j + 1] == 1) neighbors++;
                    if (mas[i + 1][j] == 1) neighbors++;
                }
                else if ((j == w) && (i > 0) && (i < h)) {
                    if (mas[i - 1][j] == 1) neighbors++;
                    if (mas[i - 1][j - 1] == 1) neighbors++;
                    if (mas[i][j - 1] == 1) neighbors++;
                    if (mas[i + 1][j - 1] == 1) neighbors++;
                    if (mas[i + 1][j] == 1) neighbors++;
                }
                else if ((j == 0) && (i == 0)) {
                    if (mas[i][j + 1] == 1) neighbors++;
                    if (mas[i + 1][j + 1] == 1) neighbors++;
                    if (mas[i + 1][j] == 1) neighbors++;
                }
                else if ((j == w) && (i == h)) {
                    if (mas[i][j - 1] == 1) neighbors++;
                    if (mas[i - 1][j - 1] == 1) neighbors++;
                    if (mas[i - 1][j] == 1) neighbors++;
                }
                else if ((j == 0) && (i == h)) {
                    if (mas[i][j - 1] == 1) neighbors++;
                    if (mas[i - 1][j + 1] == 1) neighbors++;
                    if (mas[i][j + 1] == 1) neighbors++;
                }
                else if ((j == w) && (i == 0)) {
                    if (mas[i][j - 1] == 1) neighbors++;
                    if (mas[i + 1][j - 1] == 1) neighbors++;
                    if (mas[i + 1][j] == 1) neighbors++;
                }
                else if ((j > 0) && (j < w) && (i > 0) && (i < h)) {
                    if (mas[i - 1][j + 1] == 1) neighbors++;
                    if (mas[i - 1][j] == 1) neighbors++;
                    if (mas[i - 1][j - 1] == 1) neighbors++;
                    if (mas[i][j - 1] == 1) neighbors++;
                    if (mas[i][j + 1] == 1) neighbors++;
                    if (mas[i + 1][j - 1] == 1) neighbors++;
                    if (mas[i + 1][j] == 1) neighbors++;
                    if (mas[i + 1][j + 1] == 1) neighbors++;
                }
                if (neighbors == b) {
                    mas2[i][j] = 1;
                    countPop++;
                    popS.innerHTML = countPop;
                }
                else {
                    mas2[i][j] = 0;
                }
            }
        }
    }
    mas = mas2;
    countGen++;
    genS.innerHTML = countGen;
    drawField();
    drawGrid();
    timer = setTimeout(startLife, t);
}

function stopLife() {
    clearTimeout(timer);
}

function nextStep() {
    startLife();
    stopLife();
}

function clear() {
    goLife();
    drawField();
    drawGrid();

    stopLife();
    countPop = 0;
    countGen = 0;
    genS.innerHTML = countGen;
    popS.innerHTML = countPop;
}
applySetting();
document.getElementById("t").onblur = applySetting;
document.getElementById("b").onblur = applySetting;
document.getElementById("s").onblur = applySetting;
document.getElementById("start").onclick = startLife;
document.getElementById("stop").onclick = stopLife;
document.getElementById("nextStep").onclick = nextStep;
document.getElementById("clear").onclick = clear;