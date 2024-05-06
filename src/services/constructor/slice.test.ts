import { expect, test, describe } from '@jest/globals';

import {
  addIngredients,
  ingredientsMoveUp,
  ingredientsMoveDown,
  ingredientRemove,
  selectConstructorBurger,
  burgerConstructorReducer,
  IBurgerConstructorSliceState,
  initialState
} from './slice';

import { CONSTRUCTOR_INGREDIENTS, INGREDIENTS } from '../../utils/testData';
import {
  EnhancedStore,
  StoreEnhancer,
  ThunkDispatch,
  Tuple,
  UnknownAction,
  configureStore
} from '@reduxjs/toolkit';

let initialStore: EnhancedStore<
  { burgerConstructor: IBurgerConstructorSliceState },
  UnknownAction,
  Tuple<
    [
      StoreEnhancer<{
        dispatch: ThunkDispatch<
          { burgerConstructor: IBurgerConstructorSliceState },
          undefined,
          UnknownAction
        >;
      }>,
      StoreEnhancer
    ]
  >
>;

beforeEach(() => {
  initialStore = configureStore({
    reducer: { burgerConstructor: burgerConstructorReducer },
    preloadedState: {
      burgerConstructor: {
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
      }
    }
  });
});

describe('тестирование редьюсера constructorSlice', () => {
  describe('тестирование экшена addIngredient', () => {
    test('добавление булки в пустое поле', () => {
      const receivedState = burgerConstructorReducer(
        initialState,
        addIngredients(INGREDIENTS[0])
      );

      const receivedBun = receivedState.constructorItems.bun;
      expect(receivedBun?._id).toEqual(INGREDIENTS[0]._id);
    });

    test('добавление ингредиента в массив ingredients', () => {
      expect(
        initialStore.getState().burgerConstructor.constructorItems.ingredients
          .length
      ).toEqual(3);

      const receivedState = burgerConstructorReducer(
        initialStore.getState().burgerConstructor,
        addIngredients(INGREDIENTS[4])
      );

      const receivedIngredient = receivedState.constructorItems.ingredients[3];
      expect(receivedState.constructorItems.ingredients.length).toEqual(4);
      expect(receivedIngredient._id).toEqual(INGREDIENTS[4]._id);
    });
  });

  describe('тестирование экшена removeIngredient', () => {
    const expectedResult = {
      ...initialState,
      constructorItems: {
        bun: CONSTRUCTOR_INGREDIENTS[0],
        ingredients: []
      }
    };

    test('удаление ингредиента из конструктора', () => {
      const receivedState = burgerConstructorReducer(
        initialStore.getState().burgerConstructor,
        ingredientRemove(CONSTRUCTOR_INGREDIENTS[1])
      );

      const receivedIngredients = receivedState.constructorItems.ingredients;
      const expectedIngredients = expectedResult.constructorItems.ingredients;
      expect(receivedIngredients).toEqual(expectedIngredients);
    });
  });

  describe('тестирование экшенов перемещения: ingredientsMoveUp и ingredientsMoveDown', () => {
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
      const receivedState = burgerConstructorReducer(
        initialStore.getState().burgerConstructor,
        ingredientsMoveUp(2)
      );
      const receivedIngredients = receivedState.constructorItems.ingredients;
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

      const receivedState = burgerConstructorReducer(
        initialStore.getState().burgerConstructor,
        ingredientsMoveDown(1)
      );
      const receivedIngredients = receivedState.constructorItems.ingredients;
      const expectedIngredients = expectedResult.constructorItems.ingredients;
      expect(receivedIngredients).toEqual(expectedIngredients);
    });
  });
});

describe('Тестирование селектора selectConstructorBurger', () => {
  test('получение ингридиентов', () => {
    const burgerConstructorState = selectConstructorBurger({
      burgerConstructor: initialStore.getState().burgerConstructor
    });
    expect(burgerConstructorState.constructorItems.bun).toEqual(
      CONSTRUCTOR_INGREDIENTS[0]
    );
    expect(burgerConstructorState.constructorItems.ingredients[0]).toEqual(
      CONSTRUCTOR_INGREDIENTS[1]
    );
  });
});
