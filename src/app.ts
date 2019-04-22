import { TimerAction } from "./typescript/enums";

var pomodoroController = (function() {
  var data = {
    defaults: {
      timeInSec: 1500
    },
    timer: {
      timeInSecRemaining: 0
    },
    UI: {
      minutesConverted: 0,
      secondsConverted: 0
    },
    webWorker: new Worker("./webworker/timer.ts")
  };

  function setupTimerData() {
    if (data.timer.timeInSecRemaining === 0) {
      resetRemainingTime();
    }
  }

  function resetRemainingTime() {
    data.timer.timeInSecRemaining = data.defaults.timeInSec;
  }

  function calculateTimeFromRemainingSeconds() {
    var timeInSecRemaining = data.timer.timeInSecRemaining;
    data.UI.minutesConverted = Math.trunc(timeInSecRemaining / 60);
    data.UI.secondsConverted = Math.trunc(timeInSecRemaining % 60);
  }

  return {
    init: function() {
      setupTimerData();
      calculateTimeFromRemainingSeconds();
    },

    getTime: function() {
      return {
        minutes: data.UI.minutesConverted,
        seconds: data.UI.secondsConverted
      };
    },

    startTimer: function(onTick: Function) {
      const webWorker = data.webWorker;

      webWorker.postMessage(TimerAction.Start);

      webWorker.onmessage = (e) => {
        if (e.data != TimerAction.Tick) return;

        data.timer.timeInSecRemaining -= 1;
        calculateTimeFromRemainingSeconds();
        onTick(data.timer.timeInSecRemaining <= 0);
      }
    },

    pauseTimer: function() {
      const webWorker = data.webWorker;
      webWorker.postMessage(TimerAction.Pause)
    },

    stopTimer: function() {
      const webWorker = data.webWorker;
      webWorker.postMessage(TimerAction.Stop);
      resetRemainingTime();
      calculateTimeFromRemainingSeconds();
    }
  };
})();

var UIController = (function() {
  // Object for all used DOM strings
  var DOMstrings = {
    timerMinutes: "timer-minutes",
    timerSeconds: "timer-seconds",
    startTimerBtn: "start-timer",
    pauseTimerBtn: "pause-timer",
    stopTimerBtn: "stop-timer"
  };

  function formatTimeData(value) {
    if (value === 0 || !value) return "00";
    if (value >= 10) return value;
    return "0" + value;
  }

  return {
    getDomStrings: function() {
      return DOMstrings;
    },

    setupTimer: function(minutes, seconds) {
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

var controller = (function(pomodoroController, UICtrl) {
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
    var timeData = pomodoroController.getTime();
    UICtrl.setupTimer(timeData.minutes, timeData.seconds);
  }

  function onStartTimer() {
    pomodoroController.startTimer(onTick);
    var DOMstrings = UICtrl.getDomStrings();

    UICtrl.disableBtn(DOMstrings.startTimerBtn);
    UICtrl.enableBtn(DOMstrings.pauseTimerBtn);
    UICtrl.enableBtn(DOMstrings.stopTimerBtn);
  }

  function onTick(timeIsUp) {
    setupTimerUI();
    if (timeIsUp) {
      onStopTimer();
      var notification = new Notification("Pomodoro done!");
    }
  }

  function onPauseTimer() {
    var DOMstrings = UICtrl.getDomStrings();

    pomodoroController.pauseTimer();
    UICtrl.disableBtn(DOMstrings.pauseTimerBtn);
    UICtrl.enableBtn(DOMstrings.startTimerBtn);
  }

  function onStopTimer() {
    var DOMstrings = UICtrl.getDomStrings();

    pomodoroController.stopTimer();
    UICtrl.enableBtn(DOMstrings.startTimerBtn);
    UICtrl.disableBtn(DOMstrings.pauseTimerBtn);
    UICtrl.disableBtn(DOMstrings.stopTimerBtn);
    setupTimerUI();
  }

  return {
    init: function() {
      console.info("Application has started.");
      pomodoroController.init();
      initUI();
      setupEventListeners();
    }
  };
})(pomodoroController, UIController);

controller.init(); // initialise the app
