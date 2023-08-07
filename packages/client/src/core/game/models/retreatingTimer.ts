import { IGhost } from '../types'
import { BaseTimer } from './baseTimer'

export default class RetreatingTimer extends BaseTimer {
  ghost: IGhost

  constructor(ghost: IGhost) {
    super()
    this.ghost = ghost
  }

  start(dateNow = Date.now()) {
    super.startTimer(
      3000,
      () => {
        this.ghost.changeRetreatingState()
        this.isRunning = false
      },
      dateNow
    )
  }
  pause() {
    this.pauseTimer(Date.now())
  }

  resume() {
    this.resumeTimer(this.ghost.changeRetreatingState, Date.now())
  }

  reset() {
    this.resetTimer()
  }
}
