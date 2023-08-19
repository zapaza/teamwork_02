import { ICoordinates, IGameTimer, IGhost, IGhostParams } from '../types';

/**
 * Класс `Ghost` представляет объект привидения в игре.
 */
export default class Ghost implements IGhost {
	position: ICoordinates;
	originalPosition: ICoordinates;
	velocity: ICoordinates;
	originalVelocity: ICoordinates;
	color: string;
	tileLength: number;
	radius: number;
	prevCollisions: [];
	retreatingTimer: IGameTimer | null;
	speed: number;
	isScared: boolean;
	isChasing: boolean;
	isRetreating: boolean;
	image: HTMLImageElement;
	up: HTMLImageElement;
	left: HTMLImageElement;
	right: HTMLImageElement;
	down: HTMLImageElement;
	scaredBlue: HTMLImageElement;
	eyesUp: HTMLImageElement;
	eyesLeft: HTMLImageElement;
	eyesRight: HTMLImageElement;
	eyesDown: HTMLImageElement;

	constructor({ position, velocity, color }: IGhostParams, tileLength: number) {
		this.originalPosition = position;
		this.position = { ...this.originalPosition };
		this.originalVelocity = velocity;
		this.velocity = { ...this.originalVelocity };
		this.tileLength = tileLength;
		this.radius = (this.tileLength * 3) / 8;
		this.color = color;
		this.prevCollisions = [];
		this.speed = this.tileLength / 8;
		this.isScared = false;
		this.isChasing = false;
		this.isRetreating = false;
		this.retreatingTimer = null;
		this.image = new Image();
		this.up = new Image();
		this.up.src = `./images/${this.color}-ghost-up.png`;
		this.left = new Image();
		this.left.src = `./images/${this.color}-ghost-left.png`;
		this.right = new Image();
		this.right.src = `./images/${this.color}-ghost-right.png`;
		this.down = new Image();
		this.down.src = `./images/${this.color}-ghost-down.png`;
		this.scaredBlue = new Image();
		this.scaredBlue.src = './images/scared-ghost-blue.png';
		this.eyesUp = new Image();
		this.eyesUp.src = './images/eyes-up.png';
		this.eyesLeft = new Image();
		this.eyesLeft.src = './images/eyes-left.png';
		this.eyesRight = new Image();
		this.eyesRight.src = './images/eyes-right.png';
		this.eyesDown = new Image();
		this.eyesDown.src = './images/eyes-down.png';
	}

	/**
	 * Рисует привидение на холсте.
	 * @param ctx Контекст рисования холста.
	 */
	draw(ctx: CanvasRenderingContext2D) {
		ctx.drawImage(
			this.image,
			this.position.x - this.radius * 2,
			this.position.y - this.radius * 2,
		);
	}

	/**
	 * Обновляет положение привидения и его спрайт на холсте.
	 * @param ctx Контекст рисования холста.
	 */
	update(ctx: CanvasRenderingContext2D) {
		this.assignSprite();
		this.draw(ctx);
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
	}

	/**
	 * Меняет состояние привидения на "испуганное" или "неиспуганное".
	 */
	changeScaredState() {
		this.isScared = !this.isScared;
	}

	/**
	 * Меняет состояние привидения на "преследующее" или "не преследующее".
	 */
	changeChasingState() {
		this.isChasing = !this.isChasing;
	}

	/**
	 * Меняет состояние привидения на "убегающее" или "не убегающее".
	 */
	changeRetreatingState() {
		this.isRetreating = !this.isRetreating;
	}

	/**
	 * Сбрасывает состояние привидения в исходное состояние.
	 */
	reset() {
		this.position = { ...this.originalPosition };
		this.velocity = { ...this.originalVelocity };
		this.speed = this.tileLength / 8;
		this.prevCollisions = [];

		this.resetStates();
	}

	assignSprite() {
		if (this.isRetreating) {
			this.assignRetreatingSprite();
		} else if (this.isScared) {
			this.assignScaredSprite();
		} else {
			this.assignRegularSprite();
		}
	}

	// private

	private resetStates() {
		if (this.isScared) {
			this.changeScaredState();
		}

		if (this.isChasing) {
			this.changeChasingState();
			this.retreatingTimer!.reset();
		}

		if (this.isRetreating) {
			this.changeRetreatingState();
		}
	}

	private assignRetreatingSprite() {
		if (this.velocity.y < 0) {
			this.image = this.eyesUp;
		} else if (this.velocity.x < 0) {
			this.image = this.eyesLeft;
		} else if (this.velocity.x > 0) {
			this.image = this.eyesRight;
		} else if (this.velocity.y > 0) {
			this.image = this.eyesDown;
		}
	}

	private assignScaredSprite() {
		this.image = this.scaredBlue;
	}

	private assignRegularSprite() {
		if (this.velocity.y < 0) {
			this.image = this.up;
		} else if (this.velocity.x < 0) {
			this.image = this.left;
		} else if (this.velocity.x > 0) {
			this.image = this.right;
		} else if (this.velocity.y > 0) {
			this.image = this.down;
		}
	}
}
