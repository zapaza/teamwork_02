import { IBoundary, IBoundaryParams, ICoordinates } from '@/core/game/types';

/**
 * Класс `Boundary` представляет объект границы в игре.
 */
export class Boundary implements IBoundary {
	position: ICoordinates;
	width: number;
	height: number;
	regularImage: HTMLImageElement;
	whiteImage: HTMLImageElement;
	image: HTMLImageElement;

	constructor({ position, regularImage, whiteImage }: IBoundaryParams, tileLength: number) {
		this.position = position;
		this.width = tileLength;
		this.height = tileLength;
		this.regularImage = regularImage;
		this.whiteImage = whiteImage;
		this.image = regularImage;
	}

	/**
	 * Рисует границу на холсте.
	 * @param ctx Контекст рисования холста.
	 */
	draw(ctx: CanvasRenderingContext2D) {
		ctx.drawImage(this.image, this.position.x, this.position.y);
	}

	/**
	 * Мигает границей, меняя изображение между обычным и мигающим состоянием.
	 */
	flash() {
		const imageSource = this.image.src;
		this.image = imageSource.includes('white') ? this.regularImage : this.whiteImage;
	}
}
