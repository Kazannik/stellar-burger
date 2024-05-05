import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';

import { selectUserData, authReducer } from './slice';

import {
  fetchGetUser,
  fetchLoginUser,
  fetchLogoutUser,
  fetchRegisterUser,
  fetchUpdateUser
} from './action';

describe('Тестирование редьюсера authReducer', () => {
  const initialState = {
    isAuthenticated: false,
    data: {
      name: 'TestName',
      email: 'TestEmail'
    },
    error: undefined,
    loginUserRequest: false
  };

  describe('Тестирование асинхронного экшена fetchGetUser', () => {
    const actions = {
      pending: {
        type: fetchGetUser.pending.type,
        payload: null
      },
      rejected: {
        type: fetchGetUser.rejected.type,
        error: { message: 'Test Error Message' }
      },
      fulfilled: {
        type: fetchGetUser.fulfilled.type,
        payload: { user: { name: 'TestName', email: 'TestEmail' } }
      }
    };

    test('тест синхронного экшена fetchGetUser.pending', () => {
      const state = authReducer(initialState, actions.pending);
      expect(state.isAuthenticated).toBe(false);
      expect(state.loginUserRequest).toBe(true);
      expect(state.error).toBeUndefined();
    });

    test('тест синхронного экшена fetchGetUser.rejected', () => {
      const state = authReducer(initialState, actions.rejected);
      expect(state.isAuthenticated).toBe(false);
      expect(state.loginUserRequest).toBe(false);
      expect(state.error).toBe('Test Error Message');
    });

    test('тест синхронного экшена fetchGetUser.fulfilled', () => {
      const state = authReducer(initialState, actions.fulfilled);
      expect(state.isAuthenticated).toBe(false);
      expect(state.loginUserRequest).toBe(false);
      expect(state.data).toEqual(actions.fulfilled.payload.user);
      expect(state.error).toBeUndefined();
    });
  });

  describe('тестирование асинхронного POST экшена registerUser', () => {
    const actions = {
      pending: {
        type: fetchRegisterUser.pending.type,
        payload: null
      },
      rejected: {
        type: fetchRegisterUser.rejected.type,
        error: { message: 'Test Error Message' }
      },
      fulfilled: {
        type: fetchRegisterUser.fulfilled.type,
        payload: { user: { name: 'TestName', email: 'TestEmail' } }
      }
    };

    test('тест синхронного экшена fetchRegisterUser.pending', () => {
      const state = authReducer(initialState, actions.pending);
      expect(state.isAuthenticated).toBe(false);
      expect(state.loginUserRequest).toBe(false);
      expect(state.error).toBeUndefined();
    });

    test('тест синхронного экшена fetchRegisterUser.rejected', () => {
      const state = authReducer(initialState, actions.rejected);
      expect(state.isAuthenticated).toBe(false);
      expect(state.loginUserRequest).toBe(false);
      expect(state.error).toBe('Test Error Message');
    });

    test('тест синхронного экшена fetchRegisterUser.fulfilled', () => {
      const state = authReducer(initialState, actions.fulfilled);
      expect(state.isAuthenticated).toBe(true);
      expect(state.loginUserRequest).toBe(false);
      expect(state.data).toEqual(actions.fulfilled.payload.user);
      expect(state.error).toBeUndefined();
    });
  });

  describe('тестирование асинхронного POST экшена fetchLoginUser', () => {
    const actions = {
      pending: {
        type: fetchLoginUser.pending.type,
        payload: null
      },
      rejected: {
        type: fetchLoginUser.rejected.type,
        error: { message: 'Test Error Message' }
      },
      fulfilled: {
        type: fetchLoginUser.fulfilled.type,
        payload: { user: { name: 'TestName', email: 'TestEmail' } }
      }
    };

    test('тест синхронного экшена fetchLoginUser.pending', () => {
      const state = authReducer(initialState, actions.pending);
      expect(state.isAuthenticated).toBe(false);
      expect(state.loginUserRequest).toBe(false);
      expect(state.error).toBeUndefined();
    });

    test('тест синхронного экшена loginUser.rejected', () => {
      const state = authReducer(initialState, actions.rejected);
      expect(state.isAuthenticated).toBe(false);
      expect(state.loginUserRequest).toBe(false);
      expect(state.error).toBe('Test Error Message');
    });

    test('тест синхронного экшена loginUser.fulfilled', () => {
      const state = authReducer(initialState, actions.fulfilled);
      expect(state.isAuthenticated).toBe(true);
      expect(state.loginUserRequest).toBe(false);
      expect(state.data.email).toEqual(actions.fulfilled.payload.user.email);
      expect(state.error).toBeUndefined();
    });
  });

  describe('тестирование асинхронного PATCH экшена fetchUpdateUser', () => {
    const actions = {
      pending: {
        type: fetchUpdateUser.pending.type,
        payload: null
      },
      rejected: {
        type: fetchUpdateUser.rejected.type,
        error: { message: 'Test Error Message' }
      },
      fulfilled: {
        type: fetchUpdateUser.fulfilled.type,
        payload: { user: { name: 'TestName', email: 'TestEmail' } }
      }
    };

    test('тест синхронного экшена fetchUpdateUser.pending', () => {
      const state = authReducer(initialState, actions.pending);
      expect(state.isAuthenticated).toBe(false);
      expect(state.loginUserRequest).toBe(true);
      expect(state.error).toBeUndefined();
    });

    test('тест синхронного экшена fetchUpdateUser.rejected', () => {
      const state = authReducer(initialState, actions.rejected);
      expect(state.isAuthenticated).toBe(false);
      expect(state.loginUserRequest).toBe(true);
      expect(state.error).toBe('Test Error Message');
    });

    test('тест синхронного экшена fetchUpdateUser.fulfilled', () => {
      const state = authReducer(initialState, actions.fulfilled);
      expect(state.isAuthenticated).toBe(true);
      expect(state.loginUserRequest).toBe(false);
      expect(state.data).toEqual(actions.fulfilled.payload.user);
      expect(state.error).toBeUndefined();
    });
  });

  describe('тестирование асинхронного POST экшена fetchLogoutUser', () => {
    const actions = {
      pending: {
        type: fetchLogoutUser.pending.type,
        payload: null
      },
      rejected: {
        type: fetchLogoutUser.rejected.type,
        error: { message: 'Test Error Message' }
      },
      fulfilled: {
        type: fetchLogoutUser.fulfilled.type,
        payload: null
      }
    };

    test('тест синхронного экшена fetchLogoutUser.pending', () => {
      const receivedState = authReducer(initialState, actions.pending);
      expect(receivedState.isAuthenticated).toBeFalsy();
      expect(receivedState.loginUserRequest).toBeTruthy();
      expect(receivedState.error).toBeUndefined();
    });

    test('тест синхронного экшена fetchLogoutUser.rejected', () => {
      const receivedState = authReducer(initialState, actions.rejected);
      expect(receivedState.isAuthenticated).toBeFalsy();
      expect(receivedState.loginUserRequest).toBeTruthy();
      expect(receivedState.error).toBe('Test Error Message');
    });

    test('тест синхронного экшена fetchLogoutUser.fulfilled', () => {
      const receivedState = authReducer(initialState, actions.fulfilled);
      expect(receivedState.isAuthenticated).toBeTruthy();
      expect(receivedState.loginUserRequest).toBeFalsy();
      expect(receivedState.data.name).toBe('TestName');
      expect(receivedState.data.email).toBe('TestEmail');
      expect(receivedState.error).toBeUndefined();
    });
  });
});

describe('Тестирование селектора selectUserData', () => {
  test('получение данных пользователя', () => {
    const store = configureStore({
      reducer: {
        auth: authReducer
      },
      preloadedState: {
        auth: {
          isAuthenticated: true,
          data: {
            name: 'TestName',
            email: 'TestEmail'
          },
          loginUserRequest: false
        }
      }
    });

    const receivedUser = selectUserData(store.getState());
    expect(receivedUser).toEqual({ email: 'TestEmail', name: 'TestName' });
  });
});
