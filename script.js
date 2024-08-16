const numberElement = document.getElementById('number');
const progressBar = document.querySelector('.progress-bar');
const subtractButton = document.getElementById('subtract');
const addButton = document.getElementById('add');
const undoButton = document.getElementById('undo');
const redoButton = document.getElementById('redo');

let number = 0;
let history = [];
let redoHistory = [];

function updateNumber(value) {
    number += value;
    number = Math.max(0, Math.min(number, 150));
    numberElement.textContent = number;
    progressBar.style.width = `${(number / 150) * 100}%`;
    history.push(number);
    redoHistory = [];
    updateButtonStates();
}

function undo() {
    if (history.length > 1) {
        redoHistory.push(history.pop());
        number = history[history.length - 1];
        numberElement.textContent = number;
        progressBar.style.width = `${(number / 150) * 100}%`;
        updateButtonStates();
    }
}

function redo() {
    if (redoHistory.length > 0) {
        history.push(redoHistory.pop());
        number = history[history.length - 1];
        numberElement.textContent = number;
        progressBar.style.width = `${(number / 150) * 100}%`;
        updateButtonStates();
    }
}

function updateButtonStates() {
    undoButton.disabled = history.length <= 1;
    redoButton.disabled = redoHistory.length === 0;
}

subtractButton.addEventListener('click', () => updateNumber(-1));
addButton.addEventListener('click', () => updateNumber(1));
undoButton.addEventListener('click', undo);
redoButton.addEventListener('click', redo);
