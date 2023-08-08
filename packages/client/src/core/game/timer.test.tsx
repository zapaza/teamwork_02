import Timer from './timer'

const mockfn = jest.fn();
const mockOtherfn = jest.fn();

const pausedTimerObj = {
  isRunning: false,
  pause: mockOtherfn,
  start: mockOtherfn,
  reset: mockOtherfn,
  resume: mockOtherfn,
}

describe('Timer', () => {
  test('should pause timers retreatingTimers', () => {
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

  test('should pause timer scaredTimer', () => {
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
    expect(mockfn).toHaveBeenCalledTimes(3)
  })

  test('should pause timer cycleTimer', () => {
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
    expect(mockfn).toHaveBeenCalledTimes(4)
  })
})
