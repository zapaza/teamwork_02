import { useState } from 'react'
import Button from '../../components/ui/button/button'
import './game-page.pcss'
import { RootState } from '../../store'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import GameCanvas from '../../components/game/gameState/gameState'
import LoadingSpinner from '../../components/ui/loader-spinner/loading-spinner'

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

  const state = useSelector((state: RootState) => state.game)

  useEffect(() => {
    console.log(state)
  }, [state])

  return (
    <main className="game-page flex flex-jc-center">
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
        <GameCanvas />
      </div>
    </main>
  )
}

export default GamePage
