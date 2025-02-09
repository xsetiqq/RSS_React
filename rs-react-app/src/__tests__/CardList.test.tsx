import { render, screen, fireEvent } from '@testing-library/react';
import Main from '../components/main/Main';

test('рендерит карточку', () => {
  render(<Main data={[{ id: 1, name: 'Test Card' }]} />);
  expect(screen.getByText('Test Card')).toBeInTheDocument();
});

test('клик по карточке вызывает событие', () => {
  const mockClick = jest.fn();
  render(
    <Main data={[{ id: 1, name: 'Test Card' }]} onItemClick={mockClick} />
  );
  fireEvent.click(screen.getByText('Test Card'));
  expect(mockClick).toHaveBeenCalled();
});
