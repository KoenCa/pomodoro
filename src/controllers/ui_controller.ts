let DOMstrings = {
  timerMinutes: "timer-minutes",
  timerSeconds: "timer-seconds",
  startTimerBtn: "start-timer",
  pauseTimerBtn: "pause-timer",
  stopTimerBtn: "stop-timer"
};

function formatTimeData(value: number): string {
  if (value === 0 || !value) return "00";
  if (value >= 10) return `${value}`;
  return `0${value}`;
}

export function getDomStrings() {
  return DOMstrings;
}

export function setupTimer(minutes: number, seconds: number) {
  var minutesEl = document.getElementById(DOMstrings.timerMinutes);
  var secondsEl = document.getElementById(DOMstrings.timerSeconds);
  minutesEl.innerText = formatTimeData(minutes);
  secondsEl.innerText = formatTimeData(seconds);
}

export function disableBtn(buttonId: string) {
  document.getElementById(buttonId).setAttribute("disabled", "");
}

export function enableBtn(buttonId: string) {
  document.getElementById(buttonId).removeAttribute("disabled");
}
