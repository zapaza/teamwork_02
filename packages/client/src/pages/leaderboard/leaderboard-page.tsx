import './leaderboard-page.pcss';
import '../../styles/helpers.pcss';
import LeaderboardAndProfileField from '../../components/ui/leaderboard-and-profile-field';
import React from 'react';

const leaderboardMock = [
	{ positionNumber: 1, userName: 'Виктор', userScore: 99999 },
	{ positionNumber: 2, userName: 'Виктор', userScore: 99998 },
	{ positionNumber: 3, userName: 'Виктор', userScore: 99997 },
	{ positionNumber: 4, userName: 'Виктор', userScore: 99996 },
	{ positionNumber: 5, userName: 'Иван', userScore: 99995 },
	{ positionNumber: 6, userName: 'Виктор', userScore: 99994 },
	{ positionNumber: 7, userName: 'Кирилл', userScore: 99993 },
	{ positionNumber: 8, userName: 'Виктор', userScore: 99992 },
	{ positionNumber: 9, userName: 'Виктор', userScore: 99991 },
	{ positionNumber: 10, userName: 'Виктор', userScore: 99990 },
	{
		positionNumber: 183,
		userName: 'Пользователь',
		userScore: 97,
		isCurrentUser: true,
	},
];

function LeaderBoardPage() {
	return (
		<div className="leaderboard__container flex flex-column flex-ai-center">
			<h5 className="leaderboard__header text-xl-font-bold">Список Лидеров</h5>
			{leaderboardMock.map(item => (
				<LeaderboardAndProfileField
					key={item.positionNumber}
					isCurrentUser={item.isCurrentUser || false}
					{...item}
				/>
			))}
		</div>
	);
}

export default LeaderBoardPage;
