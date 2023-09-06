import React, { LegacyRef, MouseEvent, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { playGame } from '@/core/game/game';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { toggleFullscreen } from '@/utils/Fullscreen';
import './gameState.pcss';
import { Button } from '@/components/ui/button/button';
import { GameFactory } from '@/core/game/gameFactory';
import { IVariables } from '@/core/game/types';
import { GameHooks } from '@/core/game/gameHooks';
import { map, variables } from '@/core/game/dictionary';

export type GameCanvasProps = {
	isLoading?: boolean;
	isFullscreen?: boolean;
};

export const GameCanvas: React.FC<GameCanvasProps> = (props: GameCanvasProps) => {
	const { id, login } = useSelector((state: RootState) => state.auth);

	useEffect(() => {
		const assets = GameFactory.makeAssets(map, variables);

		playGame({ id: id, login: login }, variables, assets);

		return function cleanup() {
			GameHooks.endGame(variables, assets);
		};
	}, []);

	const handleDirection = (direction: string) => {
		const arrow = new KeyboardEvent('keydown', { key: direction });
		window.dispatchEvent(arrow);
	};
	const modifyClassFS = (className: string, isFS: boolean | undefined, saveOriginal = false) =>
		`${className}${isFS ? '_fullscreen' : ''} ${saveOriginal && isFS ? className : ''}`;

	const gameElement: React.MutableRefObject<HTMLElement | undefined> = useRef();
	const handler = () => {
		toggleFullscreen(gameElement?.current);
	};
	const { t } = useTranslation();

	const handleClick = (e: MouseEvent) => {
		if (e.target) {
			togglePointerLock(e.target as HTMLElement);
		}
	};

	const togglePointerLock = (element: HTMLElement) => {
		if (document.pointerLockElement !== element) {
			element.requestPointerLock();
		} else {
			document.exitPointerLock();
		}
	};

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
					height="992"
					onClick={handleClick}></canvas>
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
			<Button
				onClick={handler}
				className={modifyClassFS('button', props.isFullscreen, true)}
				name={'fullscreen'}>
				{props.isFullscreen ? t('exit_fullscreen') : t('fullscreen')}
			</Button>
		</div>
	);
};
