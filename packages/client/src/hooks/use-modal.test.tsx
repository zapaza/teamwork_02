import '@testing-library/jest-dom/extend-expect';
import useModal from './use-modal';
import { fireEvent, render, screen } from '@testing-library/react';

function TestComponent() {
	const { isOpen, toggle } = useModal();
	return <button onClick={toggle}>{isOpen.toString()}</button>;
}

describe('useModal hook', () => {
	beforeEach(() => {
		render(<TestComponent/>);
	});

	test('initial value isOpen is false', () => {
		expect(screen.getByText('false')).toBeInTheDocument();
	});

	test('button click should update isOpen to true', () => {
		fireEvent.click(screen.getByText('false'));
		expect(screen.getByText('true')).toBeInTheDocument();
	});

	test('check if isOpen can toggle', () => {
		fireEvent.click(screen.getByText('false'));
		expect(screen.getByText('true')).toBeInTheDocument();
		fireEvent.click(screen.getByText('true'));
		expect(screen.getByText('false')).toBeInTheDocument();
		fireEvent.click(screen.getByText('false'));
		expect(screen.getByText('true')).toBeInTheDocument();
	});
});
