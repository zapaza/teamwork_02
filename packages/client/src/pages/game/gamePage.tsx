import React, { LegacyRef, useEffect, useRef } from 'react';
import {store,  RootState } from '@/store';
import { useSelector } from 'react-redux';
import { useIsFullscreen } from '@/utils/Fullscreen';
import { GameCanvas } from '@/components/game/gameState/gameState';
import { gameSlice } from '@/store/game/gameSlice';
import { EndGameState } from '@/components/game/endGameState/endGameState';
import { StartGameState } from '@/components/game/startGameState/startGameState';
import { GameStatus } from '@/store/game/gameStatus';
import './game-page.pcss';
import Gamepad from '@/utils/gamepad';

export const GamePage = () => {
	const isFullscreenA = useIsFullscreen();
	const gamepad = new Gamepad();

	const onClick = () => {
		store.dispatch(gameSlice.actions.setStatus(GameStatus.LOADING));
	};

	const state = useSelector((state: RootState) => state.game.status);
	useEffect(() => {
		gamepad.init();

		return () => gamepad.stop();
	});
	const gameElement: React.MutableRefObject<HTMLElement | undefined> = useRef();

	return (
		<main className="game-page flex flex-jc-center flex-ai-center">
			<div className="game-page__container" ref={gameElement as LegacyRef<HTMLDivElement>}>
				{(state === GameStatus.START || state === GameStatus.LOADING) && (
					<StartGameState callback={onClick} isLoading={state === GameStatus.LOADING}/>
				)}
				{(state === GameStatus.LOADING ||
					state === GameStatus.PLAY ||
					state === GameStatus.PAUSE) && (
					<GameCanvas
						isFullscreen={isFullscreenA}
						isLoading={state === GameStatus.LOADING}
						fsElement={gameElement.current}
					/>
				)}
				{state === 'end' && <EndGameState retryCallback={onClick}/>}
			</div>
		</main>
	);
};
