import { IBoundary, ICoordinates, IPacman, IVariables, IWithPosition } from './types';

/**
 * Класс `BoundaryManager` предоставляет функции для управления границами
 * (перепрыгивание, остановка персонажа при столкновении и т. д.).
 */
export default class BoundaryManager {
	/**
	 * Проверяет, сталкивается ли персонаж с границей на следующем шаге движения.
	 * @param character Объект персонажа (например, Pacman или призрак).
	 * @param boundary Объект границы, с которой проверяется столкновение.
	 * @param velocity Объект с текущей скоростью движения персонажа по осям x и y.
	 * @returns `true`, если происходит столкновение, и `false` в противном случае.
	 */
	static hitBoundaryConditional(
		character: IWithPosition,
		boundary: IBoundary,
		{ velocity }: { velocity: ICoordinates },
	) {
		const padding = boundary.width / 2 - character.radius - 1;
		return (
			character.position.y - character.radius + velocity.y <=
				boundary.position.y + boundary.height + padding &&
			character.position.y + character.radius + velocity.y >= boundary.position.y - padding &&
			character.position.x + character.radius + velocity.x >= boundary.position.x - padding &&
			character.position.x - character.radius + velocity.x <=
				boundary.position.x + boundary.width + padding
		);
	}

	/**
	 * Реализует перепрыгивание персонажа через туннели.
	 * @param character Объект персонажа (например, Pacman или призрак).
	 * @param variables Объект с переменными и состояниями игры.
	 */
	static implementTunnel(character: IWithPosition, variables: IVariables) {
		if (character.position.x === (variables.tileLength * 57) / 2) {
			character.position.x = -variables.tileLength / 2;
		} else if (character.position.x === -variables.tileLength / 2) {
			character.position.x = (variables.tileLength * 57) / 2;
		}
	}

	/**
	 * Останавливает движение персонажа при столкновении с границей.
	 * @param boundary Объект границы, с которой проверяется столкновение.
	 * @param pacman Объект класса Pacman, персонаж, чье движение проверяется на столкновение.
	 */
	static stopPacmanCollision(boundary: IBoundary, pacman: IPacman) {
		if (
			this.hitBoundaryConditional(pacman, boundary, {
				velocity: {
					x: pacman.velocity.x,
					y: pacman.velocity.y,
				},
			})
		) {
			pacman.velocity.x = 0;
			pacman.velocity.y = 0;
		}
	}
}
