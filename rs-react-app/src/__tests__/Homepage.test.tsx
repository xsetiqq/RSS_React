import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../store/store';
import Home from '../pages/Homepage';

test('Рендер главной страницы', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByText('Top controls')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /throw error/i })
  ).toBeInTheDocument();
});
