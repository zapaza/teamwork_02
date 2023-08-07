import { IGhost } from '../types'
import { BaseTimer } from './baseTimer'

export default class CycleTimer extends BaseTimer {
  ghosts: IGhost[]
  count: number

  constructor(ghosts: IGhost[]) {
    super()
    this.ghosts = ghosts
    this.count = 0
  }

  start(dateNow = Date.now()) {
    super.startTimer(
      this.count === 0 ? 7000 : 20000,
      () => this.switchChaseScatterState(),
      dateNow
    )
    if (this.count === 0) {
      this.count++
    } else {
      this.count--
    }
  }

  pause() {
    this.pauseTimer(Date.now())
    this.isRunning = false
  }

  resume() {
    this.resumeTimer(this.switchChaseScatterState, Date.now())
  }

  reset() {
    this.resetTimer()
  }

  private switchChaseScatterState() {
    this.ghosts.forEach(ghost => {
      ghost.changeChasingState()
    })
    this.carryOnCycle()
  }

  private carryOnCycle() {
    this.start()
  }
}
