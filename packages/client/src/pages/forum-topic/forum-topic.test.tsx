import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ForumTopicPage from './forum-topic-page'

const mockUsedNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}))

describe('Topic component', () => {
  test('component render', () => {
    const topic = render(<ForumTopicPage />)

    expect(topic).toMatchSnapshot()
  })
})
