import { describe, test, expect } from 'vitest';
import { store } from './../store/store';
import { selectItem } from './../store/selectedItemsSlice';
import { apiSlice } from './../store/apiSlice';

describe('Redux Store', () => {
  test('should have the correct initial state shape', () => {
    const state = store.getState();
    expect(state).toHaveProperty('selectedItems');
    expect(state).toHaveProperty(apiSlice.reducerPath);
    expect(state.selectedItems.selected).toEqual([]);
  });

  test('should update selectedItems state when dispatching selectItem', () => {
    const item = {
      id: '1',
      name: 'Luke Skywalker',
      description: 'Jedi Knight',
      url: 'https://swapi.dev/api/people/1/',
    };

    store.dispatch(selectItem(item));
    const state = store.getState();

    expect(state.selectedItems.selected).toHaveLength(1);
    expect(state.selectedItems.selected[0]).toEqual(item);
  });
});
