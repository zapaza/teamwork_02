import { IGameAssets, IPowerUp, IVariables } from './types';

/**
 * Класс PowerUpManager управляет силами (Power-Ups) в игре Pacman.
 */
export default class PowerUpManager {
	/**
	 * Проверяет, съел ли игрок силу. Если сила была съедена,
	 * вызываются соответствующие методы для изменения игровых параметров и состояний привидений.
	 * @param powerUp Объект силы, который проверяется на съедение.
	 * @param assets Игровые ресурсы.
	 * @param variables Объект с переменными и состояниями игры.
	 */
	static eatPowerUp(powerUp: IPowerUp, assets: IGameAssets, variables: IVariables) {
		if (
			powerUp.position.x === assets.characters.pacman.position.x &&
			powerUp.position.y === assets.characters.pacman.position.y
		) {
			powerUp.changeEatenState();
			variables.score += 50;
			variables.killCount = 0;
			this.scareGhosts(assets);
		}
	}

	/**
	 * Испугать привидений. Метод меняет состояния привидений на "испуганное",
	 * чтобы они начали убегать от игрока. При этом таймеры игровых циклов
	 * и состояний привидений синхронизируются.
	 * @param assets Игровые ресурсы.
	 */

	static scareGhosts(assets: IGameAssets) {
		if (assets.timers.cycleTimer.isRunning) {
			assets.timers.cycleTimer.pause();
		}
		assets.timers.scaredTimer.reset();
		Object.values(assets.characters.ghosts).forEach(ghost => {
			if (!ghost.isScared && !ghost.isRetreating) {
				ghost.changeScaredState();
			}
		});
		assets.timers.scaredTimer.start(assets.timers.cycleTimer);
	}
}
