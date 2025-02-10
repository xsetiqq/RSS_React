import { fetchData, fetchDetailsData } from '../utils/api';

global.fetch = vi.fn(); // Мокируем fetch на уровне всего файла

describe('API Tests', () => {
  beforeEach(() => {
    vi.restoreAllMocks(); // Восстанавливаем моки перед каждым тестом
  });

  test('fetchData returns correct data', async () => {
    // Мокируем fetch для запроса на swapi.dev
    global.fetch.mockResolvedValueOnce({
      json: async () => ({
        count: 1,
        results: [
          {
            url: 'https://swapi.dev/api/people/1/',
            name: 'Luke Skywalker',
            height: '172',
            gender: 'male',
          },
        ],
      }),
    });

    const data = await fetchData('Luke', 1);

    expect(global.fetch).toHaveBeenCalledWith(
      'https://swapi.dev/api/people/?search=Luke&page=1'
    );
    expect(data.isError).toBe(false);
    expect(data.countPersons).toBe(1);
    expect(data.data).toHaveLength(1);
    expect(data.data?.[0].name).toBe('Luke Skywalker');
  });

  test('fetchData handles errors correctly', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network Error'));

    const data = await fetchData('Luke', 1);

    expect(data.isError).toBe(true);
    expect(data.data).toBeUndefined();
    expect(data.countPersons).toBe(0);
  });

  test('fetchDetailsData returns correct data', async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => ({
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        gender: 'male',
      }),
    });

    const data = await fetchDetailsData('https://swapi.dev/api/people/1/');

    expect(global.fetch).toHaveBeenCalledWith(
      'https://swapi.dev/api/people/1/'
    );
    expect(data.isError).toBe(false);
    expect(data.data?.name).toBe('Luke Skywalker');
  });

  test('fetchDetailsData handles errors correctly', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network Error'));

    const data = await fetchDetailsData('https://swapi.dev/api/people/1/');

    expect(data.isError).toBe(true);
    expect(data.data).toBeUndefined();
  });
});
