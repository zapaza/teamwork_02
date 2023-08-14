import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GameStatus } from '../../types/game'
interface GameState {
  status: GameStatus
}

const initialState: GameState = {
  status: 'start',
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<GameStatus>) => {
      state.status = action.payload
    },
  },
})

export default gameSlice.reducer
