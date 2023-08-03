import { IGameTimer, IGhost } from '../types'

/**
 * Класс `RetreatingTimer` представляет таймер для управления состоянием отступления (ретрита) призрака.
 */
export default class RetreatingTimer implements IGameTimer {
  timeout: number | null
  ghost: IGhost
  startTime: null | number
  timeRemaining: null | number
  isRunning: boolean

  constructor(ghost: IGhost) {
    this.timeout = null
    this.ghost = ghost
    this.startTime = null
    this.timeRemaining = null
    this.isRunning = false
  }

// @ts-ignore
  start(dateNow = Date.now()) {
    this.startTime = dateNow
    // @ts-ignore
    this.timeout = setTimeout(() => {
      this.ghost.changeRetreatingState()
      this.isRunning = false
    }, 3000)
    this.timeRemaining = 3000
    this.isRunning = true
  }

  pause(dateNow = Date.now()) {
    clearTimeout(this.timeout as number)
    const timeElapsed = dateNow - (this.startTime as number)
    this.timeRemaining = (this.timeRemaining as number) - timeElapsed
  }

  resume(dateNow = Date.now()) {
    this.startTime = dateNow
    // @ts-ignore
    this.timeout = setTimeout(() => {
      this.ghost.changeRetreatingState()
      this.isRunning = false
    }, this.timeRemaining as number)
  }

  reset() {
    clearTimeout(this.timeout as number)
    this.isRunning = false
  }
}
