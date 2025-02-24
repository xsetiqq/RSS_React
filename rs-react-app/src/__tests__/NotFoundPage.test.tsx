import { render, screen } from '@testing-library/react';
import NotFoundPage from '../pages/NotFoundPage';
import { expect, test } from 'vitest';

test('renders NotFoundPage', () => {
  render(<NotFoundPage />);

  expect(screen.getByText(/error 404/i)).toBeInTheDocument();

  expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
});
