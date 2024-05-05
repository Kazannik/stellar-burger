import { expect, test, describe } from '@jest/globals';

import {
  selectFeeds,
  selectTotal,
  selectTotalToday,
  feedsReducer
} from './slice';

import { fetchFeeds } from './action';
import { ORDERS } from '../../utils/testData';

describe('тестирование редьюсера feedsReducer', () => {
  describe('тестирование асинхронного экшена fetchFeeds', () => {
    const initialState = {
      feeds: ORDERS,
      isLoading: false,
      total: 0,
      totalToday: 0,
      error: undefined
    };

    const actions = {
      pending: {
        type: fetchFeeds.pending.type,
        payload: null
      },
      rejected: {
        type: fetchFeeds.rejected.type,
        error: { message: 'Test Error Message' }
      },
      fulfilled: {
        type: fetchFeeds.fulfilled.type,
        payload: { orders: [ORDERS[0], ORDERS[1]] }
      }
    };

    test('тест синхронного экшена fetchFeeds.pending', () => {
      const receivedState = feedsReducer(initialState, actions.pending);
      expect(receivedState.isLoading).toBeTruthy();
      expect(receivedState.error).toBeUndefined();
    });

    test('тест синхронного экшена fetchFeeds.rejected', () => {
      const receivedState = feedsReducer(initialState, actions.rejected);
      expect(receivedState.isLoading).toBeFalsy();
      expect(receivedState.error).toBe(actions.rejected.error.message);
    });

    test('тест синхронного экшена fetchFeeds.fulfilled', () => {
      const receivedState = feedsReducer(initialState, actions.fulfilled);
      expect(receivedState.isLoading).toBeFalsy();
      expect(receivedState.feeds).toEqual(actions.fulfilled.payload.orders);
    });
  });
});

describe('Тестирование селекторов', () => {
  const initialState = {
    feeds: ORDERS,
    isLoading: false,
    total: 1000,
    totalToday: 800,
    error: undefined
  };

  describe('Тестирование селектора selectFeeds', () => {
    test('получение заказов', () => {
      const receivedOrders = selectFeeds({ feeds: initialState });
      expect(receivedOrders).toEqual(ORDERS);
    });
  });

  describe('Тестирование селектора selectTotal', () => {
    test('получение суммы заказов', () => {
      const receivedTotal = selectTotal({ feeds: initialState });
      expect(receivedTotal).toEqual(1000);
    });
  });

  describe('Тестирование селектора selectTotalToday', () => {
    test('получение суммы заказов за день', () => {
      const receivedTotalToday = selectTotalToday({ feeds: initialState });
      expect(receivedTotalToday).toEqual(800);
    });
  });
});
