import { createSlice } from '@reduxjs/toolkit';

import { TOrder } from '@utils-types';
import { fetchOrderBurger } from './action';

interface IOrderBurgerSliceState {
  burger: TOrder | null;
  isLoading: boolean;
  error: string | undefined;
}

const initialState: IOrderBurgerSliceState = {
  burger: null,
  isLoading: false,
  error: undefined
};

const orderBurgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    clearOrderBurger: (state) => {
      state.burger = null;
      state.isLoading = false;
    }
  },
  selectors: {
    selectOrderBurgerIsLoading: (state) => state.isLoading,
    selectOrderBurger: (state) => state.burger
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOrderBurger.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrderBurger.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOrderBurger.fulfilled, (state, action) => {
        state.isLoading = false;
        state.burger = action.payload.order;
      });
  }
});

export const { clearOrderBurger } = orderBurgerSlice.actions;
export const { selectOrderBurgerIsLoading, selectOrderBurger } =
  orderBurgerSlice.selectors;
export const burgerReducer = orderBurgerSlice.reducer;
