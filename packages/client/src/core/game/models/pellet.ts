import { ICoordinates, IPellet } from '../types';

/**
 * Класс `Pellet` представляет объект точки (пеллеты) на игровом поле.
 */
export class Pellet implements IPellet {
	position: ICoordinates;
	radius: number;
	hasBeenEaten: boolean;
	constructor({ position }: { position: ICoordinates }, tileLength: number) {
		this.position = position;
		this.radius = tileLength / 10;
		this.hasBeenEaten = false;
	}
	/**
	 * Изменяет состояние точки на "съедена" или "не съедена".
	 * @param ctx Контекст рисования холста.
	 */
	changeEatenState() {
		this.hasBeenEaten = !this.hasBeenEaten;
	}

	/**
	 * Рисует точку на холсте.
	 * @param ctx Контекст рисования холста.
	 */
	draw(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
		ctx.fillStyle = 'white';
		ctx.fill();
		ctx.closePath();
	}
}
