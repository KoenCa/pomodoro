import { TimerAction } from "../typescript/enums"

let intervalId;

onmessage = (e) => {
  switch (e.data) {
    case TimerAction.Start:
      intervalId = setInterval(() => {
        postMessage(TimerAction.Tick);
      }, 1000);

      break;

    case TimerAction.Stop:
      clearInterval(intervalId);

      break;

    case TimerAction.Pause:
      clearInterval(intervalId);

      break;

    default:
      break;
  }
}
