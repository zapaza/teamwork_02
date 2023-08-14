import './game-page.pcss'
import store, { RootState } from '../../store'
import React from 'react'
import { useSelector } from 'react-redux'
import { useIsFullscreen } from '../../utils/Fullscreen'
import GameCanvas from '../../components/game/gameState/gameState'
import { gameSlice } from '../../store/game/gameSlice'
import EndGameState from '../../components/game/endGameState/endGameState'
import StartGameState from '../../components/game/startGameState/startGameState'
import { GameStatus } from '../../store/game/gameStatus'

function GamePage() {
  const isFullscreenA = useIsFullscreen()

  const onClick = () => {
    store.dispatch(gameSlice.actions.setStatus(GameStatus.LOADING))
  }

  const state = useSelector((state: RootState) => state.game.status)

  return (
    <main className="game-page flex flex-jc-center flex-ai-center">
      <div className="game-page__container">
        {(state === GameStatus.START || state === GameStatus.LOADING) && (
          <StartGameState callback={onClick} isLoading={state === GameStatus.LOADING} />
        )}
        {(state === GameStatus.LOADING || state === GameStatus.PLAY || state === GameStatus.PAUSE) && (
          <GameCanvas
            isFullscreen={isFullscreenA}
            isLoading={state === GameStatus.LOADING}
          />
        )}
        {state === 'end' && <EndGameState retryCallback={onClick} />}
      </div>
    </main>
  )
}

export default GamePage
