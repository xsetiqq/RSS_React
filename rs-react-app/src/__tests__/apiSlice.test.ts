import { describe, expect, test, vi } from 'vitest';
import { waitFor } from '@testing-library/react';
import { setupApiStore } from '../utils/testUtils';
import { apiSlice } from '../store/apiSlice';

describe('RTK Query API Test (без MSW)', () => {
  const storeRef = setupApiStore(apiSlice);

  test('useGetPeopleQuery делает запрос', async () => {
    // Простой мок fetch
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            count: 1,
            results: [
              {
                url: 'https://swapi.dev/api/people/1/',
                name: 'Luke Skywalker',
              },
            ],
          }),
      })
    ) as any;

    storeRef.renderHook(() =>
      apiSlice.endpoints.getPeople.useQuery({ searchTerm: 'Luke', page: 1 })
    );

    // ✅ Ждём, пока fetch вызовется
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
  });
});
