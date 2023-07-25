import './leaderboard-page.pcss'
import '../../styles/helpers.pcss'
import LeaderboardAndProfileField from '../../components/ui/leaderboardAndProfileField'

function LeaderBoardPage() {
  return (
    <div className="leaderboard__container flex flex-column flex-ai-center">
      <h5 className="leaderboard__header text-xl-font-bold">Список Лидеров</h5>
      <LeaderboardAndProfileField
        positionNumber="1"
        userName="Пользователь"
        userScore={99999}
      />
      <LeaderboardAndProfileField
        positionNumber="2"
        userName="Пользователь2"
        userScore={99998}
        isCurrentUser={true}
      />
    </div>
  )
}

export default LeaderBoardPage
