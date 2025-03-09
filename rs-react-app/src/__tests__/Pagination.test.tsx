import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/main/Pagination';

describe('Pagination component', () => {
  test('renders the correct number of pages', () => {
    render(
      <Pagination countPersons={25} currentPage={1} setCurrentPage={() => {}} />
    );

    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  test('sets the correct page on button click', () => {
    const setCurrentPageMock = vi.fn();

    render(
      <Pagination
        countPersons={25}
        currentPage={1}
        setCurrentPage={setCurrentPageMock}
      />
    );

    const pageButtons = screen.getAllByRole('button');

    fireEvent.click(pageButtons[1]);

    expect(setCurrentPageMock).toHaveBeenCalledWith(2);
  });

  test('applies the "active" class to the current page', () => {
    render(
      <Pagination countPersons={30} currentPage={2} setCurrentPage={() => {}} />
    );

    const activePage = screen.getByText('2').closest('li');

    expect(activePage?.className).toMatch(/active/);
  });
});
