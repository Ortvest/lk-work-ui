import { UserReducer as userReducer } from './slices/User.slice';
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '@global/api/auth/auth.api';

export const store = configureStore({
  reducer: {
    userReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
