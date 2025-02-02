interface Planet {
  name: string;
  terrain: string;
}

export async function fetchData(searchTerm: string): Promise<Planet[]> {
  const response = await fetch(
    `https://swapi.dev/api/planets/?search=${searchTerm}`
  );
  const data: { results: Planet[] } = await response.json();

  return data.results.map((planet) => ({
    name: planet.name,
    terrain: planet.terrain,
  }));
}
