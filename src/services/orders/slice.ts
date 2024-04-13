import { createSlice } from '@reduxjs/toolkit';

import { TOrder } from '@utils-types';
import { fetchUserOrders } from './action';

interface IFeedSliceState {
  userOrders: TOrder[];
  isLoading: boolean;
  error: string | undefined;
}

const initialState: IFeedSliceState = {
  userOrders: [],
  isLoading: false,
  error: undefined
};

const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  selectors: {
    selectUserOrdersIsLoading: (state) => state.isLoading,
    selectUserOrders: (state) => state.userOrders
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userOrders = action.payload;
      });
  }
});

export const { selectUserOrders } = userOrdersSlice.selectors;
export const userOrderReducer = userOrdersSlice.reducer;
