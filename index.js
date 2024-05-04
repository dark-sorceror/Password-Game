var solved = false;
var inputs = [];
var currentRequirement = 1;

function timer(pace = 1000) {
    var h = 0, m = 0, s = 0;

    let timer = setInterval(() => {
        if (h) document.getElementById("timer").innerHTML = `${h}:${m}:${s}`;
        else document.getElementById("timer").innerHTML = `${m}:${s <= 9 ? '0' : ''}${s}`;
        
        if (!solved) s++;
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

function updateRequirements(string) {
    var boolList = [];

    for (i = 1; i <= currentRequirement; i++) {
        var req = document.getElementById(i);

        req.children[2].innerText = `Password must contain '${log[i]}'`;
        
        if (string.includes(Object.values(log)[i - 1])) {
            req.classList.add('check');
            boolList.push(true);
        } else {
            req.classList.remove('check');
            boolList.push(false);
        }

        if (boolList.every(x => x === true) && i == currentRequirement) {
            if ((currentRequirement + 1) < (Object.keys(log).length + 1)) {
                currentRequirement += 1;
                addRequirement();
                document.getElementById('right').style.transform = `translate(0%, ${((currentRequirement - 1) * 55)}px)`;
            } else {
                console.log("game over");
                break;
            }
        }
    }
}

function addRequirement() {
    if (document.getElementById(currentRequirement) == null) {
        document.getElementById('right').insertAdjacentHTML('afterBegin', `
            <div class="requirement" id="${currentRequirement}">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="check"><path d="M20 6 9 17l-5-5"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                <p>:x: ${log[currentRequirement][0]}</p>
            </div>
        `);
    }
}

window.onload = function () {
    BODY = document.body;

    var DMBtn = document.getElementById('dm-btn');
    var DMBtnMoon = document.getElementById('dm-btn-moon');
    var DMBtnSun = document.getElementById('dm-btn-sun');
    var pwdInput = document.getElementById('password');

    var pasin = document.getElementById('left');
    var requirements = document.getElementById('right');

    timer(1000);

    DMBtn.onclick = function() {
        BODY.classList.toggle('dm')
        DMBtnMoon.classList.toggle('a');
        DMBtnSun.classList.toggle('a');
    };

    pwdInput.oninput = function(x) {
        //x["data"] ? inputs.push(x["data"]) : inputs.pop();

        pasin.classList.add('active');
        requirements.classList.add('active');

        if (currentRequirement == 1) addRequirement(); 

        updateRequirements(pwdInput.value);

        document.getElementById(currentRequirement).classList.add('active');
    }

};

