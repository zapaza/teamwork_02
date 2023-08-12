import GameCanvas from '../../components/game/gameState/gameState'
import './game-page.pcss'
import { useIsFullscreen } from '../../utils/Fullscreen'

function GamePage() {

  const isFullscreenA = useIsFullscreen()

  return (
    <div className='game-page'>
      <GameCanvas isFullscreen={isFullscreenA}/>
    </div>
  )
}

export default GamePage
