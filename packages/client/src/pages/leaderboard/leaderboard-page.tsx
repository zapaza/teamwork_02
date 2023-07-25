import './leaderboard-page.pcss'
import '../../styles/helpers.pcss'
import LeaderboardAndProfileField from '../../components/ui/leaderboardAndProfileField/leaderboardAndProfileField'

function LeaderBoardPage() {
  return (
    <div className="leaderboard__container flex flex-column flex-ai-center">
      <h5 className="leaderboard__header text-xl-font-bold">Список Лидеров</h5>
      <LeaderboardAndProfileField />
    </div>
  )
}

export default LeaderBoardPage
