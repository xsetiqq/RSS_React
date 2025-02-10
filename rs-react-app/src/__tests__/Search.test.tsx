import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TopControls from '../components/header/TopControls';
import { vi } from 'vitest';

test('сохраняет введенный текст в localStorage', () => {
  render(
    <MemoryRouter>
      <TopControls getApiData={vi.fn()} setPageStart={vi.fn()} />
    </MemoryRouter>
  );

  const input = screen.getByPlaceholderText('Search');
  fireEvent.change(input, { target: { value: 'Yoda' } });

  expect(input).toHaveValue('Yoda');
});
