import { expect, test, describe } from '@jest/globals';

import {
  clearOrderBurger,
  selectOrderBurger,
  burgerReducer,
  initialState
} from './slice';

import { fetchOrderBurger } from './action';

import { ORDER } from '../../utils/testData';
import { configureStore } from '@reduxjs/toolkit';

describe('тестирование редьюсера burgerReducer', () => {
  describe('тест для редьюсера clearOrderBurger', () => {
    const receivedStore = configureStore({
      reducer: { burger: burgerReducer },
      preloadedState: {
        burger: {
          burger: ORDER,
          isLoading: false,
          error: undefined
        }
      }
    });

    test('очистка данных о бургере', () => {
      const receivedState = burgerReducer(
        receivedStore.getState().burger,
        clearOrderBurger()
      );

      const { burger } = receivedState;
      expect(burger).toBeNull();
    });
  });

  describe('тестирование экшена fetchOrderBurger', () => {
    const actions = {
      pending: {
        type: fetchOrderBurger.pending.type,
        payload: null
      },
      rejected: {
        type: fetchOrderBurger.rejected.type,
        error: { message: 'Test Error Message' }
      },
      fulfilled: {
        type: fetchOrderBurger.fulfilled.type,
        payload: { order: ORDER }
      }
    };

    test('тест синхронного экшена fetchOrderBurger.pending', () => {
      const receivedState = burgerReducer(initialState, actions.pending);
      expect(receivedState.isLoading).toBeTruthy();
      expect(receivedState.error).toBeUndefined();
    });

    test('тест синхронного экшена fetchOrderBurger.rejected', () => {
      const receivedState = burgerReducer(initialState, actions.rejected);
      expect(receivedState.isLoading).toBeFalsy();
      expect(receivedState.burger).toBeNull();
      expect(receivedState.error).toBe(actions.rejected.error.message);
    });

    test('тест синхронного экшена fetchOrderBurger.fulfilled', () => {
      const receivedState = burgerReducer(initialState, actions.fulfilled);
      expect(receivedState.isLoading).toBeFalsy();
      expect(receivedState.burger?.number).toBe(
        actions.fulfilled.payload.order.number
      );
      expect(receivedState.error).toBeUndefined();
    });
  });
});

describe('Тестирование селектора selectOrderBurger', () => {
  test('получение данных о бургере для заказа', () => {
    const receivedStore = configureStore({
      reducer: { burger: burgerReducer },
      preloadedState: {
        burger: {
          burger: ORDER,
          isLoading: false,
          error: undefined
        }
      }
    });

    const receivedOrder = selectOrderBurger(receivedStore.getState());
    expect(receivedOrder).toEqual(ORDER);
  });
});
