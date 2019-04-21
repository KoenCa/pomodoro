import { TimerAction } from "./enums";

export interface TimerWorkerMessage {
  action: TimerAction;
}
