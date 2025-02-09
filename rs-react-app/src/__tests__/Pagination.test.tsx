import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/main/Pagination';

test('изменяет страницу при клике', () => {
  const mockSetPage = jest.fn();
  render(<Pagination currentPage={1} setCurrentPage={mockSetPage} />);
  fireEvent.click(screen.getByText('Следующая'));
  expect(mockSetPage).toHaveBeenCalledWith(2);
});
