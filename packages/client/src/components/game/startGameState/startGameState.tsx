import Button from '../../ui/button/button'
import React from 'react'
import LoadingSpinner from '../../ui/loader-spinner/loading-spinner'
import './startGameState.pcss'

export type EndGameStateProps = {
  callback: () => void
  isLoading: boolean
}
const StartGameState = (props: EndGameStateProps) => {
  return (
    <div className={'wrapper'}>
      <div className="start-game-state flex flex-jc-center flex-ai-center">
        {props.isLoading ? (
          <LoadingSpinner />
        ) : (
          <Button name="play" children="Start Game" onClick={props.callback} />
        )}
      </div>
    </div>
  )
}
export default StartGameState
