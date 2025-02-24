import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Main from '../../src/components/main/Main';
import selectedItemsReducer from '../../src/store/selectedItemsSlice';
import { MemoryRouter, useSearchParams } from 'react-router-dom';
import { apiSlice, useGetPersonDetailsQuery } from '../../src/store/apiSlice';
import { beforeEach, vi, test } from 'vitest';

// Мокаем `useGetPersonDetailsQuery`
vi.mock('../../src/store/apiSlice', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useGetPersonDetailsQuery: vi.fn(() => ({
      data: null,
      isLoading: false,
      error: null,
      skip: true,
    })),
  };
});

// Мокаем `useSearchParams`
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useSearchParams: vi.fn(() => [new URLSearchParams(), vi.fn()]),
  };
});

// Создаём тестовый store
const testStore = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

beforeEach(() => {
  vi.restoreAllMocks(); // Сбрасываем все моки перед каждым тестом
});

test('Рендер Main с заголовком "Results"', () => {
  render(
    <Provider store={testStore}>
      <MemoryRouter>
        <Main data={[]} isLoading={false} isError={false} countPersons={0} />
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByText('Results')).toBeInTheDocument();
});

test('Рендер спиннера при загрузке', () => {
  render(
    <Provider store={testStore}>
      <MemoryRouter>
        <Main data={[]} isLoading={true} isError={false} countPersons={0} />
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByAltText('loading...')).toBeInTheDocument();
});

test('Рендер списка персонажей', () => {
  const mockData = [
    { name: 'Luke Skywalker', height: '172', gender: 'male', url: '1' },
    { name: 'Darth Vader', height: '202', gender: 'male', url: '2' },
  ];

  render(
    <Provider store={testStore}>
      <MemoryRouter>
        <Main
          data={mockData}
          isLoading={false}
          isError={false}
          countPersons={2}
        />
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  expect(screen.getByText('Darth Vader')).toBeInTheDocument();
});

test('Рендер компонента Error при наличии ошибки', () => {
  render(
    <Provider store={testStore}>
      <MemoryRouter>
        <Main data={[]} isLoading={false} isError={true} countPersons={0} />
      </MemoryRouter>
    </Provider>
  );

  // Проверяем, что заголовок "Oops! Something went wrong" отображается
  expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();

  // Проверяем, что изображение с alt-текстом "Error Alert" отображается
  expect(screen.getByAltText('Error Alert')).toBeInTheDocument();
});

test('Рендер RightSection при наличии detailsId', () => {
  const mockData = [
    { name: 'Luke Skywalker', height: '172', gender: 'male', url: '1' },
  ];

  // Мокаем useSearchParams, чтобы вернуть detailsId
  vi.mocked(useSearchParams).mockReturnValue([
    new URLSearchParams('details=1'),
    vi.fn(),
  ]);

  // Мокаем useGetPersonDetailsQuery, чтобы вернуть данные
  vi.mocked(useGetPersonDetailsQuery).mockReturnValue({
    data: {
      name: 'Luke Skywalker',
      gender: 'male',
      mass: '77',
      hair_color: 'blond',
      eye_color: 'blue',
    },
    isLoading: false,
    error: null,
    skip: false,
  });

  render(
    <Provider store={testStore}>
      <MemoryRouter>
        <Main
          data={mockData}
          isLoading={false}
          isError={false}
          countPersons={1}
        />
      </MemoryRouter>
    </Provider>
  );

  // Проверяем, что заголовок "Details" отображается
  expect(screen.getByText('Details')).toBeInTheDocument();

  // Проверяем, что кнопка закрытия отображается
  expect(screen.getByText('×')).toBeInTheDocument();

  // Проверяем, что данные персонажа отображаются
  expect(screen.getByText('Name: Luke Skywalker')).toBeInTheDocument();
  expect(screen.getByText('Gender: male')).toBeInTheDocument();
  expect(screen.getByText('Mass: 77')).toBeInTheDocument();
  expect(screen.getByText('Hair color: blond')).toBeInTheDocument();
  expect(screen.getByText('Eye color: blue')).toBeInTheDocument();
});

test('Рендер RightSection без данных', () => {
  const mockData = [
    { name: 'Luke Skywalker', height: '172', gender: 'male', url: '1' },
  ];

  vi.mocked(useSearchParams).mockReturnValue([
    new URLSearchParams('details=1'),
    vi.fn(),
  ]);

  vi.mocked(useGetPersonDetailsQuery).mockReturnValue({
    data: null,
    isLoading: false,
    error: null,
    skip: false,
  });

  render(
    <Provider store={testStore}>
      <MemoryRouter>
        <Main
          data={mockData}
          isLoading={false}
          isError={false}
          countPersons={1}
        />
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByText('Details')).toBeInTheDocument();

  expect(screen.getByText('No data available')).toBeInTheDocument();
});
