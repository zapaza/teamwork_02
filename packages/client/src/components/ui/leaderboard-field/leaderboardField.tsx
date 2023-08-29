import React from 'react';
import './leaderboard-field.pcss';

export type FieldPropsType = {
	positionNumber: number | string;
	userName: string;
	score: number | string;
	isCurrentUser?: boolean;
};

export const LeaderboardField = ({
	positionNumber,
	userName,
	score,
	isCurrentUser,
}: FieldPropsType) => {
	return (
		<div
			className="leaderboard-input__container flex flex-ai-center flex-jc-center"
			key={positionNumber}>
			<span className="position-number text-base-font-regular">{`${positionNumber}.`}</span>
			<span
				className={
					isCurrentUser
						? 'user-name user-name_accent text-base-font-regular'
						: 'user-name text-base-font-regular'
				}>
				{isCurrentUser ? 'Ты' : userName}
			</span>
			<span className="user-score text-base-font-regular">{score}</span>
		</div>
	);
};
