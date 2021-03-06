import { TimerAction } from "../typescript/enums";

let data = {
  defaults: {
    timeInSec: 1500,
    breakTimeInSec: 300,
    timeBeforeBreakInSec: 180
  },
  timer: {
    timeInSecRemaining: 0,
    breakTimeInSecRemaining: 0,
    isBreak: false
  },
  UI: {
    minutesConverted: 0,
    secondsConverted: 0
  },
  webWorker: new Worker("../webworker/timer.ts")
};

function setupTimerData() {
  if (data.timer.timeInSecRemaining === 0) {
    resetRemainingTime();
  }
}

function resetRemainingTime() {
  if (data.timer.isBreak) {
    data.timer.breakTimeInSecRemaining = data.defaults.breakTimeInSec;
  } else {
    data.timer.timeInSecRemaining = data.defaults.timeInSec;
  }
}

function calculateTimeFromRemainingSeconds() {
  let timeInSecRemaining: number = getRemainingTime();
  data.UI.minutesConverted = Math.trunc(timeInSecRemaining / 60);
  data.UI.secondsConverted = Math.trunc(timeInSecRemaining % 60);
}

function getRemainingTime(): number {
  if (data.timer.isBreak) {
    return data.timer.breakTimeInSecRemaining;
  } else {
    return data.timer.timeInSecRemaining;
  }
}

function requestNotificationPermission() {
  if (Notification.permission == "denied") return;

  Notification.requestPermission();
}

function reduceRemaingTime() {
  if (data.timer.isBreak) {
    data.timer.breakTimeInSecRemaining -= 1;
  } else {
    data.timer.timeInSecRemaining -= 1;
  }
}

export function init() {
  requestNotificationPermission();
  setupTimerData();
  calculateTimeFromRemainingSeconds();
}

export function getTime() {
  return {
    minutes: data.UI.minutesConverted,
    seconds: data.UI.secondsConverted
  };
}

export function startTimer(onTick: Function) {
  const webWorker = data.webWorker;

  webWorker.postMessage(TimerAction.Start);

  webWorker.onmessage = e => {
    if (e.data != TimerAction.Tick) return;

    reduceRemaingTime();
    calculateTimeFromRemainingSeconds();
    onTick(getRemainingTime() <= 0);
  };
}

export function pauseTimer() {
  const webWorker = data.webWorker;
  webWorker.postMessage(TimerAction.Pause);
}

export function stopTimer() {
  const webWorker = data.webWorker;
  webWorker.postMessage(TimerAction.Stop);
  resetRemainingTime();
  calculateTimeFromRemainingSeconds();
}

export function switchTimerMode() {
  data.timer.isBreak = !data.timer.isBreak;
  stopTimer();
}

export function toggleBreakTimer() {
  data.timer.isBreak = !data.timer.isBreak;
}

export function isBreakTimer() {
  return data.timer.isBreak;
}

export function isPomodoroAlmostDone(): boolean {
  const almostDoneTimeInSec: number =
    data.defaults.timeInSec - data.defaults.timeBeforeBreakInSec;

  const currentTimeDifferenceInSec: number =
    data.defaults.timeInSec - data.timer.timeInSecRemaining;

  return currentTimeDifferenceInSec === almostDoneTimeInSec;
}

export function getRemainingTimeString(): string {
  const remainingTimeInMinutes: number = getRemainingTime() / 60;
  const remainingTimeInSec: number = getRemainingTime() % 60;
  let minutesString: string = "";
  let secondsString: string = "";

  if (remainingTimeInMinutes === 1 ) {
    minutesString = `${remainingTimeInMinutes} minute`
  } else if (remainingTimeInMinutes > 1) {
    minutesString = `${remainingTimeInMinutes} minutes`
  }

  if (remainingTimeInSec === 1) {
    secondsString = `${remainingTimeInSec} second`
  } else if (remainingTimeInSec > 1) {
    secondsString = `${remainingTimeInSec} seconds`
  }

  if (!minutesString) return secondsString;
  if (!secondsString) return minutesString
  return `${minutesString} and ${secondsString}`;
}
