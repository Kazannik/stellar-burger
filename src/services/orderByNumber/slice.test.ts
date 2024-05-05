import { expect, test, describe } from '@jest/globals';

import { selectOrders, orderByNumberReducer } from './slice';

import { fetchOrderByNumber } from './action';
import { ORDER, ORDERS } from '../../utils/testData';

describe('Проверка асинхронных экшенов получения информации о заказе', () => {
  const initialState = {
    orders: ORDERS,
    isLoading: false,
    error: undefined
  };

  const actions = {
    pending: {
      type: fetchOrderByNumber.pending.type,
      payload: null
    },
    rejected: {
      type: fetchOrderByNumber.rejected.type,
      error: { message: 'Test Error Message' }
    },
    fulfilled: {
      type: fetchOrderByNumber.fulfilled.type,
      payload: { orders: [ORDER._id] }
    }
  };

  test('тест синхронного экшена fetchOrderByNumber.pending', () => {
    const receivedState = orderByNumberReducer(initialState, actions.pending);
    expect(receivedState.isLoading).toBeTruthy();
    expect(receivedState.error).toBeUndefined();
  });
  test('тест синхронного экшена fetchOrderByNumber.rejected', () => {
    const receivedState = orderByNumberReducer(initialState, actions.rejected);
    expect(receivedState.isLoading).toBeFalsy();
    expect(receivedState.error).toBe(actions.rejected.error.message);
  });
  test('тест синхронного экшена fetchOrderByNumber.fulfilled', () => {
    const receivedState = orderByNumberReducer(initialState, actions.fulfilled);
    expect(receivedState.isLoading).toBeFalsy();
    expect(receivedState.orders.length).toBe(1);
    expect(receivedState.orders[0]).toBe(actions.fulfilled.payload.orders[0]);
    expect(receivedState.error).toBeUndefined();
  });
});

describe('Тестирование селектора selectOrders', () => {
  test('получение заказов пользователя', () => {
    const initialState = {
      orders: ORDERS,
      isLoading: false,
      error: undefined
    };

    const receivedOrders = selectOrders({ orderByNumber: initialState });
    expect(receivedOrders).toEqual(ORDERS);
  });
});
