import { Person, DetailPerson } from '../models/person';

interface ResponseData {
  data: Person[] | undefined;
  isError: boolean;
  countPersons: number;
}
interface ResponseDetailData {
  data: DetailPerson | undefined;
  isError: boolean;
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
      url: person.url,
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

export async function fetchDetailsData(
  url: string
): Promise<ResponseDetailData> {
  try {
    const response = await fetch(url);
    const data: DetailPerson = await response.json();

    return { data, isError: false };
  } catch (error: unknown) {
    console.error(error);
    return { data: undefined, isError: true };
  }
}
