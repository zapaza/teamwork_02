import { IGameTimers } from './types'

export default class Timer {
  /**
   * Приостанавливает работу таймеров игры.
   * @param timers - Объект с игровыми таймерами.
   */
  static pauseTimers(timers: IGameTimers) {
    if (timers.scaredTimer.isRunning) {
      timers.scaredTimer.pause()
    } else {
      timers.cycleTimer.pause()
    }
    timers.retreatingTimers.forEach(timer => {
      if (timer.isRunning) {
        timer.pause()
      }
    })
  }

  /**
   * Возобновляет работу таймеров игры после приостановки.
   * @param timers - Объект с игровыми таймерами.
   */
  static resumeTimers(timers: IGameTimers) {
    if (timers.scaredTimer.isRunning) {
      //@ts-ignore
      timers.scaredTimer.resume(timers.cycleTimer)
    } else {
      timers.cycleTimer.resume()
    }
    timers.retreatingTimers.forEach(timer => {
      if (timer.isRunning) {
        timer.resume()
      }
    })
  }
}
