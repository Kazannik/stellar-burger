import { expect, test, describe } from '@jest/globals';

import { selectIngredients, ingredientsReducer } from './slice';

import { fetchIngredients } from './action';
import { INGREDIENTS } from '../../utils/testData';

describe('тестирование редьюсера ingredientsReducer', () => {
  describe('тестирование асинхронного экшена fetchIngredients', () => {
    const initialState = {
      ingredients: INGREDIENTS,
      isLoading: false,
      error: undefined
    };

    const actions = {
      pending: {
        type: fetchIngredients.pending.type,
        payload: null
      },
      rejected: {
        type: fetchIngredients.rejected.type,
        error: { message: 'Test Error Message' }
      },
      fulfilled: {
        type: fetchIngredients.fulfilled.type,
        payload: [INGREDIENTS[0], INGREDIENTS[1]]
      }
    };

    test('тест синхронного экшена fetchIngredients.pending', () => {
      const receivedState = ingredientsReducer(initialState, actions.pending);
      expect(receivedState.isLoading).toBeTruthy();
      expect(receivedState.error).toBeUndefined();
    });

    test('тест синхронного экшена fetchIngredients.rejected', () => {
      const receivedState = ingredientsReducer(initialState, actions.rejected);
      expect(receivedState.isLoading).toBeFalsy();
      expect(receivedState.error).toBe(actions.rejected.error.message);
    });

    test('тест синхронного экшена fetchIngredients.fulfilled', () => {
      const receivedState = ingredientsReducer(initialState, actions.fulfilled);
      expect(receivedState.isLoading).toBeFalsy();
      expect(receivedState.ingredients).toEqual(actions.fulfilled.payload);
    });
  });
});

describe('Тестирование селектора selectIngredients', () => {
  test('получение ингридиентов', () => {
    const initialState = {
      ingredients: INGREDIENTS,
      isLoading: false,
      error: undefined
    };

    const receivedIngredients = selectIngredients({
      ingredients: initialState
    });
    expect(receivedIngredients).toEqual(INGREDIENTS);
  });
});
