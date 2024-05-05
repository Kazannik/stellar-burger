import store, { rootReducer } from '../services/store';

test('Проверка настройки и работы rootReducer', () => {
  const received = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
  expect(received).toEqual(store.getState());
});
