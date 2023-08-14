import './game-page.pcss'
import store, { RootState } from '../../store'
import React from 'react'
import { useSelector } from 'react-redux'
import { useIsFullscreen } from '../../utils/Fullscreen'
import GameCanvas from '../../components/game/gameState/gameState'
import { gameSlice } from '../../store/game/gameSlice'
import EndGameState from '../../components/game/endGameState/endGameState'
import StartGameState from '../../components/game/startGameState/startGameState'

function GamePage() {
  const isFullscreenA = useIsFullscreen()

  const onClick = () => {
    store.dispatch(gameSlice.actions.loading())
  }

  const state = useSelector((state: RootState) => state.game)

  return (
    <main className="game-page flex flex-jc-center flex-ai-center">
      <div className="game-page__container">
        {(state.isStart || state.isLoading) && (
          <StartGameState callback={onClick} isLoading={state.isLoading} />
        )}
        {(state.isLoading || state.isPlay || state.isPause) && (
          <GameCanvas
            isFullscreen={isFullscreenA}
            isLoading={state.isLoading}
          />
        )}
        {state.isEnd && <EndGameState retryCallback={onClick} />}
      </div>
    </main>
  )
}

export default GamePage
