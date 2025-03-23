import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Country } from './types';

export const countriesApi = createApi({
  reducerPath: 'countriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://restcountries.com/v3.1/' }),
  endpoints: (builder) => ({
    getAllCountries: builder.query<Country[], void>({
      query: () => 'all',
    }),
  }),
});

export const { useGetAllCountriesQuery } = countriesApi;
