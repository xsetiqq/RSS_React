import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Main from '../components/main/Main';

test('renders the heading', () => {
  render(
    <MemoryRouter>
      <Main />
    </MemoryRouter>
  );

  expect(screen.getByText('Results')).toBeInTheDocument();
});
