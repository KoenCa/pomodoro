var pomodoroController = (function() {
  var data = {
    timeInSec: 1500,
    minutesConverted: 0,
    secondsConverted: 0
  };

  init();

  function init() {
    calculateTimeFromSeconds();
  }

  function calculateTimeFromSeconds() {
    data.minutesConverted = parseInt(data.timeInSec / 60);
    data.secondsConverted = parseInt(data.timeInSec % 60);
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
        data.timeInSec -= 1;
        calculateTimeFromSeconds();
        onTick();
      }, 1000);
    }
  };
})();

var UIController = (function() {
  // Object for all used DOM strings
  var DOMstrings = {
    timerMinutes: "timer-minutes",
    timerSeconds: "timer-seconds"
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
  };

  function setupUI() {
    var timeData = pomodoroController.getTime();
    UICtrl.setupTimer(timeData.minutes, timeData.seconds);
  }

  function onTick() {
    setupUI();
  }

  return {
    init: function() {
      console.info("Application has started.");
      setupUI();
      setupEventListeners();
      pomodoroController.startTimer(onTick);
    }
  };
})(pomodoroController, UIController);

controller.init(); // initialise the app
