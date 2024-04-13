import { createAsyncThunk } from '@reduxjs/toolkit';

import { getOrdersApi } from '@api';

export const fetchUserOrders = createAsyncThunk('orders/get', async () =>
  getOrdersApi()
);
