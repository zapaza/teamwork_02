import './leaderboardAndProfileField.pcss'

function LeaderboardAndProfileField() {
    return (
      <div className="leaderboard-input__container flex flex-ai-center flex-jc-center">
        <span className="position-number text-base-font-regular">1.</span>
        <span className="user-name text-base-font-regular">Пользователь</span>
        <span className="user-score text-base-font-regular">99999</span>
      </div>
    )
}

export default LeaderboardAndProfileField;
