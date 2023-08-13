import './game-page.pcss'
import store, { RootState } from '../../store'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import GameCanvas from '../../components/game/gameState/gameState'
import { gameSlice } from '../../store/game/gameSlice'
import EndGameState from '../../components/game/endGameState/endGameState'
import StartGameState from '../../components/game/startGameState/startGameState'


function GamePage() {

  const onClick = () => {
    store.dispatch(gameSlice.actions.loading())
  }

  const state = useSelector((state: RootState) => state.game)

  useEffect(() => {
    console.log(state)
  }, [state])

  return (
    <main className="game-page flex flex-jc-center">
      <div className="game-page__container">
        {(state.isStart || state.isLoading) && <StartGameState callback={onClick}  isLoading={state.isLoading}/>}
        {(state.isLoading || state.isPlay || state.isPause) && <GameCanvas isLoading={state.isLoading}/>}
        {state.isEnd && <EndGameState  retryCallback={onClick}/>}
      </div>
    </main>
  )
}

export default GamePage
