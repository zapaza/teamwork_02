// import AudioManager from "../audio/audioManager";
import Timer from './timer';
import Animator from './animations';
import { IGameAssets, IVariables } from './types';
import { AudioManager } from './audioManager';
import { gameSlice } from '@/store/game/gameSlice';
import store from '../../store';
import { GameStatus } from '@/store/game/gameStatus';

/**
 * Класс `EventListener` предоставляет функции для добавления различных слушателей событий.
 */
export default class EventListener {
	/**
	 * Добавляет слушателя событий для определения направления движения.
	 * @param variables Объект с переменными и состояниями игры.
	 */
	static addDirectionDetection(variables: IVariables) {
		window.addEventListener(
			'keydown',
			(variables.directionEventListener = ({ key }: KeyboardEvent) => {
				if (key === 'ArrowUp') {
					variables.lastKeyPressed = 'up';
				} else if (key === 'ArrowLeft') {
					variables.lastKeyPressed = 'left';
				} else if (key === 'ArrowRight') {
					variables.lastKeyPressed = 'right';
				} else if (key === 'ArrowDown') {
					variables.lastKeyPressed = 'down';
				}
			}),
		);
	}

	/**
	 * Добавляет слушателя событий для определения видимости окна браузера.
	 * @param variables Объект с переменными и состояниями игры.
	 * @param assets Ресурсы игры (карты, персонажи, таймеры, звуки и т. д.).
	 */
	static addVisibilityDetection(variables: IVariables, assets: IGameAssets) {
		window.addEventListener(
			'visibilitychange',
			(variables.visibilityEventListener = () => {
				if (!variables.isGamePaused && variables.isWindowVisible) {
					variables.isWindowVisible = false;
					Timer.pauseTimers(assets.timers);
					AudioManager.pauseAudio(assets.audioPlayer);
				} else if (!variables.isGamePaused && !variables.isWindowVisible) {
					variables.isWindowVisible = true;
					Timer.resumeTimers(assets.timers);
					AudioManager.resumeAudio(assets.audioPlayer);
				}
			}),
		);
	}

	/**
	 * Добавляет слушателя событий для определения паузы в игре.
	 * @param variables Объект с переменными и состояниями игры.
	 * @param assets Ресурсы игры (карты, персонажи, таймеры, звуки и т. д.).
	 * @param ctx Контекст канваса для отрисовки паузы.
	 */
	static addPauseDetection(
		variables: IVariables,
		assets: IGameAssets,
		ctx: CanvasRenderingContext2D,
	) {
		window.addEventListener(
			'keydown',
			(variables.pauseEventListener = ({ key }: KeyboardEvent) => {
				if (key === 'Escape') {
					if (!variables.isGamePaused) {
						variables.isGamePaused = true;
						cancelAnimationFrame(variables.animationId as number);
						AudioManager.pauseAudio(assets.audioPlayer);
						Timer.pauseTimers(assets.timers);
						Animator.loadPauseOverlay(ctx, assets.pauseTextImage);
						store.dispatch(gameSlice.actions.setStatus(GameStatus.PAUSE));
					} else {
						variables.isGamePaused = false;
						AudioManager.resumeAudio(assets.audioPlayer);
						Timer.resumeTimers(assets.timers);
						Animator.resumeAnimation(variables, ctx, assets);
						store.dispatch(gameSlice.actions.setStatus(GameStatus.PLAY));
					}
				}
			}),
		);
	}

	static removeAllGameEventsListeners(variables: IVariables) {
		window.removeEventListener(
			'keydown',
			variables.directionEventListener as (event: Event) => void,
		);
		window.removeEventListener(
			'visibilitychange',
			variables.visibilityEventListener as (event: Event) => void,
		);
		window.removeEventListener(
			'keydown',
			variables.pauseEventListener as (event: Event) => void,
		);
	}
}
