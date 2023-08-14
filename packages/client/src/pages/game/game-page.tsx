import { useState } from 'react'
import Button from '../../components/ui/button/button'
import './game-page.pcss'
import { useIsFullscreen } from '../../utils/Fullscreen'
import GameCanvas from '../../components/game/gameState/gameState'
import LoadingSpinner from '../../components/ui/loader-spinner/loading-spinner'

const GAME_LOADING_TIMER = 3000

function GamePage() {
  const isFullscreenA = useIsFullscreen()

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
    <main className="game-page flex flex-jc-center flex-ai-center">
      <div className="game-page__container">
        {!isPlaying && (
          <div className="game-page__overlay flex flex-jc-center flex-ai-center">
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <Button name="play" children="Играть" onClick={onClick} />
            )}
          </div>
        )}
        <GameCanvas isFullscreen={isFullscreenA} />
      </div>
    </main>
  )
}

export default GamePage
