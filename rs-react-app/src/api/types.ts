export interface Country {
  cca3: string;
  name: {
    common: string;
  };
  population: number;
  region: string;
  capital?: string[];
  latlng: [number, number];
  flags: {
    png: string;
    alt?: string;
  };
}
