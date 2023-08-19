import { IBoundary, IGameAssets, IGameTimer, IGhost, IPellet, IPowerUp, IVariables } from './types';
import Boundary from './models/boundary';
import Pellet from './models/pellet';
import PowerUp from './models/powerUp';
import Ghost from './models/ghost';
import PacMan from './models/pacman';
import CycleTimer from './models/cycleTymer';
import ScaredTimer from './models/scaredTimer';
import RetreatingTimer from './models/retreatingTimer';
import AudioPlayer from './models/audioPlayer';

/**
 * Фабрика для создания различных объектов игры, таких как границы, точки, привидения, PacMan и таймеры.
 */
export class GameFactory {
	static PIPE_NAMES: Record<string, string> = {
		'-': 'horizontal',
		'|': 'vertical',
		1: 'corner-one',
		2: 'corner-two',
		3: 'corner-three',
		4: 'corner-four',
	};

	static TUNNEL_DATA = [
		{ position: { x: -1, y: 13 } },
		{ position: { x: -1, y: 15 } },
		{ position: { x: 28, y: 13 } },
		{ position: { x: 28, y: 15 } },
	];

	static GHOST_DATA = [
		{
			color: 'red',
			position: { x: 31, y: 23 },
			velocity: { x: 0, y: -1 / 8 },
		},
		{
			color: 'pink',
			position: { x: 25, y: 23 },
			velocity: { x: 0, y: -1 / 8 },
		},
		{
			color: 'cyan',
			position: { x: 37, y: 29 },
			velocity: { x: 1 / 8, y: 0 },
		},
		{
			color: 'orange',
			position: { x: 19, y: 29 },
			velocity: { x: -1 / 8, y: 0 },
		},
	];

	/**
	 * Создает все необходимые ресурсы для игры на основе предоставленных данных карты и переменных.
	 * @param map Массив, представляющий игровую карту.
	 * @param variables Объект с переменными игры.
	 * @returns Объект, содержащий все необходимые ресурсы для игры.
	 */
	static makeAssets(map: string[], variables: IVariables): IGameAssets {
		const ghosts = this.makeGhosts(variables);
		return {
			props: {
				boundaries: this.makeBoundaries(map, variables),
				pellets: this.makePellets(map, variables),
				powerUps: this.makePowerUps(map, variables),
			},
			characters: {
				ghosts: ghosts,
				pacman: this.makePacman(variables),
			},
			timers: {
				cycleTimer: this.makeCycleTimer(ghosts) as IGameTimer,
				scaredTimer: this.makeScaredTimer(ghosts) as unknown as IGameTimer,
				retreatingTimers: this.makeRetreatingTimers(ghosts) as IGameTimer[],
			},
			pauseTextImage: this.makePauseTextImage(),
			audioPlayer: this.makeAudioPlayer(),
		};
	}

	/**
	 * Создает границы для игровой карты на основе предоставленных данных карты и переменных.
	 * @param map Массив, представляющий игровую карту.
	 * @param variables Объект с переменными игры.
	 * @returns Массив объектов границ.
	 */
	static makeBoundaries(map: string[], variables: IVariables) {
		const boundaries: IBoundary[] = [];
		map.forEach((row, i) => {
			row.split('').forEach((element, j) => {
				if (element !== ' ' && element !== '.' && element !== 'o') {
					const regularImage = new Image();
					regularImage.src = `./images/pipe-${this.PIPE_NAMES[element]}.png`;
					const whiteImage = new Image();
					whiteImage.src = `./images/pipe-${this.PIPE_NAMES[element]}-white.png`;
					const boundary = new Boundary(
						{
							position: {
								x: variables.tileLength * j,
								y: variables.tileLength * i,
							},
							regularImage: regularImage,
							whiteImage: whiteImage,
						},
						variables.tileLength,
					);
					boundaries.push(boundary);
				}
			});
		});
		this.makeTunnelBoundaries(boundaries, variables);
		return boundaries;
	}

	/**
	 * Создает туннельные границы для игровой карты на основе предоставленных данных переменных.
	 * @param boundaries Массив объектов границ, к которому будут добавлены туннельные границы.
	 * @param variables Объект с переменными игры.
	 */
	static makeTunnelBoundaries(boundaries: IBoundary[], variables: IVariables) {
		const regularImage = new Image();
		regularImage.src = './images/pipe-horizontal.png';
		const whiteImage = new Image();
		whiteImage.src = './images/pipe-horizontal-white.png';
		this.TUNNEL_DATA.forEach(data => {
			const tunnelBoundary = new Boundary(
				{
					position: {
						x: variables.tileLength * data.position.x,
						y: variables.tileLength * data.position.y,
					},
					regularImage: regularImage,
					whiteImage: whiteImage,
				},
				variables.tileLength,
			);
			boundaries.push(tunnelBoundary);
		});
	}

	/**
	 * Создает точки для игровой карты на основе предоставленных данных карты и переменных.
	 * @param map Массив, представляющий игровую карту.
	 * @param variables Объект с переменными игры.
	 * @returns Массив объектов точек.
	 */
	static makePellets(map: string[], variables: IVariables) {
		const pellets: IPellet[] = [];
		map.forEach((row, i) => {
			row.split('').forEach((element, j) => {
				if (element === '.') {
					const pellet = new Pellet(
						{
							position: this.calculatePositionEatingElements(
								variables.tileLength,
								j,
								i,
							),
						},
						variables.tileLength,
					);
					pellets.push(pellet);
				}
			});
		});
		return pellets;
	}

	/**
	 * Создает усилители для игровой карты на основе предоставленных данных карты и переменных.
	 * @param map Массив, представляющий игровую карту.
	 * @param variables Объект с переменными игры.
	 * @returns Массив объектов усилителей.
	 */
	static makePowerUps(map: string[], variables: IVariables) {
		const powerUps: IPowerUp[] = [];
		map.forEach((row, i) => {
			row.split('').forEach((element, j) => {
				if (element === 'o') {
					const powerUp = new PowerUp(
						{
							position: this.calculatePositionEatingElements(
								variables.tileLength,
								j,
								i,
							),
						},
						variables.tileLength,
					);
					powerUps.push(powerUp);
				}
			});
		});
		return powerUps;
	}

	/**
	 * Создает привидений для игры на основе предоставленных данных переменных.
	 * @param variables Объект с переменными игры.
	 * @returns Объект, содержащий привидений с ключами "red", "pink", "cyan" и "orange".
	 */
	static makeGhosts(variables: IVariables) {
		const ghosts: Record<string, IGhost> = {};
		this.GHOST_DATA.forEach(data => {
			ghosts[data.color] = new Ghost(
				{
					position: {
						x: (variables.tileLength * data.position.x) / 2,
						y: (variables.tileLength * data.position.y) / 2,
					},
					velocity: {
						x: variables.tileLength * data.velocity.x,
						y: variables.tileLength * data.velocity.y,
					},
					color: data.color,
				},
				variables.tileLength,
			);
		});
		return ghosts;
	}

	/**
	 * Создает PacMan'а для игры на основе предоставленных данных переменных.
	 * @param variables Объект с переменными игры.
	 * @returns Объект PacMan'а.
	 */
	static makePacman(variables: IVariables) {
		return new PacMan(
			{
				position: {
					// eslint-disable-next-line max-len
					x: (variables.tileLength * 28) / 2, // общее кол-во столбцов - 2 клетки по краям (30-2) чтобы более точно расположить пакмана по центру
					// eslint-disable-next-line max-len
					y: (variables.tileLength * 47) / 2, // 24*2 - 1, 24 нужная строка на карте, умножаем на 2 и вычитаем 1 для более точного расположения посередине строки
				},
				velocity: {
					x: 0,
					y: 0,
				},
			},
			variables.tileLength,
		);
	}

	/**
	 * Создает таймер цикла для игры на основе предоставленных данных привидений.
	 * @param ghosts Объект с привидениями.
	 * @returns Объект таймера цикла.
	 */
	static makeCycleTimer(ghosts: Record<string, IGhost>) {
		return new CycleTimer(Object.values(ghosts));
	}

	/**
	 * Создает таймер испуга для игры на основе предоставленных данных привидений.
	 * @param ghosts Объект с привидениями.
	 * @returns Объект таймера испуга.
	 */
	static makeScaredTimer(ghosts: Record<string, IGhost>) {
		return new ScaredTimer(Object.values(ghosts));
	}

	/**
	 * Создает таймеры ухода привидений для игры на основе предоставленных данных привидений.
	 * @param ghosts Объект с привидениями.
	 * @returns Массив объектов таймеров ухода привидений.
	 */
	static makeRetreatingTimers(ghosts: Record<string, IGhost>) {
		const retreatingTimers: IGameTimer[] = [];
		Object.values(ghosts).forEach(ghost => {
			const retreatingTimer = new RetreatingTimer(ghost);
			ghost.retreatingTimer = retreatingTimer as IGameTimer;
			retreatingTimers.push(retreatingTimer as IGameTimer);
		});
		return retreatingTimers;
	}

	/**
	 * Создает изображение с текстом паузы для игры.
	 * @returns Изображение с текстом паузы.
	 */
	static makePauseTextImage() {
		const image = new Image();
		image.src = './images/pause-text.png';
		return image;
	}

	/**
	 * создаем инстанс аудиоплеера
	 */
	static makeAudioPlayer() {
		return new AudioPlayer();
	}

	/**
	 * метод расчета поциций для палетов и поверапов
	 */
	private static calculatePositionEatingElements(tileLength: number, j: number, i: number) {
		return {
			x: (tileLength * (2 * j + 1)) / 2,
			y: (tileLength * (2 * i + 1)) / 2,
		};
	}
}
