import { Button } from '@/components/ui/button/button';
import React from 'react';
import { LoadingSpinner } from '@/components/ui/loader-spinner/loadingSpinner';
import './startGameState.pcss';
import { useTranslation } from 'react-i18next';

export type EndGameStateProps = {
	callback: () => void;
	isLoading: boolean;
};
export const StartGameState = (props: EndGameStateProps) => {
	const { t } = useTranslation();

	return (
		<div className={'wrapper'}>
			<div className="start-game-state flex flex-jc-center flex-ai-center">
				{props.isLoading ? (
					<LoadingSpinner/>
				) : (
					<Button name="play" onClick={props.callback}>
						{t('start_game')}
					</Button>
				)}
			</div>
		</div>
	);
};
