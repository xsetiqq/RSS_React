import React from 'react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from '../../src/store/selectedItemsSlice';
import { useSearchParams } from 'next/navigation';
import Main from '../../src/components/main/Main';
import { apiSlice } from '../../src/store/apiSlice';

vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams('search=test&page=1'),
}));

const mockStore = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

const mockData = [
  {
    url: 'https://swapi.dev/api/people/1/',
    name: 'Luke Skywalker',
    height: '172',
    gender: 'male',
  },
  {
    url: 'https://swapi.dev/api/people/2/',
    name: 'Darth Vader',
    height: '202',
    gender: 'male',
  },
];

const mockGetApiData = vi.fn();

describe('Main component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithProviders = (component: JSX.Element) =>
    render(<Provider store={mockStore}>{component}</Provider>);

  test('renders loading state', () => {
    renderWithProviders(
      <Main
        data={undefined}
        isLoading={true}
        isError={false}
        countPersons={0}
        getApiData={mockGetApiData}
      />
    );
    expect(screen.getByAltText('loading...')).toBeInTheDocument();
  });

  test('renders error component on error state', () => {
    renderWithProviders(
      <Main
        data={undefined}
        isLoading={false}
        isError={true}
        countPersons={0}
        getApiData={mockGetApiData}
      />
    );

    expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument();
  });

  test('renders person list', () => {
    renderWithProviders(
      <Main
        data={mockData}
        isLoading={false}
        isError={false}
        countPersons={2}
        getApiData={mockGetApiData}
      />
    );
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
  });

  test('dispatches action when checkbox is clicked', () => {
    renderWithProviders(
      <Main
        data={mockData}
        isLoading={false}
        isError={false}
        countPersons={2}
        getApiData={mockGetApiData}
      />
    );
    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  test('changes URL and opens details on item click', () => {
    renderWithProviders(
      <Main
        data={mockData}
        isLoading={false}
        isError={false}
        countPersons={2}
        getApiData={mockGetApiData}
      />
    );

    const person = screen.getByText('Luke Skywalker');
    fireEvent.click(person);

    expect(window.location.search).toContain('details=1');
  });
});
