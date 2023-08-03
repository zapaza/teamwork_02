import { IGameTimer, IGhost } from '../types'

/**
 * Класс `CycleTimer` представляет таймер цикла переключения
 * состояния привидений между преследованием и разбеганием.
 */
export default class CycleTimer implements IGameTimer{
  timeout: number | null;
  ghosts: IGhost[]
  count: number
  startTime: null| number;
  timeRemaining: null| number
  isRunning: boolean

  constructor(ghosts: IGhost[]) {
    this.timeout = null;
    this.ghosts = ghosts;
    this.count = 0;
    this.startTime = null;
    this.timeRemaining = null;
    this.isRunning = false;
  }

  /**
   * Запускает таймер цикла.
   * @param dateNow Время в миллисекундах, относительно которого будет запущен таймер (по умолчанию текущее время).
   */
  // @ts-ignore
  start(dateNow = Date.now()) {
    this.startTime = dateNow;
    // @ts-ignore
    this.timeout = setTimeout(
      () => {
        this.switchChaseScatterState();
      },
      this.count === 0 ? 7000 : 20000
    );
    if (this.count === 0) {
      this.count++;
      this.timeRemaining = 7000;
    } else {
      this.count--;
      this.timeRemaining = 20000;
    }
    this.isRunning = true;
  }

  /**
   * Приостанавливает таймер цикла.
   * @param dateNow Время в миллисекундах, относительно которого будет приостановлен таймер (по умолчанию текущее время).
   */
  pause(dateNow = Date.now()) {
    clearTimeout(this.timeout as number);
    const timeElapsed = dateNow - (this.startTime as number);
    this.timeRemaining = (this.timeRemaining as number) - timeElapsed;
    this.isRunning = false;
  }

  /**
   * Возобновляет таймер цикла после приостановки.
   * @param dateNow Время в миллисекундах, относительно которого будет возобновлен таймер (по умолчанию текущее время).
   */
  resume(dateNow = Date.now()) {
    this.startTime = dateNow;
    // @ts-ignore
    this.timeout = setTimeout(() => {
      this.switchChaseScatterState();
    }, this.timeRemaining as number);
    this.isRunning = true;
  }

  /**
   * Сбрасывает таймер цикла в исходное состояние.
   */

  reset() {
    clearTimeout(this.timeout as number);
    this.count = 0;
    this.isRunning = false;
  }

  private switchChaseScatterState() {
    this.ghosts.forEach((ghost) => {
      ghost.changeChasingState();
    });
    this.carryOnCycle();
  }

  private carryOnCycle() {
    this.start();
  }
}
