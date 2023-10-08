import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button/button';

export type EndGameStateProps = {
	retryCallback: () => void;
};
export const EndGameState = (props: EndGameStateProps) => {
	const navigate = useNavigate();

	function goToLeaderBoard() {
		navigate('/leaderboard');
	}
	const { t } = useTranslation();

	return (
		<div className="end-game-state wrapper flex flex-column flex-jc-center flex-ai-center gap-16">
			<h1 className="text-3-xl-font-bold">{t('game_over')}</h1>
			<p className=".text-base-font-regular">{t('replay_description')}</p>

			<div className="end-game-state__buttons flex flex-wrap flex-ai-center flex-jc-center gap-16">
				<Button onClick={props.retryCallback} name="retry">
					{t('retry')}
				</Button>
				<Button name="leadBoard" onClick={goToLeaderBoard}>
					{t('leaderboard')}
				</Button>
			</div>
		</div>
	);
};
