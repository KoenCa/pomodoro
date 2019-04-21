import { TimerWorkerMessage } from "../typescript/interfaces";
import { TimerAction } from "../typescript/enums"

let intervalId;

onmessage = (e) => {
  const { action } = e.data;
  switch (action) {
    case TimerAction.Start:
      intervalId = setInterval(() => {
        const tickMsg = <TimerWorkerMessage> {
          action: TimerAction.Tick
        };
        postMessage(tickMsg);
      }, 1000);

      break;

    case TimerAction.Stop:
      console.log("stop");

      break;

    case TimerAction.Pause:
      console.log("pause");

      break;

    default:
      break;
  }
}
