import GameCanvas from '../../components/game/game'
import './game-page.pcss'
import { useEffect, useRef } from 'react'
import { useIsFullscreen, toggleFullscreen } from '../../utils/Fullscreen'

function GamePage() {
  const gameElement = useRef(null)
  useEffect(() => {
    toggleFullscreen('dblclick', gameElement.current)
  })
  const isFullscreen = useIsFullscreen()
  return (
    <div className="game-page">
      <GameCanvas ref={gameElement} isFullscreen={isFullscreen} />
    </div>
  )
}

export default GamePage
