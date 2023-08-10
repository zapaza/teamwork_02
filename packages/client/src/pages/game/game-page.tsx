import GameCanvas from '../../components/game/gameState/gameState'
import './game-page.pcss'
import { RootState } from '../../store'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'



function GamePage() {
  const state = useSelector((state: RootState) => state.game)

  useEffect(() => {
    console.log(state)

  },[state])

  return (
    <div className="game-page">
      <GameCanvas />
    </div>
  )
}

export default GamePage
