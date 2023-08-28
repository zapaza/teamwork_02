import React, { LegacyRef, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { playGame } from '@/core/game/game';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { toggleFullscreen } from '@/utils/Fullscreen';
import './gameState.pcss';
import { GameFactory } from '@/core/game/gameFactory';
import { IVariables } from '@/core/game/types';
import { GameHooks } from '@/core/game/gameHooks';

export type GameCanvasProps = {
	isLoading?: boolean;
	isFullscreen?: boolean;
};

export const GameCanvas: React.FC<GameCanvasProps> = (props: GameCanvasProps) => {
	const { id, login } = useSelector((state: RootState) => state.auth);

	const variables: IVariables = {
		tileLength: 32,
		isWindowVisible: true,
		isGamePaused: false,
		score: 0,
		lastKeyPressed: '',
		level: 1,
		player: undefined, // todo:продумать что будем тут хранить всего юзера или только часть данных
		killCount: 0,
		start: true,
		animationId: null,
		directionEventListener: null,
		visibilityEventListener: null,
		pauseEventListener: null,
		levelUpCount: 0,
		frameLifetime: 10,
		startTime: 0,
	};

	const map = [
		'1------------21------------2',
		'|............||............|',
		'|.1--2.1---2.||.1---2.1--2.|',
		'|o|  |.|   |.||.|   |.|  |o|',
		'|.4--3.4---3.43.4---3.4--3.|',
		'|..........................|',
		'|.1--2.12.1------2.12.1--2.|',
		'|.4--3.||.4--21--3.||.4--3.|',
		'|......||....||....||......|',
		'4----2.|4--2 || 1--3|.1----3',
		'     |.|1--3 43 4--2|.|     ',
		'     |.||          ||.|     ',
		'     |.|| 1------2 ||.|     ',
		'-----3.43 |      | 43.4-----',
		'      .   |      |   .      ',
		'-----2.12 |      | 12.1-----',
		'     |.|| 4------3 ||.|     ',
		'     |.||          ||.|     ',
		'     |.|| 1------2 ||.|     ',
		'1----3.43 4--21--3 43.4----2',
		'|............||............|',
		'|.1--2.1---2.||.1---2.1--2.|',
		'|.4-2|.4---3.43.4---3.|1-3.|',
		'|o..||.......  .......||..o|',
		'4-2.||.12.1------2.12.||.1-3',
		'1-3.43.||.4--21--3.||.43.4-2',
		'|......||....||....||......|',
		'|.1----34--2.||.1--34----2.|',
		'|.4--------3.43.4--------3.|',
		'|..........................|',
		'4--------------------------3',
	];

	useEffect(() => {
		const assets = GameFactory.makeAssets(map, variables);

		playGame({ id: id, login: login }, variables, assets);

		return function cleanup() {
			GameHooks.endGame();
		};
	}, []);

	const handleDirection = (direction: string) => {
		const arrow = new KeyboardEvent('keydown', { key: direction });
		window.dispatchEvent(arrow);
	};
	const modifyClassFS = (className: string, isFS: boolean | undefined) =>
		`${className}${isFS ? '_fullscreen' : ''}`;

	const gameElement: React.MutableRefObject<HTMLElement | undefined> = useRef();
	const handler = () => {
		toggleFullscreen(gameElement?.current);
	};
	const { t } = useTranslation();

	return (
		<div
			ref={gameElement as LegacyRef<HTMLDivElement>}
			className={props.isLoading ? 'hide' : 'wrapper'}>
			<div className={modifyClassFS('game', props.isFullscreen)}>
				<canvas
					id="info"
					className={modifyClassFS('game__info', props.isFullscreen)}
					data-testid="info"
					width="600"
					height="30"></canvas>
				<canvas
					id="board"
					className={modifyClassFS('game__board', props.isFullscreen)}
					data-testid="board"
					width="896"
					height="992"></canvas>
			</div>
			<br></br>
			<div className="mobile-controls">
				<img
					src="./images/dpad.png"
					alt="dpad"
					useMap="#dpad"
					height="200px"
					width="200px"
					data-testid="dpad"></img>
				<map name="dpad" data-testid="dpad-map">
					<area
						className="up"
						data-testid="up"
						shape="rect"
						coords="66,0,133,66"
						alt="up"
						onClick={() => handleDirection('ArrowUp')}></area>
					<area
						className="left"
						data-testid="left"
						shape="rect"
						coords="0,66,66,133"
						alt="left"
						onClick={() => handleDirection('ArrowLeft')}></area>
					<area
						className="right"
						data-testid="right"
						shape="rect"
						coords="133,66,200,133"
						alt="right"
						onClick={() => handleDirection('ArrowRight')}></area>
					<area
						className="down"
						data-testid="down"
						shape="rect"
						coords="66,133,133,200"
						alt="down"
						onClick={() => handleDirection('ArrowDown')}></area>
				</map>
			</div>
			<button onClick={handler} className={'fullscreen-button'}>
				{props.isFullscreen ? t('exit_fullscreen') : t('fullscreen')}
			</button>
		</div>
	);
};
