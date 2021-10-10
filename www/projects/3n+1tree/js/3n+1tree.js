

function init() {
    var canvas = document.getElementById("can");
    var ctx = canvas.getContext("2d");
    var menu = document.getElementById('content');
    menu.classList.remove('display-flex');
    menu.classList.add('display-none');
    canvas.classList.remove('display-none');

    var degGrad = 90;

    var color11 = 185, switch11 = 1;
    var color12 = 94, switch12 = -1;
    var color13 = 212, switch13 = 1;
    var color21 = 255, switch21 = -1;
    var color22 = 104, switch22 = 1;
    var color23 = 216, switch23 = -1;
    var color31 = 242, switch31 = 1;
    var color32 = 191, switch32 = 1;
    var color33 = 232, switch33 = -1;
    var color41 = 9, switch41 = 5;
    var color42 = 236, switch42 = 2;
    var color43 = 179, switch43 = 1;
    var firstNum = document.getElementById('first-num').value;
    var secondNum = document.getElementById('second-num').value;
    var angleChetFirst = document.getElementById('angle-chet-first').value;
    var angleChetSecond = document.getElementById('angle-chet-second').value;
    var angleNechetFirst = document.getElementById('angle-nechet-first').value;
    var angleNechetSecond = document.getElementById('angle-nechet-second').value;



    var num1 = firstNum;
    var num2 = secondNum;
    var mas = [];
    var angleChet;
    var angleNechet;
    var time = 1000 / 30;

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
    }

    function calcPos(number) {
        mas.push(number);
        if (number == 1) {
            return
        }
        else if (number % 2 == 0) {
            calcPos(number / 2);
            return;
        }
        else {
            calcPos(number * 3 + 1);
            return;
        }
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));

    async function draw(branch) {
        let len = branch.length;
        let i = len - 2;
        let minusY = 50;
        let minusX = 50;
        let x = 200;
        let y = canvas.height - 100;
        let x1 = x - minusX;
        let y1 = y - minusY;
        let width = 7;
        let minusWidth = 0.3;
        let colorBranch = 'rgba(' + color41 + ',' + color42 + ',' + color43 + ', 0.6)';
        ctx.lineWidth = width;
        ctx.strokeStyle = colorBranch;
        ctx.beginPath();
        ctx.lineTo(x, y);
        ctx.lineTo(x1, y1);
        ctx.stroke();
        for (i; i >= 0; i--) {
            if (branch[i] % 2 == 0) {
                if (width > 2) {
                    width -= minusWidth;
                }
                minusX = x - x1;
                minusY = y - y1;
                x = x1;
                y = y1;
                x1 = x - minusX;
                y1 = y - minusY;
                angleChet = getRandomInt(angleChetFirst, angleChetSecond);
                x1 = x + (x1 - x) * Math.cos(Math.PI / 180 * angleChet) - (y1 - y) * Math.sin(Math.PI / 180 * angleChet);
                y1 = y + (x1 - x) * Math.sin(Math.PI / 180 * angleChet) + (y1 - y) * Math.cos(Math.PI / 180 * angleChet);
                ctx.lineWidth = width;

                ctx.beginPath();
                ctx.lineTo(x, y);
                ctx.lineTo(x1, y1);
                ctx.stroke();
                await delay(time);
                if (branch[i] == num2) {
                    console.log("Done!");
                }
            }
            else {
                if (width > 2) {
                    width -= minusWidth;
                }
                minusX = x - x1;
                minusY = y - y1;
                x = x1;
                y = y1;
                x1 = x - minusX;
                y1 = y - minusY;
                angleNechet = getRandomInt(angleNechetFirst, angleNechetSecond);
                x1 = x + (x1 - x) * Math.cos(Math.PI / 180 * angleNechet) - (y1 - y) * Math.sin(Math.PI / 180 * angleNechet);
                y1 = y + (x1 - x) * Math.sin(Math.PI / 180 * angleNechet) + (y1 - y) * Math.cos(Math.PI / 180 * angleNechet);
                ctx.lineWidth = width;

                ctx.beginPath();
                ctx.lineTo(x, y);
                ctx.lineTo(x1, y1);
                ctx.stroke();
                await delay(time);
                if (branch[i] == num2) {
                    console.log("Done!");
                }
            }



        }
        if (color41 + 1 > 255) {
            switch41 *= -1;
        }
        if (color42 + 1 > 255) {
            switch42 *= -1;
        }
        if (color43 + 1 > 255) {
            switch43 *= -1;
        }
        if (color11 + 1 > 255) {
            switch11 *= -1;
        }
        if (color12 + 1 > 255) {
            switch12 *= -1;
        }
        if (color13 + 1 > 255) {
            switch13 *= -1;
        }
        if (color21 + 1 > 255) {
            switch21 *= -1;
        }
        if (color22 + 1 > 255) {
            switch22 *= -1;
        }
        if (color23 + 1 > 255) {
            switch23 *= -1;
        }
        if (color31 + 1 > 255) {
            switch31 *= -1;
        }
        if (color32 + 1 > 255) {
            switch32 *= -1;
        }
        if (color33 + 1 > 255) {
            switch33 *= -1;
        }

        if (color41 - 1 < 0) {
            switch41 *= -1;
        }
        if (color42 - 1 < 0) {
            switch42 *= -1;
        }
        if (color43 - 1 < 0) {
            switch43 *= -1;
        }
        if (color11 - 1 < 50) {
            switch11 *= -1;
        }
        if (color12 - 1 < 40) {
            switch12 *= -1;
        }
        if (color13 - 1 < 100) {
            switch13 *= -1;
        }
        if (color21 - 1 < 90) {
            switch21 *= -1;
        }
        if (color22 - 1 < 60) {
            switch22 *= -1;
        }
        if (color23 - 1 < 30) {
            switch23 *= -1;
        }
        if (color31 - 1 < 0) {
            switch31 *= -1;
        }
        if (color32 - 1 < 10) {
            switch32 *= -1;
        }
        if (color33 - 1 < 80) {
            switch33 *= -1;
        }
        if (degGrad + 1 > 360) {
            degGrad = 0;
        }

        degGrad++;
        color11 += switch11;
        color12 += switch12;
        color13 += switch13;
        color21 += switch21;
        color22 += switch22;
        color23 += switch23;
        color31 += switch31;
        color32 += switch32;
        color33 += switch33;
        color41 += switch41;
        color42 += switch42;
        color43 += switch43;
        let color = 'linear-gradient(' + degGrad + 'deg, rgb(' + color11 + ',' + color12 + ',' + color13 + ') 0%, rgb(' + color31 + ',' + color22 + ',' + color23 + ') 12%, rgb(' + color31 + ',' + color32 + ',' + color33 + ') 93%)';
        canvas.style.backgroundImage = color;
    }

    function startDraw(i) {
        if (i <= num2) {
            calcPos(i);
            draw(mas);
            mas = [];
        }
        i++;
        setTimeout(startDraw, time, i);

    }

    startDraw(num1);

}

