import { RootState } from '@/store';
import './leaderboard-page.pcss';
import { LeaderboardAndProfileField } from '@/components/ui/leaderboard-and-profile-field/leaderboardAndProfileField';
import { fetchLeaders } from '@/store/leaderboard/leaderboard-slice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const LeaderboardPage = () => {
	const leaders = useSelector((state: RootState) => state.leaderboard);
	const user = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchLeaders() as any);
	}, []);

	if (leaders.isDataLoaded) {
		return (
			<div className="leaderboard__container flex flex-column flex-ai-center">
				<h5 className="leaderboard__header text-xl-font-bold">Список Лидеров</h5>
				{leaders.data.map((item, index) => (
					<LeaderboardAndProfileField
						key={index}
						isCurrentUser={item.data.userName === user.login || false}
						positionNumber={index + 1}
						score={item.data.score}
						userName={item.data.userName}
					/>
				))}
			</div>
		);
	} else {
		return <div>Загружаем данные...</div>;
	}
};
