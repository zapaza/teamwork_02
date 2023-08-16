import Button from '../../ui/button/button'
import React from 'react'
import LoadingSpinner from '../../ui/loader-spinner/loading-spinner'
import './startGameState.pcss'
import { useTranslation } from 'react-i18next'


export type EndGameStateProps = {
  callback: () => void
  isLoading: boolean
}
const StartGameState = (props: EndGameStateProps) => {
  const { t } = useTranslation()

  return (
    <div className={'wrapper'}>
      <div className="start-game-state flex flex-jc-center flex-ai-center">
        {props.isLoading ? (
          <LoadingSpinner />
        ) : (
          <Button name="play" children={t('start_game')} onClick={props.callback} />
        )}
      </div>
    </div>
  )
}
export default StartGameState
