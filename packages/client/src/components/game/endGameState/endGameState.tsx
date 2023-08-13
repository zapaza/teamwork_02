import Button from '../../ui/button/button'
import { useNavigate } from 'react-router-dom'
import React from 'react'

export type EndGameStateProps = {
  retryCallback: () => void
}
const EndGameState = (props: EndGameStateProps) => {
  const navigate = useNavigate()

  function goToLeaderBoard() {
    navigate('/leaderboard')
  }

  return (
    <div className="end-game-state wrapper flex flex-column flex-ai-center gap-16">
      <h1 className="text-3-xl-font-bold">Game over</h1>
      <p className=".text-base-font-regular">
        you can replay the game or view the leaderboard
      </p>

      <div className="end-game-state__buttons flex flex-ai-center gap-16">
        <Button
          onClick={props.retryCallback}
          name="retry"
          children={'Retry'}></Button>
        <Button
          name="leadBoard"
          children={'Leader board'}
          onClick={goToLeaderBoard}></Button>
      </div>
    </div>
  )
}
export default EndGameState
