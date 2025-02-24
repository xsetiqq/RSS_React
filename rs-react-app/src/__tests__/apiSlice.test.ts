import { describe, expect, test, vi } from 'vitest';
import { waitFor } from '@testing-library/react';
import { setupApiStore } from '../utils/testUtils';
import { apiSlice } from '../store/apiSlice';

describe('RTK Query API Test ', () => {
  const storeRef = setupApiStore(apiSlice);

  test('useGetPeopleQuery делает запрос', async () => {
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

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
  });
});
