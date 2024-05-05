import { createAsyncThunk } from '@reduxjs/toolkit';

import { orderBurgerApi } from '../../utils/burger-api';

export const fetchOrderBurger = createAsyncThunk(
  'burger/order',
  async (data: string[]) => orderBurgerApi(data)
);
