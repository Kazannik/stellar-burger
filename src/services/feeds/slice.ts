import { createSlice } from '@reduxjs/toolkit';

import { TOrder } from '@utils-types';
import { fetchFeeds } from './action';

interface IFeedsSliceState {
  feeds: TOrder[];
  isLoading: boolean;
  total: number;
  totalToday: number;
  error: string | undefined;
}

export const initialState: IFeedsSliceState = {
  feeds: [],
  isLoading: false,
  total: 0,
  totalToday: 0,
  error: undefined
};

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    selectFeedsIsLoading: (state) => state.isLoading,
    selectFeeds: (state) => state.feeds,
    selectTotal: (state) => state.total,
    selectTotalToday: (state) => state.totalToday
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feeds = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});

export const {
  selectFeedsIsLoading,
  selectFeeds,
  selectTotal,
  selectTotalToday
} = feedsSlice.selectors;
export const feedsReducer = feedsSlice.reducer;
