import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Flyout from '../../src/components/main/Flyout';
import selectedItemsReducer from '../../src/store/selectedItemsSlice';

// Создаём тестовый store с предустановленными выделенными элементами
const createTestStore = (
  selectedItems = [
    { id: '1', name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' },
  ]
) =>
  configureStore({
    reducer: { selectedItems: selectedItemsReducer },
    preloadedState: { selectedItems: { selected: selectedItems } },
  });

describe('Flyout Component', () => {
  test('✅ Flyout рендерится с выделенными элементами', () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.getByText('1 items selected')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Unselect All/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Download/i })
    ).toBeInTheDocument();
  });

  test('✅ Нажатие на "Unselect All" очищает выделенные элементы', () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    // Кликаем "Unselect All"
    fireEvent.click(screen.getByRole('button', { name: /Unselect All/i }));

    // Проверяем, что store изменился
    expect(store.getState().selectedItems.selected).toEqual([]);
    expect(screen.queryByText(/items selected/i)).not.toBeInTheDocument(); // Flyout должен исчезнуть
  });

  test('✅ Flyout скрывается, если нет выделенных элементов', () => {
    const store = createTestStore([]); // Нет выделенных элементов

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.queryByText(/items selected/i)).not.toBeInTheDocument();
  });
});
