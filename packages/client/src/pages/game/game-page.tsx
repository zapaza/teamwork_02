import GameCanvas from '../../components/game/game'
import './game-page.pcss'
import { useEffect, useRef, useState } from 'react'
import { useToggleFullscreen } from '../../utils/Fullscreen'

function GamePage() {
  const gameElement = useRef(null)
  useEffect(() => {
    useToggleFullscreen('dblclick', gameElement.current)
  })
  const [isFullscreen, setIsFullscreen] = useState(false)
  useEffect(() => {
    const handleFullscreen = () => {
      const fullscreenElement =
        document.fullscreenElement ||
        // @ts-ignore
        document.mozFullScreenElement ||
        // @ts-ignore
        document.webkitFullscreenElement

      setIsFullscreen(!!fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreen)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreen)
    }
  }, [])

  return (
    <div className="game-page">
      <GameCanvas ref={gameElement} isFullscreen={isFullscreen} />
    </div>
  )
}

export default GamePage
