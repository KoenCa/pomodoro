var pomodoroController = (function() {
  var data = {
    minutes: 25,
    seconds: 0
  };

  var startTimer = function() {};

  return {
    getTime: function() {
      return {
        minutes: data.minutes,
        seconds: data.seconds
      };
    }
  };
})();

var UIController = (function() {
  // Object for all used DOM strings
  var DOMstrings = {
    timerMinutes: "timer-minutes",
    timerSeconds: "timer-seconds"
  };

  return {
    getDomStrings: function() {
      return DOMstrings;
    },

    setupTimer: function(minutes, seconds) {
      var minutesEl = document.getElementById(DOMstrings.timerMinutes);
      var secondsEl = document.getElementById(DOMstrings.timerSeconds);
      minutesEl.innerText = minutes;
      secondsEl.innerText = seconds;
    }
  };
})();

var controller = (function(pomodoroController, UICtrl) {
  var setupEventListeners = function() {
    var DOM = UICtrl.getDomStrings();
  };

  var setupUI = function() {
    var timeData = pomodoroController.getTime();
    UICtrl.setupTimer(timeData.minutes, timeData.seconds);
  };

  return {
    init: function() {
      console.info("Application has started.");
      setupUI();
      setupEventListeners();
    }
  };
})(pomodoroController, UIController);

controller.init(); // initialise the app
