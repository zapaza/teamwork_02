import { AudioPlayer } from '@/core/game/models/audioPlayer';

export interface IVariables {
	tileLength: number;
	isWindowVisible: boolean;
	isGamePaused: boolean;
	score: number;
	lastKeyPressed: string;
	level: number;
	player: IPlayer | undefined;
	killCount: number;
	start: boolean;
	animationId: null | number;
	directionEventListener: ((event: KeyboardEvent) => void) | null;
	visibilityEventListener: ((event: KeyboardEvent) => void) | null;
	pauseEventListener: ((event: KeyboardEvent) => void) | null;
	levelUpCount: number;
	frameLifetime: number;
	startTime: number;
}

export interface ICoordinates {
	x: number;
	y: number;
}

export interface IWithPosition {
	position: ICoordinates;
	radius: number;
}

export interface IGameAssets {
	characters: {
		pacman: IPacman;
		ghosts: { [color: string]: IGhost };
	};
	props: {
		boundaries: IBoundary[];
		pellets: IPellet[];
		powerUps: IPowerUp[];
	};
	// audioPlayer: IAudioPlayer;
	timers: IGameTimers;
	pauseTextImage: any;
	audioPlayer: AudioPlayer;
}

export interface IGameTimers {
	scaredTimer: IGameTimer;
	cycleTimer: IGameTimer;
	retreatingTimers: IGameTimer[];
}

export interface IGameTimer {
	isRunning: boolean;
	duration?: number;
	start(cycleTimer?: IGameTimer): void;
	pause(): void;
	reset(): void;
	resume(cycleTimer?: IGameTimer): void;
}

export interface IPacman extends IWithPosition {
	rotation: number;
	speed: number;
	isEating: boolean;
	isLevellingUp: boolean;
	isShrinking: boolean;
	velocity: ICoordinates;
	lives: number;
	radians: number;
	update(ctx: CanvasRenderingContext2D): void;
	reset(): void;
	shrink(ctx: CanvasRenderingContext2D): void;
}

export interface IBoundary {
	position: ICoordinates;
	width: number;
	height: number;
	flash(): void;
	draw(ctx: CanvasRenderingContext2D): void;
}

export interface IEatingElements {
	position: ICoordinates;
	radius: number;
	hasBeenEaten: boolean;
	changeEatenState(): void;
}

export interface IPellet extends IEatingElements {
	draw(ctx: CanvasRenderingContext2D): void;
}

export interface IPowerUp extends IEatingElements {
	update(ctx: CanvasRenderingContext2D): void;
}

export interface IGhost extends IWithPosition {
	color: string;
	isScared: boolean;
	isRetreating: boolean;
	speed: number;
	prevCollisions: string[];
	velocity: ICoordinates;
	retreatingTimer: IGameTimer | null;
	isChasing: boolean;
	update(ctx: CanvasRenderingContext2D): void;
	reset(): void;
	changeRetreatingState(): void;
	changeScaredState(): void;
	changeChasingState(): void;
}

export interface IBoundaryParams {
	position: ICoordinates;
	regularImage: HTMLImageElement;
	whiteImage: HTMLImageElement;
}

export interface IGhostParams {
	position: ICoordinates;
	velocity: ICoordinates;
	color: string;
}

export interface IPacmanParams {
	position: ICoordinates;
	velocity: ICoordinates;
}

export interface IPathway {
	direction: string;
	distance?: number;
	position?: ICoordinates;
}

export interface IPlayer {
	id: number;
	login: string;
}
