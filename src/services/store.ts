import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { authReducer } from './auth/slice';
import { burgerConstructorReducer } from './constructor/slice';
import { feedsReducer } from './feeds/slice';
import { ingredientsReducer } from './ingredient/slice';
import { orderByNumberReducer } from './orderByNumber/slice';
import { burgerReducer } from './burger/slice';
import { userOrderReducer } from './orders/slice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  burger: burgerReducer,
  feeds: feedsReducer,
  orderByNumber: orderByNumberReducer,
  userOrders: userOrderReducer,
  auth: authReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
