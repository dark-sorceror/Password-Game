const VERSION = "1.1.1";

var gameOver = false;
var passCreated = false;
var inputs = [];
var currentRequirement = 1;

function toggleLDMode() {
    var DMBtn = document.getElementsByClassName('dm-btn')[0];
    var DMBtnMoon = document.getElementById('dm-btn-moon');
    var DMBtnSun = document.getElementById('dm-btn-sun');

    DMBtn.onclick = function() {
        BODY.classList.toggle('dm')
        DMBtnMoon.classList.toggle('a');
        DMBtnSun.classList.toggle('a');
        DMBtn.id = `${DMBtnMoon.classList.contains('a') ? 'Dark\xa0Mode' : 'Light\xa0Mode'}`
    };
}

function toggleModes() {
    var ModesBtn = document.getElementsByClassName('modes-btn')[0];
    var ModesContent = document.getElementById('modes');
    var LeaderboardContent = document.getElementById('ld');

    ModesBtn.onclick = function() {
        if (LeaderboardContent.classList.contains('active')) {
            LeaderboardContent.classList.remove('active');
        }
        ModesContent.classList.toggle('active');
    };
}

function toggleLeaderboard() {
    var LeaderboardBtn = document.getElementsByClassName('leaderboard-btn')[0];
    var LeaderboardContent = document.getElementById('ld');
    var ModesContent = document.getElementById('modes');

    LeaderboardBtn.onclick = function() {
        if (ModesContent.classList.contains('active')) {
            ModesContent.classList.remove('active');
        }
        LeaderboardContent.classList.toggle('active');
    };
}

function endGameButton() {
    var signUpBtn = document.getElementById('sign-up-btn');

    signUpBtn.onclick = function() {
        gameOver = true;
    };
}

function timer(pace = 1000) {
    var h = 0, m = 0, s = 0;

    let timer = setInterval(() => {
        if (h) document.getElementById("timer").innerHTML = `${h}:${m}:${s}`;
        else document.getElementById("timer").innerHTML = `${m}:${s <= 9 ? '0' : ''}${s}`;
        
        if (!gameOver) s++;
        else clearInterval(timer);

        if (s == 60) {
            s = 0;
            m++;
        }

        if (m == 60) {
            m = 0;
            h++
        }

    }, pace);
}

const log = {
    1: "a",
    2: "b",
    3: "c",
    4: "d",
    5: "e"
};

function transitionConfirmation() {
    var pwdInput = document.getElementById('password');
    var pwdInputText = document.getElementById('password-text');
    var confirmPwdField = document.getElementById('confirm-p');
    
    var left = document.getElementById('left');
    var right = document.getElementById('right');

    var signUpBtn = document.getElementById('sign-up-btn');

    left.classList.remove('active');
    right.classList.remove('active');

    passCreated = true;
    pwdInput.style.outlineColor = 'rgb(46, 175, 46)';
    pwdInputText.style.color = 'rgb(46, 175, 46)';
    pwdInput.style.backgroundColor = 'white';
    pwdInput.disabled = true;

    confirmPwdField.classList.add('active');
    signUpBtn.classList.add('confirm-phase');
}

function transitionEndGame() {
    var confirmPwdInputText = document.getElementById('confirm-password-text');
    var confirmPwdInput = document.getElementById('confirm-password');
    var signUpBtn = document.getElementById('sign-up-btn');

    confirmPwdInput.disabled = true;
    confirmPwdInput.style.outlineColor = 'rgb(46, 175, 46)';
    confirmPwdInput.style.backgroundColor = 'white';
    confirmPwdInputText.style.color = 'rgb(46, 175, 46)';
    endGameButton();
    signUpBtn.classList.add('end-phase');
    signUpBtn.style.cursor = 'default';
}

function updateRequirements(string) {
    var boolList = [];
    var right = document.getElementById('right');

    for (i = 1; i <= currentRequirement; i++) {
        var req = document.getElementById(i);

        req.children[2].innerText = `Password must contain '${log[i]}'`;
        
        if (string.includes(Object.values(log)[i - 1])) {
            req.classList.add('active', 'check');
            boolList.push(true);
        } else {
            req.classList.remove('check');
            boolList.push(false);
        }

        if (boolList.every(x => x === true) && i == currentRequirement) {
            if ((currentRequirement + 1) < (Object.keys(log).length + 1)) {
                currentRequirement += 1;
                addRequirement();
                right.style.transform = `translate(0%, ${((currentRequirement - 1) * 55)}px)`;
            } else {
                transitionConfirmation();
                break;
                // WIP
            }
        }
    }
}

function confirmPassword(string) {
    if (string.includes(Object.values(log)[i - 1])) {
        req.classList.add('active', 'check');
        boolList.push(true);
    } else {
        req.classList.remove('check');
        boolList.push(false);
    }
}

function addRequirement() {
    var currentReq = document.getElementById(currentRequirement);
    var right = document.getElementById('right');

    if (currentReq == null) {
        right.insertAdjacentHTML('afterBegin', `
            <div class="requirement" id="${currentRequirement}">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="check"><path d="M20 6 9 17l-5-5"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                <p>:x: ${log[currentRequirement][0]}</p>
            </div>
        `);
    }
}

function hoverDetail() {
    var btn = document.querySelectorAll('.btn:not(#Github)');

    btn.forEach(button => {
        button.onmouseover = function() {
            var hoveredButton = document.getElementById(button.id)
            var hoverText = document.createElement('span');

            hoverText.textContent = `${button.id}`;
            hoverText.className = 'btn-hover-text';

            hoveredButton.appendChild(hoverText);
        }

        button.onmouseout = function() {
            var hoveredButton = document.getElementById(button.id);
            if (this.lastElementChild.tagName == 'SPAN') {
                hoveredButton.removeChild(this.lastElementChild);
            }
        }
    });
}

window.onload = function () {
    BODY = document.body;

    var pwdInput = document.getElementById('password');

    var left = document.getElementById('left');
    var right = document.getElementById('right');

    var confirmPwdField = document.getElementById('confirm-p');
    var confirmPwdInput = document.getElementById('confirm-password');

    timer(1000);

    toggleLDMode();
    hoverDetail();

    toggleModes();
    toggleLeaderboard();

    pwdInput.oninput = function(x) {
        //x["data"] ? inputs.push(x["data"]) : inputs.pop();

        left.classList.add('active');
        right.classList.add('active');

        if (currentRequirement == 1) addRequirement();

        updateRequirements(pwdInput.value);

        var currentReq = document.getElementById(currentRequirement);

        currentReq.classList.add('active');
    }

    confirmPwdInput.oninput = function(x) {
        if (confirmPwdInput.value == pwdInput.value) {
            transitionEndGame();
        }
    }

};

