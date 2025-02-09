import { render, screen, fireEvent } from '@testing-library/react';
import TopControls from '../components/header/TopControls';

test('сохраняет введенный текст в localStorage', () => {
  render(<TopControls />);
  const input = screen.getByPlaceholderText('Поиск...');
  fireEvent.change(input, { target: { value: 'React' } });

  fireEvent.click(screen.getByText('Поиск'));
  expect(localStorage.getItem('searchQuery')).toBe('React');
});

test('загружает значение из localStorage при монтировании', () => {
  localStorage.setItem('searchQuery', 'React');
  render(<TopControls />);

  const input = screen.getByPlaceholderText('Поиск...');
  expect(input).toHaveValue('React');
});
