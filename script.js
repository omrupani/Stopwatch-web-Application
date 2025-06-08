let startTime, interval;
let elapsed = 0;
let running = false;

const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const laps = document.getElementById("laps");

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    const milliseconds = String(ms % 1000).padStart(3, '0').slice(0, 2);
    return `${minutes}:${seconds}:${milliseconds}`;
}

function updatedisplay() {
    display.textContent = formatTime(Date.now() - startTime + elapsed);
}

startBtn.onclick = () => {
    if (!running) {
        running = true;
        startTime = Date.now();
        interval = setInterval(updatedisplay, 10);
    }
};

pauseBtn.onclick = () => {
    if (running) {
        running = false;
        startTime = Date.now() - startTime;
        clearInterval(interval);
    }
};

resetBtn.onclick = () => {
    running = false;
    clearInterval(interval);
    elapsed = 0;
    display.textContent = "00:00:00";
    laps.innerHTML = '';
};

lapBtn.onclick = () => {
    if (running) {
        const laptime = formatTime(Date.now() - startTime + elapsed);
        const li = document.createElement("li");
        li.textContent = `Lap: ${laptime}`;
        laps.appendChild(li);
    }
};