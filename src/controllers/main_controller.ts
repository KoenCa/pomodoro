import {
  init as initPomodoroController,
  getTime,
  startTimer,
  pauseTimer,
  stopTimer,
  toggleBreakTimer,
  isBreakTimer,
  switchTimerMode
} from "./pomodoro_controller";

import {
  getDomStrings,
  setupTimer,
  disableBtn,
  enableBtn
} from "./ui_controller";

function setupEventListeners() {
  const DOM = getDomStrings();

  document
    .getElementById(DOM.startTimerBtn)
    .addEventListener("click", onStartTimer);

  document
    .getElementById(DOM.pauseTimerBtn)
    .addEventListener("click", onPauseTimer);

  document
    .getElementById(DOM.stopTimerBtn)
    .addEventListener("click", onStopTimer);

  document
    .getElementById(DOM.switchBtn)
    .addEventListener("click", onSwitchTimerMode);
}

function initUI() {
  const DOMstrings = getDomStrings();

  setupTimerUI();
  disableBtn(DOMstrings.pauseTimerBtn);
  disableBtn(DOMstrings.stopTimerBtn);
}

function setupTimerUI() {
  var timeData = getTime();
  setupTimer(timeData.minutes, timeData.seconds);
}

function onStartTimer() {
  startTimer(onTick);
  var DOMstrings = getDomStrings();

  disableBtn(DOMstrings.startTimerBtn);
  enableBtn(DOMstrings.pauseTimerBtn);
  enableBtn(DOMstrings.stopTimerBtn);
}

function onTick(timeIsUp: boolean) {
  setupTimerUI();

  if (timeIsUp) {
    toggleBreakTimer();
    onStopTimer();
    showNotification();
  }
}

function showNotification() {
  if (isBreakTimer()) {
    new Notification("Pomodoro done!");
  } else {
    new Notification("Break done!");
  }
}

function onPauseTimer() {
  const DOMstrings = getDomStrings();

  pauseTimer();
  disableBtn(DOMstrings.pauseTimerBtn);
  enableBtn(DOMstrings.startTimerBtn);
}

function onStopTimer() {
  const DOMstrings = getDomStrings();

  stopTimer();
  enableBtn(DOMstrings.startTimerBtn);
  disableBtn(DOMstrings.pauseTimerBtn);
  disableBtn(DOMstrings.stopTimerBtn);
  setupTimerUI();
}

function onSwitchTimerMode() {
  const DOMstrings = getDomStrings();

  switchTimerMode();
  enableBtn(DOMstrings.startTimerBtn);
  disableBtn(DOMstrings.pauseTimerBtn);
  disableBtn(DOMstrings.stopTimerBtn);
  setupTimerUI();
}

export function init() {
  console.info("Application has started.");
  initPomodoroController();
  initUI();
  setupEventListeners();
}
