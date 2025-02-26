import { UserReducer as userReducer } from './slices/test.slice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
