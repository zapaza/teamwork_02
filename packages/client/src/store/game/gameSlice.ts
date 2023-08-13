import { createSlice } from '@reduxjs/toolkit'
import { GameState } from '../../types/game'

const initialState: GameState = {
  isStart: true,
  isPlay: false,
  isEnd: false,
  isPause: false,
  isLoading: false,
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    start: () => {
      return {
        isStart: true,
        isPlay: false,
        isEnd: false,
        isPause: false,
        isLoading: false,
      }
    },
    play: () => {
      return {
        isStart: false,
        isPlay: true,
        isEnd: false,
        isPause: false,
        isLoading: false,
      }
    },
    end: () => {
      return {
        isStart: false,
        isPlay: false,
        isEnd: true,
        isPause: false,
        isLoading: false,
      }
    },
    pause: () => {
      return {
        isStart: false,
        isPlay: false,
        isEnd: false,
        isPause: true,
        isLoading: false,
      }
    },
    loading: () => {
      return {
        isStart: false,
        isPlay: false,
        isEnd: false,
        isPause: false,
        isLoading: true,
      }
    },
  },
})

export default gameSlice.reducer
