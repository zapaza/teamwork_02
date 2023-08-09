import { useState } from 'react'
import Button from '../../components/ui/button/button'
import './game-page.pcss'
import GameCanvas from '../../components/game/gameState/gameState'

const GAME_LOADING_TIMER = 3000

function GamePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const onClick = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsPlaying(true)
    }, GAME_LOADING_TIMER)
  }

  return (
    <main className="game-page flex flex-jc-center">
      <div className="game-page__container">
        {!isPlaying && (
          <div className="game-page__overlay flex flex-jc-center flex-ai-center">
            {isLoading && <div className="game-page__loading-spinner"></div>}
            {!isLoading && (
              <Button name="play" children="Играть" onClick={onClick} />
            )}
          </div>
        )}
        <GameCanvas />
      </div>
    </main>
  )
}

export default GamePage
