import { IGameTimer, IGhost } from '../types'

/**
 * Класс `ScaredTimer` представляет таймер для управления состоянием испуганных призраков.
 */
export default class ScaredTimer implements IGameTimer {
  timeout: number | null;
  ghosts: IGhost[]
  duration: number
  startTime: null| number;
  timeRemaining: null| number
  isRunning: boolean

  constructor(ghosts: IGhost[]) {
    this.timeout = null;
    this.ghosts = ghosts;
    this.startTime = null;
    this.timeRemaining = null;
    this.isRunning = false;
    this.duration = 7000;
  }

  start(cycleTimer: IGameTimer, dateNow = Date.now()) {
    this.startTime = dateNow;
    // @ts-ignore
    this.timeout = setTimeout(() => {
      this.ghosts.forEach((ghost) => {
        if (ghost.isScared) ghost.changeScaredState();
      });
      cycleTimer.resume();
      this.isRunning = false;
    }, this.duration);
    this.timeRemaining = this.duration;
    this.isRunning = true;
  }

  pause(dateNow = Date.now()) {
    clearTimeout(this.timeout as number);
    const timeElapsed = dateNow - (this.startTime as number);
    this.timeRemaining = (this.timeRemaining as number) - timeElapsed;
  }

  // @ts-ignore
  resume(cycleTimer: IGameTimer, dateNow = Date.now()) {
    this.startTime = dateNow;
    // @ts-ignore
    this.timeout = setTimeout(() => {
      this.ghosts.forEach((ghost) => {
        if (ghost.isScared) ghost.changeScaredState();
      });
      cycleTimer.resume();
      this.isRunning = false;
    }, this.timeRemaining as number);
  }

  reset() {
    clearTimeout(this.timeout as number);
    this.isRunning = false;
  }
}
