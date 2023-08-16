import Button from '../../ui/button/button'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import { useTranslation } from 'react-i18next'

export type EndGameStateProps = {
  retryCallback: () => void
}
const EndGameState = (props: EndGameStateProps) => {
  const navigate = useNavigate()

  function goToLeaderBoard() {
    navigate('/leaderboard')
  }
  const { t } = useTranslation()

  return (
    <div className="end-game-state wrapper flex flex-column flex-ai-center gap-16">
      <h1 className="text-3-xl-font-bold">{t('game_over')}</h1>
      <p className=".text-base-font-regular">
        {t('replay_description')}
      </p>

      <div className="end-game-state__buttons flex flex-ai-center gap-16">
        <Button
          onClick={props.retryCallback}
          name="retry"
          children={t('retry')}></Button>
        <Button
          name="leadBoard"
          children={t('leaderboard')}
          onClick={goToLeaderBoard}></Button>
      </div>
    </div>
  )
}
export default EndGameState
