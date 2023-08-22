import { Timer } from '@/core/game/timer';

const mockOtherfn = jest.fn();
let mockfn: jest.Mock;
const pausedTimerObj = {
	isRunning: false,
	pause: mockOtherfn,
	start: mockOtherfn,
	reset: mockOtherfn,
	resume: mockOtherfn,
};

describe('Timer', () => {
	beforeEach(() => {
		mockfn = jest.fn();
	});
	describe('Pause', () => {
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
			});
			expect(mockfn).toHaveBeenCalledTimes(2);
		});

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
			});
			expect(mockfn).toHaveBeenCalled();
		});

		test('should pause timer cycleTimer if scaredTimer.isRunning is false', () => {
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
			});
			expect(mockfn).toHaveBeenCalled();
		});
	});

	describe('Resume', () => {
		test('should resume timers retreatingTimers', () => {
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
			});
			expect(mockfn).toHaveBeenCalledTimes(2);
		});

		test('should resume timer scaredTimer', () => {
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
			});
			expect(mockfn).toHaveBeenCalled();
		});

		test('should resume timer cycleTimer if scaredTimer.isRunning is false', () => {
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
			});
			expect(mockfn).toHaveBeenCalled();
		});
	});
});
