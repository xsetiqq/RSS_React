import { render, screen } from '@testing-library/react';
import Main from '../components/main/Main';

test('рендерит Main', () => {
  render(<Main data={[{ id: 1, name: 'Card 1' }]} />);
  expect(screen.getByText('Card 1')).toBeInTheDocument();
});

test('отображает сообщение, если данных нет', () => {
  render(<Main data={[]} />);
  expect(screen.getByText('Нет доступных карточек')).toBeInTheDocument();
});
