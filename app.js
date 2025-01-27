const bells = new Audio('./sounds/Explosion.mp3'); 
const startBtn = document.querySelector('.btn-start');
const resumetBtn = document.querySelector('.btn-resume');
const resumeMessage = document.querySelector('.resume-message');
const appMessage = document.querySelector('.app-message');
const resetBtn = document.querySelector('.btn-reset');
const pauseBtn = document.querySelector('.btn-pause')
const session = document.querySelector('.minutes');
const minutesAfterReset = session.innerText;
const secondsAfterReset = document.querySelector('.seconds').innerText;
let myInterval;
let state = true;
let totalSeconds;

const appTimer = () => {
    if (state) {
        state = false;
        if (totalSeconds === undefined) {
            const sessionAmount = Number.parseInt(session.innerText);
            totalSeconds = sessionAmount * 60;
        }

        const updateSeconds = () => {
            const minuteDiv = document.querySelector('.minutes');
            const secondDiv = document.querySelector('.seconds');
            totalSeconds--;

            let minutesLeft = Math.floor(totalSeconds / 60);
            let secondsLeft = totalSeconds % 60;

            secondDiv.innerText = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft;
            minuteDiv.innerText = `${minutesLeft}`;

            if (minutesLeft === 0 && secondsLeft === 0) {
                clearInterval(myInterval);
                bells.play();
                state = true;
                totalSeconds = undefined; 
                appReset();
            }
        };

        myInterval = setInterval(updateSeconds, 1000);
        
    } else {
        alert('Session has already started.');
    }
};

const appReset = () => {
    clearInterval(myInterval);
    document.querySelector('.minutes').innerText = minutesAfterReset;
    document.querySelector('.seconds').innerText = secondsAfterReset;
    state = true;
    totalSeconds = undefined;
}
const appPause = () => {
    clearInterval(myInterval);
    state = true;
    resumeMessage.style.display = 'block';
    appMessage.style.display = 'none';
    startBtn.style.display = 'none';
    resumetBtn.style.display = 'inline'
}
const appResume = () => {
    appTimer();
    
    startBtn.style.display = 'inline';
    resumetBtn.style.display = 'none';
}
startBtn.addEventListener('click', appTimer);
resetBtn.addEventListener('click', appReset);
pauseBtn.addEventListener('click', appPause);
resumetBtn.addEventListener('click', appResume)
