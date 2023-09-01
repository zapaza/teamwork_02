import { gameSlice } from '@/store/game/gameSlice';
import { GameStatus } from '@/store/game/gameStatus';
import store from '@/store';
import { Timer } from '@/core/game/timer';

export enum keyboardEventsName {
	'UP' = 'ArrowUp',
	'DOWN' = 'ArrowDown',
	'LEFT' = 'ArrowLeft',
	'RIGHT' = 'ArrowRight',
	'ESCAPE' = 'Escape',
}
export const gamepadMap = [
	{ index: 12, event: keyboardEventsName.UP },
	{ index: 14, event: keyboardEventsName.LEFT },
	{ index: 15, event: keyboardEventsName.RIGHT },
	{ index: 13, event: keyboardEventsName.DOWN },
	{ index: 9, event: keyboardEventsName.ESCAPE },
];

export class Gamepad {
	private interval?: Timer;

	init() {
		this.stop();
		window.addEventListener('gamepadconnected', this.handleGamepadEvents);
		window.addEventListener('gamepaddisconnected', this.dispatchGamePause);
	}

	private dispatchGamePause() {
		console.log('Waiting for gamepad.');
		store.dispatch(gameSlice.actions.setStatus(GameStatus.PAUSE));
	}

	private handleGamepadEvents = () => {
		this.clearInterval();
		this.interval = window.setInterval(this.pollGamepads, 100);
	};

	private pollGamepads = () => {
		const gamepads = navigator.getGamepads();
		if (gamepads.length > 1) {
			console.log('Use first activated gamepad for play');
		}
		if (gamepads[0]) {
			const buttons = gamepads[0].buttons;
			const leftStick = gamepads[0].axes.slice(0, 2);
			const rightStick = gamepads[0].axes.slice(-2);
			const buttonPressedIndex = buttons.findIndex(button => button.pressed);

			this.mapButtons(buttonPressedIndex);
			this.mapStick(leftStick);
		} else {
			console.log('No gamepads connected.');
			this.clearInterval();
		}
	};

	private mapButtons = (button: number) => {
		gamepadMap.forEach(item => {
			if (item.index === button) {
				this.dispatchKeyboardEvent(item.event);
			}
		});
	};
	private mapStick = (stick: Array<number>) => {
		let key;
		const sensitivity = 0.4;
		const normalizedStick = stick.map(axes => {
			if (Math.abs(axes) < sensitivity) {
				return 0;
			}

			return axes;
		});

		const x = normalizedStick[0];
		const y = normalizedStick[1];

		if (x > 0) {
			key = keyboardEventsName.RIGHT;
		}
		if (x < 0) {
			key = keyboardEventsName.LEFT;
		}
		if (y > 0) {
			key = keyboardEventsName.DOWN;
		}
		if (y < 0) {
			key = keyboardEventsName.UP;
		}

		if (key) {
			this.dispatchKeyboardEvent(key);
		}
	};
	private dispatchKeyboardEvent = (event: string) => {
		const ketDownEvent = new KeyboardEvent('keydown', {
			code: event,
			key: event,
			view: window,
		});
		window.dispatchEvent(ketDownEvent);
	};

	stop = () => {
		window.removeEventListener('gamepadconnected', this.handleGamepadEvents);
		window.removeEventListener('gamepaddisconnected', this.dispatchGamePause);
		//Не очищаю интервал, тк событие gamepadConnected вызывается только при первом нажатии на кнопку на геймпаде
		//или при подключении геймпада к пк. Что бы геймпад заработал, приходится перезагружать страницу
	};

	private clearInterval = () => {
		if (this.interval) {
			window.clearInterval(this.interval as number);
		}
	};
}

export default Gamepad;
