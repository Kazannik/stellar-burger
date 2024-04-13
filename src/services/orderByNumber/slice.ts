import { createSlice } from '@reduxjs/toolkit';

import { TOrder } from '@utils-types';
import { fetchOrderByNumber } from './action';

interface IOrderByNumberSliceState {
  orders: TOrder[];
  isLoading: boolean;
  error: string | undefined;
}

const initialState: IOrderByNumberSliceState = {
  orders: [],
  isLoading: false,
  error: undefined
};

const orderByNumberSlice = createSlice({
  name: 'orderByNumber',
  initialState,
  reducers: {},
  selectors: {
    selectOrdersIsLoading: (state) => state.isLoading,
    selectOrders: (state) => state.orders
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        console.log(state.error);
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
      });
  }
});

export const { selectOrdersIsLoading, selectOrders } =
  orderByNumberSlice.selectors;
export const orderByNumberReducer = orderByNumberSlice.reducer;
