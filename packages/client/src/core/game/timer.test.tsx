import Timer from './timer'

const mockOtherfn = jest.fn()

const pausedTimerObj = {
  isRunning: false,
  pause: mockOtherfn,
  start: mockOtherfn,
  reset: mockOtherfn,
  resume: mockOtherfn,
}

describe('Timer', () => {
  test('should pause timers retreatingTimers', () => {
    const mockfn = jest.fn()
    Timer.pauseTimers({
      scaredTimer: pausedTimerObj,
      cycleTimer: pausedTimerObj,
      retreatingTimers: [
        pausedTimerObj,
        {
          isRunning: true,
          pause: mockfn,
          start: mockOtherfn,
          reset: mockOtherfn,
          resume: mockOtherfn,
        },
        {
          isRunning: true,
          pause: mockfn,
          start: mockOtherfn,
          reset: mockOtherfn,
          resume: mockOtherfn,
        },
      ],
    })
    expect(mockfn).toHaveBeenCalledTimes(2)
  })

  test('should resume timers retreatingTimers', () => {
    const mockfn = jest.fn()
    Timer.resumeTimers({
      scaredTimer: pausedTimerObj,
      cycleTimer: pausedTimerObj,
      retreatingTimers: [
        pausedTimerObj,
        {
          isRunning: true,
          pause: mockOtherfn,
          start: mockOtherfn,
          reset: mockOtherfn,
          resume: mockfn,
        },
        {
          isRunning: true,
          pause: mockOtherfn,
          start: mockOtherfn,
          reset: mockOtherfn,
          resume: mockfn,
        },
      ],
    })
    expect(mockfn).toHaveBeenCalledTimes(2)
  })

  test('should pause timer scaredTimer', () => {
    const mockfn = jest.fn()
    Timer.pauseTimers({
      scaredTimer: {
        isRunning: true,
        pause: mockfn,
        start: mockOtherfn,
        reset: mockOtherfn,
        resume: mockOtherfn,
      },
      cycleTimer: pausedTimerObj,
      retreatingTimers: [],
    })
    expect(mockfn).toHaveBeenCalled()
  })

  test('should pause timer cycleTimer if scaredTimer.isRunning is false', () => {
    const mockfn = jest.fn()
    Timer.pauseTimers({
      scaredTimer: pausedTimerObj,
      cycleTimer: {
        isRunning: true,
        pause: mockfn,
        start: mockOtherfn,
        reset: mockOtherfn,
        resume: mockOtherfn,
      },
      retreatingTimers: [],
    })
    expect(mockfn).toHaveBeenCalled()
  })

  test('should resume timer scaredTimer', () => {
    const mockfn = jest.fn()
    Timer.resumeTimers({
      scaredTimer: {
        isRunning: true,
        pause: mockOtherfn,
        start: mockOtherfn,
        reset: mockOtherfn,
        resume: mockfn,
      },
      cycleTimer: pausedTimerObj,
      retreatingTimers: [],
    })
    expect(mockfn).toHaveBeenCalled()
  })

  test('should resume timer cycleTimer if scaredTimer.isRunning is false', () => {
    const mockfn = jest.fn()
    Timer.resumeTimers({
      scaredTimer: pausedTimerObj,
      cycleTimer: {
        isRunning: true,
        pause: mockOtherfn,
        start: mockOtherfn,
        reset: mockOtherfn,
        resume: mockfn,
      },
      retreatingTimers: [],
    })
    expect(mockfn).toHaveBeenCalled()
  })
})
