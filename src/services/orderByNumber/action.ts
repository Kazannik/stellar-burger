import { createAsyncThunk } from '@reduxjs/toolkit';

import { getOrderByNumberApi } from '@api';

export const fetchOrderByNumber = createAsyncThunk(
  'order/getByNumber',
  async (number: number) => getOrderByNumberApi(number)
);
