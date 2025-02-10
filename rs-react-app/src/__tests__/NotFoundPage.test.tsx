import { render, screen } from '@testing-library/react';
import NotFoundPage from '../pages/NotFoundPage';
import { expect, test } from 'vitest';

test('renders NotFoundPage', () => {
  render(<NotFoundPage />);

  // Ищем существующий текст "Error 404"
  expect(screen.getByText(/error 404/i)).toBeInTheDocument();

  // Проверяем, что есть кнопка или ссылка "Go home"
  expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
});
