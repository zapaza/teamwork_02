import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import LeaderBoardPage from './leaderboard-page'

describe('Leaderboard component', () => {
  test('component render', () => {
    render(<LeaderBoardPage />)

    expect(screen.getByRole('heading').textContent).toBe('Список Лидеров')
    expect(screen.getByText('10.')).toBeInTheDocument()
  })
})
