var container = document.getElementById('container-bar-wrapper');
var containerMain = document.getElementById('container');
var task = document.getElementById('task-num');
var level = document.getElementById('level');
var score = document.getElementById('score');
var mult = document.getElementById('mult');
var time = document.getElementById('time');
var startmenu = document.getElementById('start-menu');
var startbut = document.getElementById('start-but');
var menubar = document.getElementById('menu-bar');
var endmenu = document.getElementById('end-menu');
var againbut = document.getElementById('again-but');
var scoreend = document.getElementById('score-end');

function countStart(){
    
    startmenu.classList.remove('display-none');
    endmenu.classList.add('display-none');
    let sec = 3;
    startbut.innerHTML = sec;
    startbut.style.color ='whitesmoke';
    let timer = setInterval(function(){
        startbut.innerHTML = sec;
        if(sec > 0){
            sec--;
        }
        else{
            clearInterval(timer);
            init();
        }
    }, 1000);

}

function init() {
    startmenu.classList.add('display-none');
    menubar.classList.remove('display-none');
    menubar.classList.add('display-flex');
    var currentLevel = 1;
    var currentChoiseNum;
    var currentTime = 60;
    var currentScore = 0;
    var currentMult = 1;

    var backColor = ['back-color-blue', 'back-color-violet', 'back-color-pink', 'back-color-orange', 'back-color-green'];
    var colorButton = ['button-color-inh', 'button-color-pink', 'button-color-orange', 'button-color-green', 'button-color-yellow'];
    var animations = ['rotation', 'scaling', 'opacity'];
    var blackText = 'button-color-text-black';

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
    }

    function animation() {
        container.textContent = '';
        task.textContent = '';
        task.classList.add('anim-in');
        container.classList.add('anim-in');
        task.classList.remove('anim-out');
        container.classList.remove('anim-out');
        task.ontransitionend = null;
        task.ontransitionend = switchLevel;
    }

    function createLevel(column, row, lvl) {
        container.textContent = '';
        containerMain.classList.remove('back-color-blue', 'back-color-violet', 'back-color-pink', 'back-color-orange', 'back-color-green');
        score.innerHTML = currentScore;
        mult.innerHTML = "x" + currentMult;
        containerMain.className = backColor[getRandomInt(0, 5)];
        task.classList.add('anim-in');
        container.classList.add('anim-in');
        task.classList.remove('anim-out');
        container.classList.remove('anim-out');
        task.ontransitionend = null;
        console.log(task.ontransitionend);
        let numList = [];
        level.innerHTML = lvl + "-9";
        for (let i = 0; i < row; i++) {
            let newRow = document.createElement('div');
            newRow.className = 'container-bar';
            container.appendChild(newRow);
            for (let j = 0; j < column; j++) {
                let newButton = document.createElement('button');
                let newButtonNum = document.createElement('div');
                newButton.className = 'button-number';
                newButton.classList.add(colorButton[getRandomInt(0, 5)]);
                if (lvl == 1) {
                    if (numList.length == 0) {
                        let num = getRandomInt(1, 9);
                        numList.push(num);
                        newButton.id = num;
                        newButtonNum.innerHTML = newButton.id;

                    }
                    else {
                        let flag = false;
                        while (!flag) {
                            let num = getRandomInt(1, 9);
                            if (!numList.includes(num)) {
                                numList.push(num);
                                newButton.id = num;
                                newButtonNum.innerHTML = newButton.id;
                                flag = true;
                            }
                        }
                    }
                }
                else if (lvl == 2) {
                    if (numList.length == 0) {
                        let num = getRandomInt(10, 100);
                        numList.push(num);
                        newButton.id = num;
                        newButtonNum.innerHTML = newButton.id;
                    }
                    else {
                        let flag = false;
                        while (!flag) {
                            let num = getRandomInt(10, 100);
                            if (!numList.includes(num)) {
                                numList.push(num);
                                newButton.id = num;
                                newButtonNum.innerHTML = newButton.id;
                                flag = true;
                            }
                        }
                    }
                }
                else if (lvl >= 3 && lvl <= 6) {
                    if (numList.length == 0) {
                        let num = getRandomInt(100, 1000);
                        numList.push(num);
                        newButton.id = num;
                        newButtonNum.innerHTML = newButton.id;
                    }
                    else {
                        let flag = false;
                        while (!flag) {
                            let num = getRandomInt(100, 1000);
                            if (!numList.includes(num)) {
                                numList.push(num);
                                newButton.id = num;
                                newButtonNum.innerHTML = newButton.id;
                                flag = true;
                            }
                        }
                    }
                    let animBut = animations[getRandomInt(0, 3)];
                    if (animBut == 'rotation') {
                        newButtonNum.className = animBut;
                    }
                    else {
                        newButton.classList.add(animBut);
                    }
                }
                else if (lvl >= 7 && lvl <= 9) {
                    if (numList.length == 0) {
                        let num = getRandomInt(1000, 10000);
                        numList.push(num);
                        newButton.id = num;
                        newButtonNum.innerHTML = newButton.id;
                    }
                    else {
                        let flag = false;
                        while (!flag) {
                            let num = getRandomInt(1000, 10000);
                            if (!numList.includes(num)) {
                                numList.push(num);
                                newButton.id = num;
                                newButtonNum.innerHTML = newButton.id;
                                flag = true;
                            }
                        }
                    }
                    let animBut = animations[getRandomInt(0, 3)];
                    if (animBut == 'rotation') {
                        newButtonNum.className = animBut;
                    }
                    else {
                        newButton.classList.add(animBut);
                    }
                }
                newButton.onclick = checkButton;
                newButton.appendChild(newButtonNum);
                newRow.appendChild(newButton);
            }
        }
        currentChoiseNum = numList[getRandomInt(0, numList.length)];
        task.innerHTML = currentChoiseNum;
        task.classList.remove('anim-in');
        container.classList.remove('anim-in');

    }

    function checkButton() {
        if (this.lastChild.innerHTML == currentChoiseNum) {
            console.log("right")
            if (currentLevel < 9) currentLevel++;
            container.classList.add('anim-out');
            task.classList.add('anim-out');
            currentScore += 100 * currentMult;
            if (currentMult < 5) currentMult++;
            score.innerHTML = currentScore;
            mult.innerHTML = "x" + currentMult;
        }
        else {
            if (currentLevel > 1) currentLevel--;
            if (currentMult > 1) currentMult--;
            container.classList.add('anim-out');
            task.classList.add('anim-out');
            mult.innerHTML = "x" + currentMult;
        }
        task.ontransitionend = animation;
    }

    function switchLevel() {
        if (currentTime > 0) {
            let curLvl = currentLevel;
            switch (curLvl) {
                case 1:
                    createLevel(3, 2, 1);
                    break;
                case 2:
                    createLevel(3, 2, 2);
                    break;
                case 3:
                    createLevel(3, 2, 3);
                    break;
                case 4:
                    createLevel(4, 3, 4);
                    break;
                case 5:
                    createLevel(4, 3, 5);
                    break;
                case 6:
                    createLevel(4, 4, 6);
                    break;
                case 7:
                    createLevel(4, 4, 7);
                    break;
                case 8:
                    createLevel(5, 5, 8);
                    break;
                case 9:
                    createLevel(5, 5, 9);
                    break;
            }
        }
        else {
            menubar.classList.remove('display-flex');
            menubar.classList.add('display-none');
            endmenu.classList.remove('display-none');
            scoreend.innerHTML = currentScore + " очков";
            
        }
    }

    switchLevel(currentLevel);

    let timer = setInterval(changeTimer, 1000);

    function changeTimer() {
        if (currentTime > 0) {
            currentTime--;
            let minute = Math.floor(currentTime / 60);
            let sec = currentTime % 60;
            if (minute < 10) {
                if (sec < 10) {
                    time.innerHTML = "0"+minute+":0" + sec;
                }
                else {
                    time.innerHTML = "0"+minute+":" + sec;
                }
            }
            else {
                if (sec < 10) {
                    time.innerHTML = minute + ":0" + sec;
                }
                else {
                    time.innerHTML = minute + ":" + sec;
                }
            }
        }
        else {
            clearInterval(timer);
        }

    }
}