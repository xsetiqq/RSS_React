import { Person } from '../models/person';

interface ResponseData {
  data: Person[] | undefined;
  isError: boolean;
  countPersons: number;
}

export async function fetchData(
  searchTerm: string,
  page: number
): Promise<ResponseData> {
  try {
    const response = await fetch(
      `https://swapi.dev/api/people/?search=${searchTerm}&page=${page}`
    );
    const data: {
      count: number;
      results: Person[];
    } = await response.json();

    const result = data.results.map((person) => ({
      name: person.name,
      height: person.height,
      gender: person.gender,
    }));

    return { data: result, isError: false, countPersons: data.count };
  } catch (error: unknown) {
    console.error(error);
    return { data: undefined, isError: true, countPersons: 0 };
  }
}
