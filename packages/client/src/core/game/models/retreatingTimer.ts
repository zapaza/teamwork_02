import { IGhost } from '@/core/game/types';
import { BaseTimer } from '@/core/game/models/baseTimer';

export class RetreatingTimer extends BaseTimer {
	ghost: IGhost;

	constructor(ghost: IGhost) {
		super();
		this.ghost = ghost;
	}

	start(dateNow = Date.now()) {
		super.startTimer(
			3000,
			() => {
				this.ghost.changeRetreatingState();
				this.isRunning = false;
			},
			dateNow,
		);
	}

	resume() {
		this.resumeTimer(() => this.ghost.changeRetreatingState, Date.now());
	}
}
