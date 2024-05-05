import { createAsyncThunk } from '@reduxjs/toolkit';

import { getOrderByNumberApi } from '../../utils/burger-api';

export const fetchOrderByNumber = createAsyncThunk(
  'order/getByNumber',
  async (number: number) => getOrderByNumberApi(number)
);
