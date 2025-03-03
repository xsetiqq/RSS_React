import { describe, test, expect, beforeEach } from 'vitest';
import reducer, {
  selectItem,
  unselectItem,
  unselectAll,
} from './../store/selectedItemsSlice';

interface Item {
  id: string;
  name: string;
  description: string;
  url: string;
}

describe('selectedItemsSlice', () => {
  const item: Item = {
    id: '1',
    name: 'Luke Skywalker',
    description: 'Jedi Knight',
    url: 'https://swapi.dev/api/people/1/',
  };

  let initialState = {
    selected: [] as Item[],
  };

  beforeEach(() => {
    initialState = { selected: [] };
  });

  test('should return the initial state', () => {
    const state = reducer(undefined, { type: undefined });
    expect(state).toEqual({ selected: [] });
  });

  test('should add an item to selected', () => {
    const state = reducer(initialState, selectItem(item));
    expect(state.selected).toHaveLength(1);
    expect(state.selected[0]).toEqual(item);
  });

  test('should not add duplicate items', () => {
    const state = reducer({ selected: [item] }, selectItem(item));
    expect(state.selected).toHaveLength(1);
  });

  test('should remove an item from selected', () => {
    const stateWithItem = reducer(initialState, selectItem(item));
    const newState = reducer(stateWithItem, unselectItem(item.id));
    expect(newState.selected).toHaveLength(0);
  });

  test('should clear all selected items', () => {
    const stateWithItems = reducer(initialState, selectItem(item));
    const newState = reducer(stateWithItems, unselectAll());
    expect(newState.selected).toHaveLength(0);
  });
});
