import {
  init,
  getTime,
  startTimer,
  pauseTimer,
  stopTimer,
  toggleBreakTimer,
  isBreakTimer
} from "./controllers/pomodoro_controller";

var UIController = (function() {
  // Object for all used DOM strings
  var DOMstrings = {
    timerMinutes: "timer-minutes",
    timerSeconds: "timer-seconds",
    startTimerBtn: "start-timer",
    pauseTimerBtn: "pause-timer",
    stopTimerBtn: "stop-timer"
  };

  function formatTimeData(value: number) {
    if (value === 0 || !value) return "00";
    if (value >= 10) return `${value}`;
    return `0${value}`;
  }

  return {
    getDomStrings: function() {
      return DOMstrings;
    },

    setupTimer: function(minutes: number, seconds: number) {
      var minutesEl = document.getElementById(DOMstrings.timerMinutes);
      var secondsEl = document.getElementById(DOMstrings.timerSeconds);
      minutesEl.innerText = formatTimeData(minutes);
      secondsEl.innerText = formatTimeData(seconds);
    },

    disableBtn: function(buttonId) {
      document.getElementById(buttonId).setAttribute("disabled", "");
    },

    enableBtn: function(buttonId) {
      document.getElementById(buttonId).removeAttribute("disabled");
    }
  };
})();

var controller = (function(UICtrl) {
  function setupEventListeners() {
    var DOM = UICtrl.getDomStrings();

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
    var DOMstrings = UICtrl.getDomStrings();

    setupTimerUI();
    UICtrl.disableBtn(DOMstrings.pauseTimerBtn);
    UICtrl.disableBtn(DOMstrings.stopTimerBtn);
  }

  function setupTimerUI() {
    var timeData = getTime();
    UICtrl.setupTimer(timeData.minutes, timeData.seconds);
  }

  function onStartTimer() {
    startTimer(onTick);
    var DOMstrings = UICtrl.getDomStrings();

    UICtrl.disableBtn(DOMstrings.startTimerBtn);
    UICtrl.enableBtn(DOMstrings.pauseTimerBtn);
    UICtrl.enableBtn(DOMstrings.stopTimerBtn);
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
    var DOMstrings = UICtrl.getDomStrings();

    pauseTimer();
    UICtrl.disableBtn(DOMstrings.pauseTimerBtn);
    UICtrl.enableBtn(DOMstrings.startTimerBtn);
  }

  function onStopTimer() {
    var DOMstrings = UICtrl.getDomStrings();

    stopTimer();
    UICtrl.enableBtn(DOMstrings.startTimerBtn);
    UICtrl.disableBtn(DOMstrings.pauseTimerBtn);
    UICtrl.disableBtn(DOMstrings.stopTimerBtn);
    setupTimerUI();
  }

  return {
    init: function() {
      console.info("Application has started.");
      init();
      initUI();
      setupEventListeners();
    }
  };
})(UIController);

controller.init(); // initialise the app
