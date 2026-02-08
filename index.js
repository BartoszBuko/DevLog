const done = document.querySelector("#done");
const minutes = document.querySelector("#minutes");
const rating = document.querySelector("#rating");
const addLogBtn = document.querySelector("#addLogBtn");
const logList = document.querySelector("#logList");
const totalTime = document.querySelector("#totalTime");
const savedData = localStorage.getItem("logs");
const savedTime = localStorage.getItem("time");
let timeTrack = savedTime ? JSON.parse(savedTime) : 0;
let logs = savedData ? JSON.parse(savedData) : [];
renderLogs();
renderTime(timeTrack.toString());
addLogBtn.addEventListener("click", () => {
    const taskDone = done.value;
    const minutesDone = parseInt(minutes.value);
    if (!taskDone || isNaN(minutesDone)) {
        alert("Wypełnij wszystkie pola, bracie!");
        return;
    }
    const ratingDone = rating.value;
    const date = new Date().toLocaleString();
    addLog(taskDone, minutesDone, ratingDone, date);
});
function addLog(taskDone, minutesDone, ratingDone, date) {
    const newLogEntry = {
        task: taskDone,
        duration: minutesDone,
        rating: ratingDone,
        date: date,
    };
    logs.push(newLogEntry);
    renderLogs();
    timeTrack += minutesDone;
    renderTime(timeTrack.toString());
    clearInputs();
    updateLocalStorage();
}
function renderTime(time) {
    totalTime.innerText = time;
}
function renderLogs() {
    logList.innerHTML = "";
    logs.forEach((log) => {
        const logCard = document.createElement("div");
        logCard.className =
            "bg-gray-900 p-4 rounded-xl border border-gray-700 shadow-sm";
        logCard.innerHTML = `
            <div class="flex justify-between items-center">
                <span class="text-xs font-mono text-gray-500">${log.date}</span>
                <span class="px-2 py-1 rounded text-xs font-bold ${log.rating === "Sigma" ? "bg-red-500/20 text-red-500" : "bg-gray-700 text-gray-300"}">${log.rating}</span>
            </div>
            <p class="mt-2 text-gray-200">${log.task}</p>
            <p class="mt-1 text-sm text-gray-500 font-mono">${log.duration} min</p>
        `;
        logList.appendChild(logCard);
    });
}
function updateLocalStorage() {
    const logsStringified = JSON.stringify(logs);
    const timeStringified = JSON.stringify(timeTrack);
    localStorage.setItem("logs", logsStringified);
    localStorage.setItem("time", timeStringified);
}
function clearInputs() {
    done.value = "";
    minutes.value = "";
    rating.value = "Sigma";
}
export {};
//# sourceMappingURL=index.js.map