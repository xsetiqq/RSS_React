import React from 'react';
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Flyout from '../../src/components/main/Flyout';
import { unselectAll } from '../../src/store/selectedItemsSlice';

// ✅ Создаем mock-хранилище для Redux
const mockStore = configureStore();

describe('Flyout Component', () => {
  let store: any;

  beforeEach(() => {
    vi.clearAllMocks(); // ✅ Очищаем моки перед каждым тестом
    store = mockStore({
      selectedItems: {
        selected: [{ id: '1', name: 'Item 1', url: 'http://example.com' }],
      },
    });

    // ✅ Создаем мок для store.dispatch
    store.dispatch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks(); // ✅ Восстанавливаем оригинальные методы после тестов
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

    // ✅ Берем именно кнопку, а не скрытую ссылку
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
