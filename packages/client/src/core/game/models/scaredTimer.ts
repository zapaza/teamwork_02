import { IGameTimer, IGhost } from '@/core/game/types';
import { BaseTimer } from '@/core/game/models/baseTimer';

export class ScaredTimer extends BaseTimer {
	ghosts: IGhost[];
	duration: number;

	constructor(ghosts: IGhost[]) {
		super();
		this.ghosts = ghosts;
		this.duration = 7000;
	}

	start(cycleTimer: IGameTimer, dateNow = Date.now()) {
		super.startTimer(
			this.duration,
			() => {
				this.ghosts.forEach(ghost => {
					if (ghost.isScared) {
						ghost.changeScaredState();
					}
				});
				cycleTimer.resume();
				this.isRunning = false;
			},
			dateNow,
		);
	}

	resume(cycleTimer: IGameTimer) {
		const callback = () => {
			this.ghosts.forEach(ghost => {
				if (ghost.isScared) ghost.changeScaredState();
			});
			cycleTimer.resume();
		};
		this.resumeTimer(callback, Date.now());
	}
}
