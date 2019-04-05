var pomodoroController = (function() {
  var data = {
    defaults: {
      timeInSec: 1500
    },
    timer: {
      timeInSecRemaining: 0,
      intervalId: null
    },
    UI: {
      minutesConverted: 0,
      secondsConverted: 0
    }
  };

  init();

  function init() {
    setupTimerData();
    calculateTimeFromRemainingSeconds();
  }

  function setupTimerData() {
    if (data.timer.timeInSecRemaining === 0) {
      data.timer.timeInSecRemaining = data.defaults.timeInSec;
    }
  }

  function calculateTimeFromRemainingSeconds() {
    var timeInSecRemaining = data.timer.timeInSecRemaining;
    data.minutesConverted = parseInt(timeInSecRemaining / 60);
    data.secondsConverted = parseInt(timeInSecRemaining % 60);
  }

  return {
    getTime: function() {
      return {
        minutes: data.minutesConverted,
        seconds: data.secondsConverted
      };
    },

    startTimer: function(onTick) {
      setInterval(function() {
        data.timer.timeInSecRemaining -= 1;
        calculateTimeFromRemainingSeconds();
        onTick();
      }, 1000);
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
    }
  };
})();

var controller = (function(pomodoroController, UICtrl) {
  var setupEventListeners = function() {
    var DOM = UICtrl.getDomStrings();

    document
      .getElementById(DOM.startTimerBtn)
      .addEventListener("click", onStartTimer);
  };

  function setupUI() {
    var timeData = pomodoroController.getTime();
    UICtrl.setupTimer(timeData.minutes, timeData.seconds);
  }

  function onStartTimer() {
    pomodoroController.startTimer(onTick);
  }

  function onTick() {
    setupUI();
  }

  return {
    init: function() {
      console.info("Application has started.");
      setupUI();
      setupEventListeners();
    }
  };
})(pomodoroController, UIController);

controller.init(); // initialise the app
