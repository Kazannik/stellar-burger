import { createAsyncThunk } from '@reduxjs/toolkit';

import { getOrdersApi } from '../../utils/burger-api';

export const fetchUserOrders = createAsyncThunk('orders/get', async () =>
  getOrdersApi()
);
