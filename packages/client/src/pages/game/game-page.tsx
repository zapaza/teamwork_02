import { useToggleFullscreen } from '../../utils/Fullscreen'
import { useEffect } from 'react'

function GamePage() {
  useEffect(() => {
    useToggleFullscreen('dblclick', '.game')
  })

  return <div className={'game'}>Вот тут будет жить GamePage :)</div>
}

export default GamePage
