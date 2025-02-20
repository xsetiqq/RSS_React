import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Person, DetailPerson } from '../models/person';

interface PeopleResponse {
  count: number;
  results: Person[];
}

// Создаём API slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }), // Базовый URL API
  endpoints: (builder) => ({
    // Получение списка людей
    getPeople: builder.query<
      { data: Person[]; countPersons: number },
      { searchTerm: string; page: number }
    >({
      query: ({ searchTerm, page }) =>
        `people/?search=${searchTerm}&page=${page}`,
      transformResponse: (response: PeopleResponse) => ({
        data: response.results.map((person) => ({
          url: person.url,
          name: person.name,
          height: person.height,
          gender: person.gender,
        })),
        countPersons: response.count,
      }),
    }),

    // Получение деталей персонажа
    getPersonDetails: builder.query<DetailPerson, string>({
      query: (url) => url.replace('https://swapi.dev/api/', ''), // Убираем базовый URL из запроса
    }),
  }),
});

// Экспортируем хуки для использования в компонентах
export const { useGetPeopleQuery, useGetPersonDetailsQuery } = apiSlice;
