import './leaderboard-page.css'
import '../../styles/helpers.css'

function LeaderBoardPage() {
  return (
    <div className="leaderboard__container flex flex-column flex-ai-center">
      <h5 className="leaderboard__header text-xl-font-bold">Список Лидеров</h5>
      <BaseLeaderboardInput />
    </div>
  )
}

export function BaseLeaderboardInput() {
  return (
    <div className="leaderboard-input__container flex flex-ai-center flex-jc-center">
      <span className="position-number text-base-font-regular">1.</span>
      <span className="user-name text-base-font-regular">Пользователь</span>
      <span className="user-score text-base-font-regular">99999</span>
    </div>
  )
}

export default LeaderBoardPage
