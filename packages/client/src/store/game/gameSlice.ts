import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { GameState } from '../../types/game'

const initialState: GameState = {
  end: false,
  pause: false,
  play: false,
  start: true
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    changeState: (state, action:PayloadAction<GameState>) =>  {
      state = {...state, ...action.payload}
      return state;
    },
  },
})

export default gameSlice.reducer
