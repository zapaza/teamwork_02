import GameCanvas from '../../components/game/game'
import './game-page.pcss'
import { useToggleFullscreen } from '../../utils/Fullscreen'
import { useEffect } from 'react'

function GamePage() {
  useEffect(() => {
    useToggleFullscreen('dblclick', '.game')
  })

  return (
    <div className='game-page'>
      <GameCanvas/>
    </div>
  )
}

export default GamePage
