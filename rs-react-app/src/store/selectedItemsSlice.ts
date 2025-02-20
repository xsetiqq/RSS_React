import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Item {
  id: string;
  name: string;
  description: string;
  url: string;
}

interface SelectedItemsState {
  selected: Item[];
}

const initialState: SelectedItemsState = {
  selected: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<Item>) => {
      if (!state.selected.some((item) => item.id === action.payload.id)) {
        state.selected.push(action.payload);
      }
    },
    unselectItem: (state, action: PayloadAction<string>) => {
      state.selected = state.selected.filter(
        (item) => item.id !== action.payload
      );
    },
    unselectAll: (state) => {
      state.selected = [];
    },
  },
});

export const { selectItem, unselectItem, unselectAll } =
  selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
