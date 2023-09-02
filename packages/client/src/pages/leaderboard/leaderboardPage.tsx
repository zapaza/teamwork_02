import { AppDispatch, RootState } from '@/store';
import './leaderboard-page.pcss';
import { LeaderboardField } from '@/components/ui/leaderboard-field/leaderboardField';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingSpinner } from '@/components/ui/loader-spinner/loadingSpinner';
import { fetchLeaders } from '@/store/leaderboard/leaderboardThunk';

export const LeaderboardPage = () => {
	const leaders = useSelector((state: RootState) => state.leaderboard);
	const user = useSelector((state: RootState) => state.auth);
	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		async function fetchBoard() {
			await dispatch(fetchLeaders());
		}

		fetchBoard();
	}, []);

	if (leaders.isDataLoaded) {
		return (
			<div className="leaderboard__container flex flex-column flex-ai-center">
				<h5 className="leaderboard__header text-xl-font-bold">Список Лидеров</h5>
				{leaders.data.map((item, index) => (
					<LeaderboardField
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
		return (
			<div>
				<LoadingSpinner/>
			</div>
		);
	}
};
