import { playGame } from '@/core/game/game';
import { Graphics } from '@/core/game/graphics';
import { IBoundary, IGameAssets, IVariables } from '@/core/game/types';

/**
 * Класс `Animator` предоставляет функции для анимации игровых элементов и отрисовки графики.
 */
export class Animator {
	/**
	 * Отображает паузу в игре.
	 * @param ctx Контекст канваса для отрисовки паузы.
	 * @param pauseTextImage Изображение текста паузы.
	 */
	static loadPauseOverlay(ctx: CanvasRenderingContext2D, pauseTextImage: HTMLImageElement) {
		this.loadTint(ctx);
		this.loadPauseText(ctx, pauseTextImage);
	}

	/**
	 * Загружает тень для паузы.
	 * @param ctx Контекст канваса для отрисовки тени.
	 */
	static loadTint(ctx: CanvasRenderingContext2D) {
		ctx.globalAlpha = 0.7;
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, 896, 992);
	}

	/**
	 * Загружает текст паузы.
	 * @param ctx Контекст канваса для отрисовки текста паузы.
	 * @param pauseTextImage Изображение текста паузы.
	 */
	static loadPauseText(ctx: CanvasRenderingContext2D, pauseTextImage: HTMLImageElement) {
		ctx.globalAlpha = 1;
		ctx.drawImage(pauseTextImage, 98, 394, 700, 140);
	}

	/**
	 * Возобновляет анимацию игры после паузы.
	 * @param variables Объект с переменными и состояниями игры.
	 * @param ctx Контекст канваса для отрисовки игровых элементов.
	 * @param assets Ресурсы игры (карты, персонажи, таймеры, звуки и т. д.).
	 */
	static resumeAnimation(
		variables: IVariables,
		ctx: CanvasRenderingContext2D,
		assets: IGameAssets,
	) {
		if (assets.characters.pacman.isShrinking) {
			Graphics.runDeathAnimation(variables, ctx, assets);
		} else if (assets.characters.pacman.isLevellingUp) {
			Graphics.runLevelUpAnimation(variables, assets, ctx);
		} else {
			playGame(variables.player, variables, assets);
		}
	}

	/**
	 * Отображает текстовую надпись "Level Up!".
	 * @param ctx Контекст канваса для отрисовки текста.
	 * @param boundaries Массив границ игрового поля.
	 */
	static drawLevelUpBoard(ctx: CanvasRenderingContext2D, boundaries: IBoundary[]) {
		ctx.clearRect(0, 0, 896, 992);
		boundaries.forEach(boundary => boundary.draw(ctx));
		ctx.font = '40px Inter';
		ctx.fillStyle = 'yellow';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText('Level Up!', 448, 560);
	}

	/**
	 * Очищает канвас и отрисовывает элементы игрового поля (границы, пеллеты, усилители).
	 * @param ctx Контекст канваса для отрисовки игровых элементов.
	 * @param assets Ресурсы игры (карты, персонажи, таймеры, звуки и т. д.).
	 */
	static drawBoard(ctx: CanvasRenderingContext2D, assets: IGameAssets) {
		ctx.clearRect(0, 0, 896, 992);
		assets.props.boundaries.forEach(boundary => boundary.draw(ctx));
		assets.props.pellets.forEach(pellet => {
			if (!pellet.hasBeenEaten) {
				pellet.draw(ctx);
			}
		});
		assets.props.powerUps.forEach(powerUp => {
			if (!powerUp.hasBeenEaten) {
				powerUp.update(ctx);
			}
		});
	}

	/**
	 * Отображает сообщение "Please wait...".
	 * этот метод пока не используется, его нужно будет использовать при загрузке игры
	 * или при отправки результатов в лидборд
	 * @param ctx Контекст канваса для отрисовки сообщения.
	 */
	static displayPleaseWait(ctx: CanvasRenderingContext2D) {
		this.loadTint(ctx);
		ctx.globalAlpha = 1;
		ctx.font = '100px Inter';
		ctx.fillStyle = 'white';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText('Please wait...', 448, 496);
	}

	/**
	 * Отображает сообщение "GAME OVER".
	 * @param ctx Контекст канваса для отрисовки сообщения.
	 */
	static displayGameOver(ctx: CanvasRenderingContext2D) {
		this.loadTint(ctx);
		ctx.globalAlpha = 1;
		ctx.font = '100px Inter';
		ctx.fillStyle = 'white';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText('GAME OVER', 448, 496);
	}
}
