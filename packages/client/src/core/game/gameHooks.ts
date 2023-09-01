import { EventListener } from '@/core/game/eventListeners';
import { Physics } from '@/core/game/physics';
import { Graphics } from '@/core/game/graphics';
import { IGameAssets, IPacman, IVariables } from '@/core/game/types';
import { playGame } from '@/core/game/game';
import { Animator } from '@/core/game/animations';
import store from '@/store';
import { gameSlice } from '@/store/game/gameSlice';
import { AudioManager } from './audioManager';
import { GameStatus } from '@/store/game/gameStatus';
import { ApiLeaderboard, LeaderDataType } from '../api/api-leaderboard';

/**
 * Класс `GameHooks` представляет игровую логику и управление игрой.
 */
export class GameHooks {
	/**
	 * Завершает настройку игры после загрузки ресурсов.
	 * @param variables Объект с переменными игры.
	 * @param player Объект игрока.
	 * @param assets Ресурсы игры (карты, персонажи, таймеры, звуки и т. д.).
	 * @param ctx Контекст холста для отрисовки игровой информации.
	 */
	static finishSetup(
		variables: IVariables,
		player: any,
		assets: IGameAssets,
		ctx: CanvasRenderingContext2D,
	) {
		variables.player = player;
		assets.timers.cycleTimer.start();
		EventListener.addDirectionDetection(variables);
		EventListener.addVisibilityDetection(variables, assets);
		EventListener.addPauseDetection(variables, assets, ctx);
		variables.start = false;
		assets.audioPlayer.ghostAudioWantsToPlay = true;
		variables.startTime = performance.now();
		store.dispatch(gameSlice.actions.setStatus(GameStatus.PLAY));
	}

	/**
	 * Применяет физику игры (взаимодействие с объектами).
	 * @param assets Ресурсы игры (карты, персонажи, таймеры, звуки и т. д.).
	 * @param ctx Контекст холста для отрисовки игровой информации.
	 * @param variables Объект с переменными игры.
	 */
	static implementPhysics(
		assets: IGameAssets,
		ctx: CanvasRenderingContext2D,
		variables: IVariables,
	) {
		Physics.handleBoundariesAndCollisionsWithPacman(assets, ctx);
		Physics.handlePelletsAndLevelUpCondition(assets, ctx, variables);
		Physics.handlePowerUpsAndEating(assets, ctx, variables);
		Physics.handleGhostsAndCollisionsWithPacman(assets, ctx, variables);
		Physics.handlePacmanMovementAndEating(variables, assets, ctx);
	}

	/**
	 * Применяет графику игры (отрисовка игровой информации).
	 * @param variables Объект с переменными игры.
	 * @param pacman Объект PacMan.
	 */
	static implementGraphics(variables: IVariables, pacman: IPacman) {
		const info = document.querySelector<HTMLCanvasElement>('#info');
		const ctx = info!.getContext('2d');
		if (ctx) {
			ctx.clearRect(0, 0, info!.width, info!.height);
			ctx.font = '16px Inter';
			ctx.textBaseline = 'middle';

			Graphics.displayScore(ctx, variables);
			Graphics.displayLevel(ctx, variables);
			Graphics.displayLives(ctx, pacman);
		}
	}

	/**
	 * Проверяет количество жизней Pacman после столкновения с призраком.
	 * Если у Pacman остались жизни, происходит сброс после смерти.
	 * В противном случае игра завершается.
	 * @param assets Объект с ресурсами игры (звуки, изображения и т. д.).
	 * @param variables Объект с переменными и состояниями игры.
	 * @param ctx Контекст холста для отрисовки игровых объектов.
	 */
	static checkPacmanLives(
		assets: IGameAssets,
		variables: IVariables,
		ctx: CanvasRenderingContext2D,
	) {
		if (assets.characters.pacman.lives <= 0) {
			this.endGame(variables, assets, ctx);
		} else {
			assets.characters.pacman.lives--;
			this.resetAfterDeath(assets, variables);
		}
	}

	/**
	 * Завершает игру после смерти Pacman (когда у Pacman заканчиваются жизни).
	 * Сохраняет результаты игры в лидерборд (если игра была совершена зарегистрированным пользователем)
	 * и сбрасывает состояние игры для начала новой игры.
	 * @param variables Объект с переменными и состояниями игры.
	 * @param assets Объект с ресурсами игры (звуки, изображения и т. д.).
	 * @param ctx Контекст холста для отрисовки игровых объектов.
	 * завершения игры (по умолчанию `GhostCollision.resetAfterGameOver`).
	 */
	static async endGame(
		variables: IVariables,
		assets: IGameAssets,
		ctx: CanvasRenderingContext2D,
	) {
		cancelAnimationFrame(variables.animationId as number);
		assets.audioPlayer.pauseAll();
		assets.audioPlayer.ghostAudioWantsToPlay = false;
		if (variables.player) {
			await this.saveScore(variables);
			//   // todo после запроса добавить переход на страницу лидборда
		}
		store.dispatch(gameSlice.actions.setStatus(GameStatus.END));
		this.resetAfterGameOver(assets, variables);
		EventListener.removeAllGameEventsListeners(variables);
		Animator.displayGameOver(ctx);
	}

	/**
	 * Сохраняет результаты игры в лидерборд.
	 * @param variables Объект с переменными и состояниями игры.
	 * @param getBackendUrl Функция для получения URL бэкенда (по умолчанию `GhostCollision.getBackendUrl`).
	 * @returns Промис с результатом сохранения результатов игры (успешно или с ошибкой).
	 */
	static async saveScore(variables: IVariables) {
		if (variables.player) {
			const scoreData: LeaderDataType = {
				data: { userName: variables.player.login, score: variables.score },
				ratingFieldName: 'score',
				teamName: 'GOLOVOLOMKA',
			};
			try {
				await ApiLeaderboard.updateScore(scoreData);
			} catch (error) {
				console.error('Failed to send score:', error);
			}
		}
	}

	/**
	 * Сбрасывает состояние игры после завершения игры (когда у Pacman заканчиваются жизни).
	 * Подготавливает игру для начала новой игры.
	 * @param assets Объект с ресурсами игры (звуки, изображения и т. д.).
	 * @param variables Объект с переменными и состояниями игры.
	 */
	static resetAfterGameOver(assets: IGameAssets, variables: IVariables) {
		assets.props.pellets.forEach(pellet => {
			if (pellet.hasBeenEaten) {
				pellet.changeEatenState();
			}
		});
		assets.props.powerUps.forEach(powerUp => {
			if (powerUp.hasBeenEaten) {
				powerUp.changeEatenState();
			}
		});
		assets.timers.cycleTimer.reset();
		assets.timers.scaredTimer.reset();
		assets.timers.scaredTimer.duration = 7000;
		Object.values(assets.characters.ghosts).forEach(ghost => {
			ghost.reset();
		});
		assets.characters.pacman.reset();
		assets.characters.pacman.lives = 2;
		variables.lastKeyPressed = '';
		variables.level = 1;
		variables.score = 0;
		variables.start = true;
	}

	/**
	 * Сбрасывает состояние игры после смерти Pacman (когда Pacman сталкивается с призраком).
	 * Подготавливает игру для продолжения после смерти Pacman.
	 * @param assets Объект с ресурсами игры (звуки, изображения и т. д.).
	 * @param variables Объект с переменными и состояниями игры.
	 */
	static resetAfterDeath(assets: IGameAssets, variables: IVariables) {
		assets.characters.pacman.reset();
		variables.lastKeyPressed = '';
		assets.timers.cycleTimer.reset();
		assets.timers.scaredTimer.reset();
		Object.values(assets.characters.ghosts).forEach(ghost => {
			ghost.reset();
		});
		assets.timers.cycleTimer.start();
		assets.audioPlayer.ghostAudioWantsToPlay = true;
		playGame(variables.player);
	}

	static manageGhostAudio(assets: IGameAssets) {
		if (assets.audioPlayer.ghostAudioWantsToPlay) AudioManager.playGhostAudio(assets);
	}
}
