import { IGhost } from '@/core/game/types';
import { BaseTimer } from '@/core/game/models/baseTimer';

export class CycleTimer extends BaseTimer {
	ghosts: IGhost[];
	count: number;

	constructor(ghosts: IGhost[]) {
		super();
		this.ghosts = ghosts;
		this.count = 0;
	}

	start(dateNow = Date.now()) {
		super.startTimer(
			this.count === 0 ? 7000 : 20000,
			() => this.switchChaseScatterState(),
			dateNow,
		);
		if (this.count === 0) {
			this.count++;
		} else {
			this.count--;
		}
	}

	resume() {
		super.resumeTimer(() => this.switchChaseScatterState(), Date.now());
	}

	private switchChaseScatterState() {
		this.ghosts.forEach(ghost => {
			ghost.changeChasingState();
		});
		this.carryOnCycle();
	}

	private carryOnCycle() {
		this.start();
	}
}
