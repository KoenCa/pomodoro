var pomodoroController = (function() {
  var data = {};

  var method = function(test) {};

  return {};
})();

var UIController = (function() {
  // Object for all used DOM strings
  var DOMstrings = {};

  var method = function(test) {};

  return {
    getDomStrings: function() {
      return DOMstrings;
    }
  };
})();

var controller = (function(pomodoroController, UICtrl) {
  var setupEventListeners = function() {
    var DOM = UICtrl.getDomStrings();
  };

  return {
    init: function() {
      console.info("Application has started.");
      setupEventListeners();
    }
  };
})(pomodoroController, UIController);

controller.init(); // initialise the app
