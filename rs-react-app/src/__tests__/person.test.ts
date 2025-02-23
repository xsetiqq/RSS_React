import { describe, expect, test } from 'vitest';
import { Person, DetailPerson } from '../models/person';

describe('Person Type Tests', () => {
  test('Создание объекта Person', () => {
    const person: Person = {
      gender: 'male',
      name: 'Luke Skywalker',
      height: '172',
      url: 'https://swapi.dev/api/people/1/',
    };

    expect(person.name).toBe('Luke Skywalker');
    expect(person.gender).toBe('male');
    expect(person.height).toBe('172');
    expect(person.url).toBe('https://swapi.dev/api/people/1/');
  });

  test('Создание объекта DetailPerson', () => {
    const detailPerson: DetailPerson = {
      name: 'Luke Skywalker',
      mass: 77,
      hair_color: 'blond',
      eye_color: 'blue',
      gender: 'male',
      url: 'https://swapi.dev/api/people/1/',
    };

    expect(detailPerson.name).toBe('Luke Skywalker');
    expect(detailPerson.mass).toBe(77);
    expect(detailPerson.hair_color).toBe('blond');
    expect(detailPerson.eye_color).toBe('blue');
    expect(detailPerson.gender).toBe('male');
    expect(detailPerson.url).toBe('https://swapi.dev/api/people/1/');
  });
});
