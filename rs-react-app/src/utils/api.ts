import { Planet } from '../models/planet';

interface ResponseData {
  data: Planet[] | undefined;
  isError: boolean;
}

export async function fetchData(searchTerm: string): Promise<ResponseData> {
  try {
    const response = await fetch(
      `https://swapi.dev/api/planets/?search=${searchTerm}`
    );
    const data: { results: Planet[] } = await response.json();

    const result = data.results.map((planet) => ({
      name: planet.name,
      terrain: planet.terrain,
    }));
    return { data: result, isError: false };
  } catch (error: unknown) {
    console.error(error);
    return { data: undefined, isError: true };
  }
}
