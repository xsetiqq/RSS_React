import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Homepage from '../pages/Homepage';

describe('Homepage', () => {
  test('renders homepage components correctly', () => {
    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    );

    // Проверяем наличие основных частей страницы
    expect(screen.getByText(/Top controls/i)).toBeInTheDocument();
    expect(screen.getByText(/Results/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
    expect(screen.getByText(/Search/i)).toBeInTheDocument();
    expect(screen.getByText(/Throw Error/i)).toBeInTheDocument();
  });
});
