import React from 'react'
import './leaderboardAndProfileField.pcss'

export type FieldPropsType = {
  positionNumber: number | string
  userName: string
  userScore: number | string
  isCurrentUser?: boolean
}

function LeaderboardAndProfileField({
  positionNumber,
  userName,
  userScore,
  isCurrentUser,
}: FieldPropsType) {
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
      <span className="user-score text-base-font-regular">{userScore}</span>
    </div>
  )
}

export default LeaderboardAndProfileField
