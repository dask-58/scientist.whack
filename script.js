let score = 0;
let lastHole;
let timeUp = false;
let timeLeft = 120; 
let timerInterval;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) return randomHole(holes);
    lastHole = hole;
    return hole;
}

function showScientist() {
    const holes = document.querySelectorAll('.hole');
    const time = randomTime(500, 1500);
    const hole = randomHole(holes);
    const Scientist = hole.querySelector('.Scientist');
    Scientist.classList.add('up');
    setTimeout(() => { Scientist.classList.remove('up'); if (!timeUp) showScientist(); }, time);
}

function startGame() {
    score = 0;
    timeLeft = 120; 
    document.getElementById('score').textContent = score;
    document.getElementById('timer').textContent = timeLeft;
    timeUp = false;
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000); 
    showScientist();
    setTimeout(() => { timeUp = true; clearInterval(timerInterval); }, 120000);
}

function updateTimer() {
    timeLeft--;
    document.getElementById('timer').textContent = timeLeft;
    if (timeLeft <= 0) clearInterval(timerInterval);
}

function hitScientist(e) {
    if (!e.isTrusted) return; // auto clicker ? 
    score++;
    this.classList.remove('up');
    document.getElementById('score').textContent = score;
}

document.querySelectorAll('.Scientist').forEach(Scientist => {
    Scientist.addEventListener('click', hitScientist);
});

