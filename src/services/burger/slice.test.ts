import { expect, test, describe } from '@jest/globals';

import { clearOrderBurger, selectOrderBurger, burgerReducer } from './slice';

import { fetchOrderBurger } from './action';

import { ORDER } from '../../utils/testData';

describe('тестирование редьюсера burgerReducer', () => {
  describe('тест для редьюсера clearOrderBurger', () => {
    const initialOrderState = {
      burger: ORDER,
      isLoading: false,
      error: undefined
    };

    test('очистка данных о бургере', () => {
      const newState = burgerReducer(initialOrderState, clearOrderBurger());

      const { burger } = newState;
      expect(burger).toBeNull();
    });
  });

  describe('тестирование экшена fetchOrderBurger', () => {
    const newState = {
      burger: ORDER,
      isLoading: false,
      error: undefined
    };

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
      const receivedState = burgerReducer(newState, actions.pending);
      expect(receivedState.isLoading).toBeTruthy();
      expect(receivedState.error).toBeUndefined();
    });

    test('тест синхронного экшена fetchOrderBurger.rejected', () => {
      const receivedState = burgerReducer(newState, actions.rejected);
      expect(receivedState.isLoading).toBeFalsy();
      expect(receivedState.burger).toBe(actions.fulfilled.payload.order);
      expect(receivedState.error).toBe(actions.rejected.error.message);
    });

    test('тест синхронного экшена fetchOrderBurger.fulfilled', () => {
      const receivedState = burgerReducer(newState, actions.fulfilled);
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
    const newState = {
      burger: ORDER,
      isLoading: false,
      error: undefined
    };

    const receivedOrder = selectOrderBurger({ burger: newState });
    expect(receivedOrder).toEqual(ORDER);
  });
});
