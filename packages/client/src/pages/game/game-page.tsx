import { useToggleFullscreen } from '../../utils/Fullscreen'
import { useEffect, useRef } from 'react'

function GamePage() {
  const gameElement = useRef(null)

  useEffect(() => {
    useToggleFullscreen('dblclick', gameElement.current)
  })

  return <div ref={gameElement}>Вот тут будет жить GamePage :)</div>
}

export default GamePage
