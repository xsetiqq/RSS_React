import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RightSection from '../pages/RightSectionPage';

const detailData = {
  name: 'Luke Skywalker',
  gender: 'male',
  mass: 77,
  hair_color: 'blond',
  eye_color: 'blue',
  url: '/people/1/',
};

// Adding a mock for setSearchParams before using it
const mockSetSearchParams = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useSearchParams: () => [new URLSearchParams(), mockSetSearchParams],
  };
});

test('renders the "Details" heading', () => {
  render(
    <MemoryRouter>
      <RightSection detailData={detailData} />
    </MemoryRouter>
  );

  expect(screen.getByText('Details')).toBeInTheDocument();
});

test('clicking the close button triggers URL change', () => {
  render(
    <MemoryRouter>
      <RightSection detailData={detailData} />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByText('×'));

  // Checking if mockSetSearchParams was called
  expect(mockSetSearchParams).toHaveBeenCalled();
});
