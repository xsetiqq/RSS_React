import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/main/Pagination';

test('renders page buttons', () => {
  render(
    <Pagination
      countPersons={50}
      setPageStart={() => {}}
      currentPage={1}
      setCurrentPage={() => {}}
    />
  );

  expect(screen.getByText('1')).toBeInTheDocument();
  expect(screen.getByText('2')).toBeInTheDocument();
  expect(screen.getByText('3')).toBeInTheDocument();
});

test('clicking a page button triggers setCurrentPage', () => {
  const mockSetPage = vi.fn();
  render(
    <Pagination
      countPersons={50}
      setPageStart={() => {}}
      currentPage={1}
      setCurrentPage={mockSetPage}
    />
  );

  fireEvent.click(screen.getByText('2'));
  expect(mockSetPage).toHaveBeenCalledWith(2);
});
