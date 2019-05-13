import {
  init as initPomodoroController,
  getTime,
  startTimer,
  pauseTimer,
  stopTimer,
  toggleBreakTimer,
  isBreakTimer
} from "./controllers/pomodoro_controller";

import {
  getDomStrings,
  setupTimer,
  disableBtn,
  enableBtn
} from "./controllers/ui_controller";


var controller = (function() {
  function setupEventListeners() {
    var DOM = getDomStrings();

    document
      .getElementById(DOM.startTimerBtn)
      .addEventListener("click", onStartTimer);

    document
      .getElementById(DOM.pauseTimerBtn)
      .addEventListener("click", onPauseTimer);

    document
      .getElementById(DOM.stopTimerBtn)
      .addEventListener("click", onStopTimer);
  }

  function initUI() {
    var DOMstrings = getDomStrings();

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

  function onTick(timeIsUp) {
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
    var DOMstrings = getDomStrings();

    pauseTimer();
    disableBtn(DOMstrings.pauseTimerBtn);
    enableBtn(DOMstrings.startTimerBtn);
  }

  function onStopTimer() {
    var DOMstrings = getDomStrings();

    stopTimer();
    enableBtn(DOMstrings.startTimerBtn);
    disableBtn(DOMstrings.pauseTimerBtn);
    disableBtn(DOMstrings.stopTimerBtn);
    setupTimerUI();
  }

  return {
    init: function() {
      console.info("Application has started.");
      initPomodoroController();
      initUI();
      setupEventListeners();
    }
  };
})();


controller.init(); // initialise the app
