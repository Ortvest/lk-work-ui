import { CommonReducer } from '@global/store/slices/Common.slice';

import { UserReducer as userReducer } from './slices/User.slice';
import { authApi } from '@global/api/auth/auth.api';
import { collectDataApi } from '@global/api/updateUserData/collectData.api';
import { uploadPhotoApi } from '@global/api/uploadPhoto/uploadPhoto.api';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    userReducer,
    CommonReducer,
    [authApi.reducerPath]: authApi.reducer,
    [collectDataApi.reducerPath]: collectDataApi.reducer,
    [uploadPhotoApi.reducerPath]: uploadPhotoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, collectDataApi.middleware, uploadPhotoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
