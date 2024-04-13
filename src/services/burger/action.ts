import { createAsyncThunk } from '@reduxjs/toolkit';

import { orderBurgerApi } from '@api';

export const fetchOrderBurger = createAsyncThunk(
  'burger/order',
  async (data: string[]) => orderBurgerApi(data)
);
