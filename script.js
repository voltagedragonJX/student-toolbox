const toggleCheckbox = document.getElementById('toggle-dark-mode');

// On page load, set checkbox based on saved preference
window.addEventListener('load', () => {
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    toggleCheckbox.checked = true;
  }
});

toggleCheckbox.addEventListener('change', () => {
  if (toggleCheckbox.checked) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'enabled');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.removeItem('darkMode');
  }
});


const textInput = document.getElementById('text-input');
const wordCount = document.getElementById('word-count');
const charCount = document.getElementById('char-count');

textInput.addEventListener('input', () => {
  const text = textInput.value.trim();

  // Count words (split by spaces, filter out empty strings)
  const words = text === '' ? 0 : text.split(/\s+/).length;
  const chars = text.length;

  wordCount.textContent = words;
  charCount.textContent = chars;
});
// Countdown to Holidays Tool with days, hours, and minutes
const holidayDateInput = document.getElementById('holiday-date');
const countdownDisplay = document.getElementById('countdown-display');
let countdownInterval;

holidayDateInput.addEventListener('input', () => {
  if (countdownInterval) clearInterval(countdownInterval);

  const holidayDateValue = holidayDateInput.value;
  if (!holidayDateValue) {
    countdownDisplay.textContent = 'Pick a date above to see the countdown.';
    return;
  }

  countdownInterval = setInterval(() => {
    const now = new Date();
    const holidayDate = new Date(holidayDateValue);

    const diffMs = holidayDate - now;

    if (diffMs <= 0) {
      countdownDisplay.textContent = '🎉 It’s holiday time! 🎉';
      clearInterval(countdownInterval);
      return;
    }

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const diffMinutes = Math.floor((diffMs / (1000 * 60)) % 60);

    countdownDisplay.textContent = `⏳ ${diffDays} day(s), ${diffHours} hour(s), ${diffMinutes} minute(s) left until your holiday.`;
  }, 1000);
});
// ⏱️ Stopwatch with Milliseconds & Lap Tracking
const stopwatchDisplay = document.getElementById('stopwatch-display');
const startBtn = document.getElementById('start-stopwatch');
const pauseBtn = document.getElementById('pause-stopwatch');
const resetBtn = document.getElementById('reset-stopwatch');
const lapBtn = document.getElementById('lap-stopwatch');
const lapsList = document.getElementById('laps-list');

let stopwatchInterval;
let elapsedMilliseconds = 0;
let isRunning = false;
let lapCount = 0;

function formatTime(ms) {
  const hours = String(Math.floor(ms / 3600000)).padStart(2, '0');
  const minutes = String(Math.floor((ms % 3600000) / 60000)).padStart(2, '0');
  const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
  const msPart = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}.${msPart}`;
}

function updateStopwatchDisplay() {
  stopwatchDisplay.textContent = formatTime(elapsedMilliseconds);
}

startBtn.addEventListener('click', () => {
  if (isRunning) return;
  isRunning = true;
  stopwatchInterval = setInterval(() => {
    elapsedMilliseconds += 10;
    updateStopwatchDisplay();
  }, 10);
});

pauseBtn.addEventListener('click', () => {
  if (!isRunning) return;
  isRunning = false;
  clearInterval(stopwatchInterval);
});

resetBtn.addEventListener('click', () => {
  isRunning = false;
  clearInterval(stopwatchInterval);
  elapsedMilliseconds = 0;
  updateStopwatchDisplay();
  lapsList.innerHTML = '';
  lapCount = 0;
});

lapBtn.addEventListener('click', () => {
  if (!isRunning) return;
  lapCount++;
  const li = document.createElement('li');
  li.textContent = `Lap ${lapCount}: ${formatTime(elapsedMilliseconds)}`;
  lapsList.appendChild(li);
});
// 🍅 Configurable Pomodoro Timer
const pomodoroDisplay = document.getElementById('pomodoro-display');
const pomodoroStatus = document.getElementById('pomodoro-status');
const pomodoroStart = document.getElementById('pomodoro-start');
const pomodoroPause = document.getElementById('pomodoro-pause');
const pomodoroReset = document.getElementById('pomodoro-reset');
const workDurationInput = document.getElementById('work-duration');
const breakDurationInput = document.getElementById('break-duration');

let pomodoroInterval;
let pomodoroSeconds = workDurationInput.value * 60;
let isPomodoroRunning = false;
let isWorkTime = true;

function updatePomodoroDisplay() {
  const minutes = String(Math.floor(pomodoroSeconds / 60)).padStart(2, '0');
  const seconds = String(pomodoroSeconds % 60).padStart(2, '0');
  pomodoroDisplay.textContent = `${minutes}:${seconds}`;
  pomodoroStatus.textContent = isWorkTime ? 'Work Time' : 'Break Time';
}

function toggleInputs(disabled) {
  workDurationInput.disabled = disabled;
  breakDurationInput.disabled = disabled;
}

pomodoroStart.addEventListener('click', () => {
  if (isPomodoroRunning) return;
  // Update durations in case user changed inputs before starting
  const workDuration = parseInt(workDurationInput.value, 10);
  const breakDuration = parseInt(breakDurationInput.value, 10);

  if (isNaN(workDuration) || workDuration < 1 || isNaN(breakDuration) || breakDuration < 1) {
    alert('Please enter valid durations (1 minute or more).');
    return;
  }

  pomodoroSeconds = isWorkTime ? workDuration * 60 : breakDuration * 60;
  updatePomodoroDisplay();

  isPomodoroRunning = true;
  toggleInputs(true);

  pomodoroInterval = setInterval(() => {
    if (pomodoroSeconds > 0) {
      pomodoroSeconds--;
      updatePomodoroDisplay();
    } else {
      isWorkTime = !isWorkTime;
      pomodoroSeconds = isWorkTime ? workDuration * 60 : breakDuration * 60;
      updatePomodoroDisplay();

      alert(isWorkTime ? "Work time! Let's focus!" : "Break time! Relax a bit!");
    }
  }, 1000);
});

pomodoroPause.addEventListener('click', () => {
  if (!isPomodoroRunning) return;
  isPomodoroRunning = false;
  clearInterval(pomodoroInterval);
  toggleInputs(false);
});

pomodoroReset.addEventListener('click', () => {
  isPomodoroRunning = false;
  clearInterval(pomodoroInterval);
  pomodoroSeconds = workDurationInput.value * 60;
  isWorkTime = true;
  updatePomodoroDisplay();
  toggleInputs(false);
});
// 🧮 Scientific Calculator
const calcDisplay = document.getElementById('calc-display');
const calcButtons = document.getElementById('calc-buttons');
const calcClear = document.getElementById('calc-clear');
const calcEquals = document.getElementById('calc-equals');
const calcBackspace = document.getElementById('calc-backspace');

function replaceMathSymbols(str) {
  // Replace ^ with ** for exponentiation in JS
  return str.replace(/\^/g, '**')
            .replace(/π/g, 'Math.PI')
            .replace(/e/g, 'Math.E')
            .replace(/sin\(/g, 'Math.sin(')
            .replace(/cos\(/g, 'Math.cos(')
            .replace(/tan\(/g, 'Math.tan(')
            .replace(/log\(/g, 'Math.log10(')
            .replace(/ln\(/g, 'Math.log(')
            .replace(/sqrt\(/g, 'Math.sqrt(');
}

calcButtons.addEventListener('click', e => {
  if (e.target.tagName !== 'BUTTON') return;

  const val = e.target.getAttribute('data-value');

  if (val) {
    if (val === 'PI') {
      calcDisplay.value += 'π';
    } else if (val === 'E') {
      calcDisplay.value += 'e';
    } else {
      calcDisplay.value += val;
    }
  }
});

calcClear.addEventListener('click', () => {
  calcDisplay.value = '';
});

calcBackspace.addEventListener('click', () => {
  calcDisplay.value = calcDisplay.value.slice(0, -1);
});

calcEquals.addEventListener('click', () => {
  try {
    const expr = replaceMathSymbols(calcDisplay.value);
    // eslint-disable-next-line no-eval
    const result = eval(expr);
    if (result === undefined) {
      calcDisplay.value = '';
    } else {
      calcDisplay.value = result.toString();
    }
  } catch {
    calcDisplay.value = 'Error';
  }
  const calcAC = document.getElementById('calc-ac');

calcAC.addEventListener('click', () => {
  calcDisplay.value = '';
});

});
// ✅ To-Do List with saving
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

let todos = [];

// Load saved todos from localStorage
function loadTodos() {
  const saved = localStorage.getItem('todos');
  if (saved) {
    todos = JSON.parse(saved);
    todos.forEach(todo => addTodoToDOM(todo));
  }
}

// Save todos to localStorage
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Add a todo item to the page
function addTodoToDOM(todo) {
  const li = document.createElement('li');
  li.style.display = 'flex';
  li.style.alignItems = 'center';
  li.style.marginBottom = '0.4rem';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = todo.completed;
  checkbox.style.marginRight = '0.6rem';

  const span = document.createElement('span');
  span.textContent = todo.text;
  span.style.flexGrow = '1';
  if (todo.completed) {
    span.style.textDecoration = 'line-through';
    span.style.color = '#777';
  }

  checkbox.addEventListener('change', () => {
    todo.completed = checkbox.checked;
    if (todo.completed) {
      span.style.textDecoration = 'line-through';
      span.style.color = '#777';
    } else {
      span.style.textDecoration = 'none';
      span.style.color = '#000';
    }
    saveTodos();
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '✕';
  deleteBtn.style.marginLeft = '0.6rem';
  deleteBtn.style.border = 'none';
  deleteBtn.style.background = 'transparent';
  deleteBtn.style.cursor = 'pointer';
  deleteBtn.style.color = '#c00';
  deleteBtn.style.fontWeight = 'bold';
  deleteBtn.title = 'Delete task';

  deleteBtn.addEventListener('click', () => {
    todos = todos.filter(t => t !== todo);
    todoList.removeChild(li);
    saveTodos();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);
}

// Handle new todo submission
todoForm.addEventListener('submit', e => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (text === '') return;
  const todo = { text, completed: false };
  todos.push(todo);
  addTodoToDOM(todo);
  saveTodos();
  todoInput.value = '';
});

// Load todos when page loads
loadTodos();
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-target');
    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
