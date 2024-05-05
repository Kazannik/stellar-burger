import { expect, test, describe } from '@jest/globals';

import {
  addIngredients,
  ingredientsMoveUp,
  ingredientsMoveDown,
  ingredientRemove,
  selectConstructorBurger,
  burgerConstructorReducer,
  IBurgerConstructorSliceState
} from './slice';

import { CONSTRUCTOR_INGREDIENTS, INGREDIENTS } from '../../utils/testData';

describe('тестирование редьюсера constructorSlice', () => {
  describe('тестирование экшена addIngredient', () => {
    test('добавление ингредиента в массив ingredients', () => {
      const initialState: IBurgerConstructorSliceState = {
        constructorItems: {
          bun: CONSTRUCTOR_INGREDIENTS[0],
          ingredients: [
            CONSTRUCTOR_INGREDIENTS[1],
            CONSTRUCTOR_INGREDIENTS[2],
            CONSTRUCTOR_INGREDIENTS[3]
          ]
        },
        isIngredientsLoading: false,
        error: null
      };

      const newState = burgerConstructorReducer(
        initialState,
        addIngredients(INGREDIENTS[4])
      );

      const receivedIngredient = newState.constructorItems.ingredients[3];
      expect(receivedIngredient._id).toEqual(INGREDIENTS[4]._id);
    });

    test('добавление булки в пустое поле', () => {
      const initialState: IBurgerConstructorSliceState = {
        constructorItems: {
          bun: null,
          ingredients: []
        },
        isIngredientsLoading: false,
        error: null
      };

      const newState = burgerConstructorReducer(
        initialState,
        addIngredients(INGREDIENTS[0])
      );

      const receivedBun = newState.constructorItems.bun;
      expect(receivedBun?._id).toEqual(INGREDIENTS[0]._id);
    });
  });

  describe('тестирование экшена removeIngredient', () => {
    const initialState: IBurgerConstructorSliceState = {
      constructorItems: {
        bun: CONSTRUCTOR_INGREDIENTS[0],
        ingredients: [CONSTRUCTOR_INGREDIENTS[1]]
      },
      isIngredientsLoading: false,
      error: null
    };

    const expectedResult = {
      ...initialState,
      constructorItems: {
        bun: CONSTRUCTOR_INGREDIENTS[0],
        ingredients: []
      }
    };

    test('удаление ингредиента из конструктора', () => {
      const newState = burgerConstructorReducer(
        initialState,
        ingredientRemove(CONSTRUCTOR_INGREDIENTS[1])
      );

      const receivedIngredients = newState.constructorItems.ingredients;
      const expectedIngredients = expectedResult.constructorItems.ingredients;
      expect(receivedIngredients).toEqual(expectedIngredients);
    });
  });

  describe('тестирование экшенов перемещения: ingredientsMoveUp и ingredientsMoveDown', () => {
    const initialState: IBurgerConstructorSliceState = {
      constructorItems: {
        bun: CONSTRUCTOR_INGREDIENTS[0],
        ingredients: [
          CONSTRUCTOR_INGREDIENTS[1],
          CONSTRUCTOR_INGREDIENTS[2],
          CONSTRUCTOR_INGREDIENTS[3]
        ]
      },
      isIngredientsLoading: false,
      error: null
    };

    test('перемещение ингредиента на позицию выше', () => {
      const expectedResult = {
        ...initialState,
        constructorItems: {
          bun: CONSTRUCTOR_INGREDIENTS[0],
          ingredients: [
            CONSTRUCTOR_INGREDIENTS[1],
            CONSTRUCTOR_INGREDIENTS[3],
            CONSTRUCTOR_INGREDIENTS[2]
          ]
        }
      };
      const newState = burgerConstructorReducer(
        initialState,
        ingredientsMoveUp(2)
      );
      const receivedIngredients = newState.constructorItems.ingredients;
      const expectedIngredients = expectedResult.constructorItems.ingredients;
      expect(receivedIngredients).toEqual(expectedIngredients);
    });

    test('перемещение ингредиента на позицию ниже', () => {
      const expectedResult = {
        ...initialState,
        constructorItems: {
          bun: CONSTRUCTOR_INGREDIENTS[0],
          ingredients: [
            CONSTRUCTOR_INGREDIENTS[1],
            CONSTRUCTOR_INGREDIENTS[3],
            CONSTRUCTOR_INGREDIENTS[2]
          ]
        }
      };

      const newState = burgerConstructorReducer(
        initialState,
        ingredientsMoveDown(1)
      );
      const receivedIngredients = newState.constructorItems.ingredients;
      const expectedIngredients = expectedResult.constructorItems.ingredients;
      expect(receivedIngredients).toEqual(expectedIngredients);
    });
  });
});

describe('Тестирование селектора selectConstructorBurger', () => {
  test('получение ингридиентов', () => {
    const initialState: IBurgerConstructorSliceState = {
      constructorItems: {
        bun: CONSTRUCTOR_INGREDIENTS[0],
        ingredients: [
          CONSTRUCTOR_INGREDIENTS[1],
          CONSTRUCTOR_INGREDIENTS[2],
          CONSTRUCTOR_INGREDIENTS[3]
        ]
      },
      isIngredientsLoading: false,
      error: null
    };

    const burgerConstructorState = selectConstructorBurger({
      burgerConstructor: initialState
    });
    expect(burgerConstructorState.constructorItems.bun).toEqual(
      CONSTRUCTOR_INGREDIENTS[0]
    );
    expect(burgerConstructorState.constructorItems.ingredients[0]).toEqual(
      CONSTRUCTOR_INGREDIENTS[1]
    );
  });
});
