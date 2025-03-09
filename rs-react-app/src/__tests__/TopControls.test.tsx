import React from 'react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import TopControls from '../../src/components/header/TopControls';

const pushMock = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  useSearchParams: () => new URLSearchParams('search=test&page=1'),
}));

describe('TopControls component', () => {
  const mockGetApiData = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  test('renders input and button', () => {
    render(<TopControls getApiData={mockGetApiData} />);

    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('loads stored search query from localStorage', () => {
    localStorage.setItem('lastSearch', 'Skywalker');

    render(<TopControls getApiData={mockGetApiData} />);

    expect(screen.getByDisplayValue('Skywalker')).toBeInTheDocument();
  });

  test('updates search params and calls getApiData on search', () => {
    render(<TopControls getApiData={mockGetApiData} />);

    const input = screen.getByPlaceholderText('Search');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'Vader' } });
    fireEvent.click(button);

    expect(mockGetApiData).toHaveBeenCalledWith({
      searchTerm: 'Vader',
      page: 1,
    });
    expect(localStorage.getItem('lastSearch')).toBe('Vader');

    expect(pushMock).toHaveBeenCalledWith('?search=Vader&page=1');
  });
});
