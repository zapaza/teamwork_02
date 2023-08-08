export class BaseTimer {
  timeout: number | null
  startTime: null | number
  timeRemaining: null | number
  isRunning: boolean

  constructor() {
    this.timeout = null
    this.startTime = null
    this.timeRemaining = null
    this.isRunning = false
  }

  startTimer(duration: number, callback: () => void, dateNow = Date.now()) {
    this.startTime = dateNow
    this.timeout = window.setTimeout(() => {
      callback()
      this.isRunning = false
    }, duration)
    this.timeRemaining = duration
    this.isRunning = true
  }

  pause(dateNow = Date.now()) {
    window.clearTimeout(this.timeout as number)
    const timeElapsed = dateNow - (this.startTime as number)
    this.timeRemaining = (this.timeRemaining as number) - timeElapsed
  }

  resumeTimer(callback: () => void, dateNow = Date.now()) {
    this.startTime = dateNow
    this.timeout = window.setTimeout(() => {
      callback()
      this.isRunning = false
    }, this.timeRemaining as number)
  }

  reset() {
    window.clearTimeout(this.timeout as number)
    this.isRunning = false
  }
}
