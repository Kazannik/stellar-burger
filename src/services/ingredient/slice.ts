import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { TConstructorIngredient, TIngredient } from '@utils-types';
import { fetchIngredients } from './action';

interface IIngredientSliceState {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | undefined;
}

export const initialState: IIngredientSliceState = {
  ingredients: [],
  isLoading: false,
  error: undefined
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    getIngredients: (state) => {
      state.isLoading = false;
    },
    getIngredientsAdded: (
      state,
      { payload }: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients.push(payload);
    }
  },
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectIngredientsLoading: (state) => state.isLoading
  },
  extraReducers(builder) {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { selectIngredients, selectIngredientsLoading } =
  ingredientsSlice.selectors;
export const ingredientsReducer = ingredientsSlice.reducer;
