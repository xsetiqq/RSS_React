import { Person } from '../models/person';

interface ResponseData {
  data: Person[] | undefined;
  isError: boolean;
}

export async function fetchData(searchTerm: string): Promise<ResponseData> {
  try {
    const response = await fetch(
      `https://swapi.dev/api/people/?search=${searchTerm}`
    );
    const data: { results: Person[] } = await response.json();

    const result = data.results.map((persone) => ({
      name: persone.name,
      height: persone.height,
      gender: persone.gender,
    }));
    return { data: result, isError: false };
  } catch (error: unknown) {
    console.error(error);
    return { data: undefined, isError: true };
  }
}
