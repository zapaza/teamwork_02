import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { LeaderboardPage } from '@/pages/leaderboard/leaderboard-page';

describe('Leaderboard component', () => {
	test('component render', () => {
		render(<LeaderboardPage/>);

		expect(screen.getByRole('heading').textContent).toBe('Список Лидеров');
		expect(screen.getByText('10.')).toBeInTheDocument();
	});
});
