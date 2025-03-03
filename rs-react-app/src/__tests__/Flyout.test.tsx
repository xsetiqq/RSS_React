import React from 'react';
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Flyout from '../../src/components/main/Flyout';
import { unselectAll } from '../../src/store/selectedItemsSlice';

const mockStore = configureStore();

describe('Flyout Component', () => {
  let store: any;

  beforeEach(() => {
    vi.clearAllMocks();
    store = mockStore({
      selectedItems: {
        selected: [{ id: '1', name: 'Item 1', url: 'http://example.com' }],
      },
    });

    store.dispatch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('does not render when no items are selected', () => {
    store = mockStore({ selectedItems: { selected: [] } });

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.queryByText(/items selected/i)).not.toBeInTheDocument();
  });

  test('renders correctly when items are selected', () => {
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.getByText(/1 items selected/i)).toBeInTheDocument();
    expect(screen.getByText(/Unselect All/i)).toBeInTheDocument();

    const downloadButton = screen.getByRole('button', { name: /Download/i });
    expect(downloadButton).toBeInTheDocument();
  });

  test('dispatches unselectAll action when "Unselect All" is clicked', () => {
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    const unselectButton = screen.getByText(/Unselect All/i);
    fireEvent.click(unselectButton);

    expect(store.dispatch).toHaveBeenCalledWith(unselectAll());
  });
});
