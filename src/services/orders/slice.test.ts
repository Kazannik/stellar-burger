import { expect, test, describe } from '@jest/globals';

import { initialState, selectUserOrders, userOrderReducer } from './slice';

import { fetchUserOrders } from './action';
import { ORDERS } from '../../utils/testData';
import { configureStore } from '@reduxjs/toolkit';

describe('тестирование экшена fetchUserOrders', () => {
  const actions = {
    pending: {
      type: fetchUserOrders.pending.type,
      payload: null
    },
    rejected: {
      type: fetchUserOrders.rejected.type,
      error: { message: 'Test Error Message' }
    },
    fulfilled: {
      type: fetchUserOrders.fulfilled.type,
      payload: ORDERS
    }
  };

  test('тест синхронного экшена fetchUserOrders.pending', () => {
    const receivedState = userOrderReducer(initialState, actions.pending);
    expect(receivedState.isLoading).toBeTruthy();
    expect(receivedState.error).toBeUndefined();
  });

  test('тест синхронного экшена fetchUserOrders.rejected', () => {
    const receivedState = userOrderReducer(initialState, actions.rejected);
    expect(receivedState.isLoading).toBeFalsy();
    expect(receivedState.error).toBe(actions.rejected.error.message);
  });

  test('тест синхронного экшена fetchUserOrders.fulfilled', () => {
    const receivedState = userOrderReducer(initialState, actions.fulfilled);
    expect(receivedState.isLoading).toBeFalsy();
    expect(receivedState.userOrders).toEqual(actions.fulfilled.payload);
  });
});

describe('Тестирование селектора selectUserOrders', () => {
  test('получение заказов пользователя', () => {
    const receivedStore = configureStore({
      reducer: { userOrders: userOrderReducer },
      preloadedState: {
        userOrders: {
          userOrders: ORDERS,
          isLoading: false,
          error: undefined
        }
      }
    });

    const receivedOrders = selectUserOrders(receivedStore.getState());
    expect(receivedOrders).toEqual(ORDERS);
  });
});
