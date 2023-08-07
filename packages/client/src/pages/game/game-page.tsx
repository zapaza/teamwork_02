import GameCanvas from '../../components/game/game'
import './game-page.pcss'
import { useToggleFullscreen } from '../../utils/Fullscreen'
import { useEffect, useRef } from 'react'

function GamePage() {
  const gameElement = useRef(null)
  useEffect(() => {
    useToggleFullscreen('dblclick', gameElement.current)
  })
  return (
    <div className="game-page">
      <GameCanvas ref={gameElement} />
    </div>
  )
}

export default GamePage
