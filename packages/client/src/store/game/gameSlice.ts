import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { GameState } from '../../types/game'

const initialState: GameState = {
  end: false,
  pause: false,
  play: false,
  start: false,
  loading: true,
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    start: (state: GameState) => {
      state = {
        loading: false,
        start: true,
        end: false,
        pause: false,
        play: false
      }
    },
  },
})

export default gameSlice.reducer
