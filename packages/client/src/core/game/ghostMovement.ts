import { ICoordinates, IGameAssets, IGhost, IPacman, IPathway, IVariables } from './types';

/**
 * Класс `GhostMovement` предоставляет функции для управления движением призраков в игре.
 */
export default class GhostMovement {
	private static canvasWidth = 896;
	private static canvasHeight = 992;

	/**
	 * Корректирует позицию призрака в зависимости от его
	 * текущего состояния (отступление или обычное движение).
	 * @param ghost Объект призрака.
	 */
	static adjustPosition(ghost: IGhost) {
		if (ghost.isRetreating) {
			this.shiftBeforeRetreating(ghost);
		} else {
			this.shiftRegular(ghost);
		}
	}

	/**
	 * Корректирует позицию призрака перед отступлением.
	 * @param ghost Объект призрака.
	 */
	static shiftBeforeRetreating(ghost: IGhost) {
		if (ghost.velocity.x > 0) {
			this.shiftLeft(ghost);
		} else if (ghost.velocity.x < 0) {
			this.shiftRight(ghost);
		}
		if (ghost.velocity.y > 0) {
			this.shiftUp(ghost);
		} else if (ghost.velocity.y < 0) {
			this.shiftDown(ghost);
		}
	}

	/**
	 * Корректирует позицию призрака при обычном движении.
	 * @param ghost Объект призрака.
	 */
	static shiftRegular(ghost: IGhost) {
		if (ghost.position.x % 4 !== 0) {
			ghost.position.x += 2;
		}
		if (ghost.position.y % 4 !== 0) {
			ghost.position.y += 2;
		}
	}

	/**
	 * Корректирует позицию призрака влево.
	 * @param ghost Объект призрака.
	 */
	static shiftLeft(ghost: IGhost) {
		if (ghost.position.x % 8 === 2) {
			ghost.position.x -= 2;
		} else if (ghost.position.x % 8 === 4) {
			ghost.position.x -= 4;
		} else if (ghost.position.x % 8 === 6) {
			ghost.position.x -= 6;
		}
	}

	/**
	 * Корректирует позицию призрака вправо.
	 * @param ghost Объект призрака.
	 */
	static shiftRight(ghost: IGhost) {
		if (ghost.position.x % 8 === 2) {
			ghost.position.x += 6;
		} else if (ghost.position.x % 8 === 4) {
			ghost.position.x += 4;
		} else if (ghost.position.x % 8 === 6) {
			ghost.position.x += 2;
		}
	}

	/**
	 * Корректирует позицию призрака вверх.
	 * @param ghost Объект призрака.
	 */
	static shiftUp(ghost: IGhost) {
		if (ghost.position.y % 8 === 2) {
			ghost.position.y -= 2;
		} else if (ghost.position.y % 8 === 4) {
			ghost.position.y -= 4;
		} else if (ghost.position.y % 8 === 6) {
			ghost.position.y -= 6;
		}
	}

	/**
	 * Корректирует позицию призрака вниз.
	 * @param ghost Объект призрака.
	 */
	static shiftDown(ghost: IGhost) {
		if (ghost.position.y % 8 === 2) {
			ghost.position.y += 6;
		} else if (ghost.position.y % 8 === 4) {
			ghost.position.y += 4;
		} else if (ghost.position.y % 8 === 6) {
			ghost.position.y += 2;
		}
	}

	/**
	 * Осуществляет преследование или разбегание призрака в зависимости от его текущего состояния.
	 * @param ghost Объект призрака.
	 * @param assets Объект с ресурсами игры (звуки, изображения и т. д.).
	 * @param collisions Массив со списком направлений, которые призрак не может выбрать из-за
	 * препятствий.
	 * @param variables Объект с переменными и состояниями игры.
	 */
	static chaseAndScatter(
		ghost: IGhost,
		assets: IGameAssets,
		collisions: string[],
		variables: IVariables,
	) {
		if (ghost.velocity.x > 0) {
			ghost.prevCollisions.push('right');
		} else if (ghost.velocity.x < 0) {
			ghost.prevCollisions.push('left');
		} else if (ghost.velocity.y > 0) {
			ghost.prevCollisions.push('down');
		} else if (ghost.velocity.y < 0) {
			ghost.prevCollisions.push('up');
		}

		const pathways: IPathway[] = [];
		ghost.prevCollisions.forEach(collision => {
			if (!collisions.includes(collision)) {
				pathways.push({ direction: collision });
			}
		});
		this.calculateDistance(assets, ghost, pathways, variables);
		this.pickDirection(pathways, ghost);
	}

	/**
	 * Вычисляет расстояние между призраком и целевыми направлениями.
	 * @param assets Объект с ресурсами игры (звуки, изображения и т. д.).
	 * @param ghost Объект призрака.
	 * @param pathways Массив с возможными направлениями для движения призрака.
	 * @param variables Объект с переменными и состояниями игры.
	 */
	static calculateDistance(
		assets: IGameAssets,
		ghost: IGhost,
		pathways: IPathway[],
		variables: IVariables,
	) {
		pathways.forEach(pathway => {
			this.addCoordinates(pathway, ghost, variables);
			let displacementFromAim;
			if (ghost.isChasing) {
				displacementFromAim = this.chase(ghost, pathway, assets, variables);
			} else if (!ghost.isChasing) {
				displacementFromAim = this.scatter(ghost, pathway);
			}
			this.calculateHypotenuse(displacementFromAim as ICoordinates, pathway);
		});
	}

	/**
	 * Добавляет координаты целевых направлений к путям движения призрака.
	 * @param pathway Объект пути движения призрака.
	 * @param ghost Объект призрака.
	 * @param variables Объект с переменными и состояниями игры.
	 */
	static addCoordinates(pathway: IPathway, ghost: IGhost, variables: IVariables) {
		if (pathway.direction === 'up') {
			pathway.position = {
				x: ghost.position.x,
				y: ghost.position.y - variables.tileLength / 8,
			};
		} else if (pathway.direction === 'left') {
			pathway.position = {
				x: ghost.position.x - variables.tileLength / 8,
				y: ghost.position.y,
			};
		} else if (pathway.direction === 'right') {
			pathway.position = {
				x: ghost.position.x + variables.tileLength / 8,
				y: ghost.position.y,
			};
		} else if (pathway.direction === 'down') {
			pathway.position = {
				x: ghost.position.x,
				y: ghost.position.y + variables.tileLength / 8,
			};
		}
	}

	/**
	 * Вычисляет вектор направления преследования призрака к пакману.
	 * @param ghost Объект призрака.
	 * @param pathway Объект пути движения призрака.
	 * @param assets Объект с ресурсами игры (звуки, изображения и т. д.).
	 * @param variables Объект с переменными и состояниями игры.
	 */
	static chase(ghost: IGhost, pathway: IPathway, assets: IGameAssets, variables: IVariables) {
		if (
			ghost.color === 'red' ||
			(ghost.color === 'orange' &&
				this.isOrangeFarFromPacman(ghost, assets.characters.pacman, variables))
		) {
			return this.findRedOrangeAimPath(assets.characters.pacman, pathway);
		} else if (ghost.color === 'pink') {
			return this.findPinkAimPath(assets.characters.pacman, pathway, variables);
		} else if (ghost.color === 'cyan') {
			return this.findCyanAimPath(assets, variables, pathway);
		} else if (ghost.color === 'orange') {
			return this.findOrangeScatterPath(pathway);
		}
	}

	/**
	 * Проверяет, находится ли оранжевый призрак достаточно далеко от пакмана.
	 * @param orangeGhost Объект оранжевого призрака.
	 * @param pacman Объект пакмана.
	 * @param variables Объект с переменными и состояниями игры.
	 * @returns `true`, если оранжевый призрак находится достаточно далеко от пакмана,
	 * в противном случае `false`.
	 */
	static isOrangeFarFromPacman(orangeGhost: IGhost, pacman: IPacman, variables: IVariables) {
		const x = pacman.position.x - orangeGhost.position.x;
		const y = pacman.position.y - orangeGhost.position.y;
		const distance = Math.hypot(x, y);
		return distance > variables.tileLength * 8;
	}

	/**
	 * Вычисляет вектор направления преследования к пакману для красного и оранжевого призрака.
	 * @param pacman Объект пакмана.
	 * @param pathway Объект пути движения призрака.
	 * @returns Объект с вектором направления преследования к пакману.
	 */
	static findRedOrangeAimPath(pacman: IPacman, pathway: IPathway): ICoordinates {
		return {
			x: pacman.position.x - pathway.position!.x,
			y: pacman.position.y - pathway.position!.y,
		};
	}

	/**
	 * Вычисляет вектор направления преследования к пакману для розового призрака.
	 * @param pacman Объект пакмана.
	 * @param pathway Объект пути движения призрака.
	 * @param variables Объект с переменными и состояниями игры.
	 * @returns Объект с вектором направления преследования к пакману.
	 */
	static findPinkAimPath(
		pacman: IPacman,
		pathway: IPathway,
		variables: IVariables,
	): ICoordinates {
		let x = pacman.position.x - pathway.position!.x;
		let y = pacman.position.y - pathway.position!.y;

		if (pacman.rotation === 0) {
			x += variables.tileLength * 4;
		} else if (pacman.rotation === Math.PI / 2) {
			y += variables.tileLength * 4;
		} else if (pacman.rotation === Math.PI) {
			x -= variables.tileLength * 4;
		} else if (pacman.rotation === (Math.PI * 3) / 2) {
			y -= variables.tileLength * 4;
		}

		return {
			x: x,
			y: y,
		};
	}

	/**
	 * Вычисляет вектор направления преследования к пакману для голубого призрака.
	 * @param assets Объект с ресурсами игры (звуки, изображения и т. д.).
	 * @param variables Объект с переменными и состояниями игры.
	 * @param pathway Объект пути движения призрака.
	 * @returns Объект с вектором направления преследования к пакману.
	 */
	static findCyanAimPath(
		assets: IGameAssets,
		variables: IVariables,
		pathway: IPathway,
	): ICoordinates {
		const pacman = assets.characters.pacman;
		const redGhost = assets.characters.ghosts.red;

		let x = pacman.position.x * 2 - redGhost.position.x;
		let y = pacman.position.y * 2 - redGhost.position.y;

		if (pacman.rotation === 0) {
			x += variables.tileLength * 2;
		} else if (pacman.rotation === Math.PI / 2) {
			y += variables.tileLength * 2;
		} else if (pacman.rotation === Math.PI) {
			x -= variables.tileLength * 2;
		} else if (pacman.rotation === (Math.PI * 3) / 2) {
			y -= variables.tileLength * 2;
		}
		return {
			x: x - pathway.position!.x,
			y: y - pathway.position!.y,
		};
	}

	/**
	 * Выполняет движение привидения в режиме рассеивания.
	 * В зависимости от цвета привидения, метод выбирает наилучшее направление движения
	 * для рассеивания.
	 * @param ghost Объект призрака.
	 * @param pathway Объект пути движения призрака.
	 */
	static scatter(ghost: IGhost, pathway: IPathway) {
		if (ghost.color === 'red') {
			return this.findRedScatterPath(pathway);
		} else if (ghost.color === 'pink') {
			return this.findPinkScatterPath(pathway);
		} else if (ghost.color === 'cyan') {
			return this.findCyanScatterPath(pathway);
		} else if (ghost.color === 'orange') {
			return this.findOrangeScatterPath(pathway);
		}
	}

	/**
	 * Вычисляет вектор направления разбегания для красного призрака.
	 * @param pathway Объект пути движения призрака.
	 * @returns Объект с вектором направления разбегания.
	 */
	static findRedScatterPath(pathway: IPathway): ICoordinates {
		return {
			x: this.canvasWidth - pathway.position!.x,
			y: -pathway.position!.y,
		};
	}

	/**
	 * Вычисляет вектор направления разбегания для розового призрака.
	 * @param pathway Объект пути движения призрака.
	 * @returns Объект с вектором направления разбегания.
	 */
	static findPinkScatterPath(pathway: IPathway): ICoordinates {
		return {
			x: -pathway.position!.x,
			y: -pathway.position!.y,
		};
	}

	/**
	 * Вычисляет вектор направления разбегания для синего призрака.
	 * @param pathway Объект пути движения призрака.
	 * @returns Объект с вектором направления разбегания.
	 */

	static findCyanScatterPath(pathway: IPathway): ICoordinates {
		return {
			x: this.canvasWidth - pathway.position!.x,
			y: this.canvasHeight - pathway.position!.y,
		};
	}

	/**
	 * Вычисляет вектор направления разбегания для оранжевого призрака.
	 * @param pathway Объект пути движения призрака.
	 * @returns Объект с вектором направления разбегания.
	 */
	static findOrangeScatterPath(pathway: IPathway): ICoordinates {
		return {
			x: -pathway.position!.x,
			y: this.canvasHeight - pathway.position!.y,
		};
	}

	/**
	 * Вычисляет гипотенузу треугольника по двум катетам.
	 * @param vector Объект с координатами катетов.
	 * @param pathway Объект пути движения призрака.
	 */
	static calculateHypotenuse(vector: ICoordinates, pathway: IPathway) {
		pathway.distance = Math.hypot(vector.x, vector.y);
	}

	/**
	 * Выбирает направление движения призрака в зависимости от его целевых направлений.
	 * @param pathways Массив с возможными направлениями для движения призрака.
	 * @param ghost Объект призрака.
	 */
	static pickDirection(pathways: IPathway[], ghost: IGhost) {
		let shortest: undefined | IPathway;
		for (let i = 0; i < pathways.length; i++) {
			if (
				shortest === undefined ||
				(pathways[i].distance as number) < (shortest.distance as number)
			)
				shortest = pathways[i];
		}
		if (shortest?.direction === 'up') {
			ghost.velocity.x = 0;
			ghost.velocity.y = -ghost.speed;
		} else if (shortest?.direction === 'left') {
			ghost.velocity.x = -ghost.speed;
			ghost.velocity.y = 0;
		} else if (shortest?.direction === 'right') {
			ghost.velocity.x = ghost.speed;
			ghost.velocity.y = 0;
		} else if (shortest?.direction === 'down') {
			ghost.velocity.x = 0;
			ghost.velocity.y = ghost.speed;
		}
	}

	/**
	 * Очищает массив с предыдущими направлениями призрака.
	 * @param ghost Объект призрака.
	 */
	static emptyPrevCollisions(ghost: IGhost) {
		ghost.prevCollisions = [];
	}

	/**
	 * Двигает призрака случайным образом в пределах возможных направлений.
	 * @param ghost Объект призрака.
	 * @param collisions Массив со списком направлений, которые призрак не может выбрать
	 * из-за препятствий.
	 */
	static moveRandomly(ghost: IGhost, collisions: string[]) {
		if (ghost.velocity.x > 0) ghost.prevCollisions.push('right');
		else if (ghost.velocity.x < 0) ghost.prevCollisions.push('left');
		else if (ghost.velocity.y > 0) ghost.prevCollisions.push('down');
		else if (ghost.velocity.y < 0) ghost.prevCollisions.push('up');

		const pathways = ghost.prevCollisions.filter(collision => {
			return !collisions.includes(collision);
		});
		this.pickRandomDirection(ghost, pathways);
	}

	/**
	 * Выбирает случайное направление движения призрака из возможных путей.
	 * @param ghost Объект призрака.
	 * @param pathways Массив с возможными направлениями для движения призрака.
	 */
	static pickRandomDirection(ghost: IGhost, pathways: string[]) {
		const direction = pathways[Math.floor(Math.random() * pathways.length)];
		if (direction === 'up') {
			ghost.velocity.x = 0;
			ghost.velocity.y = -ghost.speed;
		} else if (direction === 'down') {
			ghost.velocity.x = 0;
			ghost.velocity.y = ghost.speed;
		} else if (direction === 'right') {
			ghost.velocity.x = ghost.speed;
			ghost.velocity.y = 0;
		} else if (direction === 'left') {
			ghost.velocity.x = -ghost.speed;
			ghost.velocity.y = 0;
		}
	}
}
