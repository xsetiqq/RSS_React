import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import RightSection from '../components/main/RightSectionPage';

const mockDetailData = {
  name: 'Luke Skywalker',
  gender: 'male',
  mass: '77',
  hair_color: 'blond',
  eye_color: 'blue',
};

describe('RightSection component', () => {
  test('renders "Loading..." when isDetailLoading is true', () => {
    render(<RightSection detailData={undefined} isDetailLoading={true} />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('renders "No data available" when detailData is undefined', () => {
    render(<RightSection detailData={undefined} isDetailLoading={false} />);
    expect(screen.getByText(/No data available/i)).toBeInTheDocument();
  });

  test('renders correct person details when data is provided', () => {
    render(
      <RightSection detailData={mockDetailData} isDetailLoading={false} />
    );

    expect(screen.getByText(/Name: Luke Skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender: male/i)).toBeInTheDocument();
    expect(screen.getByText(/Mass: 77/i)).toBeInTheDocument();
    expect(screen.getByText(/Hair color: blond/i)).toBeInTheDocument();
    expect(screen.getByText(/Eye color: blue/i)).toBeInTheDocument();
  });

  test('calls closeDetails function when close button is clicked', () => {
    render(
      <RightSection detailData={mockDetailData} isDetailLoading={false} />
    );

    const closeButton = screen.getByRole('button', { name: /×/i });

    const pushStateMock = vi
      .spyOn(window.history, 'pushState')
      .mockImplementation(() => {});

    const dispatchEventMock = vi.spyOn(window, 'dispatchEvent');

    fireEvent.click(closeButton);

    expect(pushStateMock).toHaveBeenCalledWith({}, '', '?');
    expect(dispatchEventMock).toHaveBeenCalledWith(
      new PopStateEvent('popstate')
    );

    pushStateMock.mockRestore();
    dispatchEventMock.mockRestore();
  });
});
