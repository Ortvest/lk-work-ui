import { CommonReducer } from '@global/store/slices/Common.slice';
import { EmployeeReducer as employeeReducer } from '@global/store/slices/Employee.slice';
import { UserReducer as userReducer } from '@global/store/slices/User.slice';

import { authApi } from '@global/api/auth/auth.api';
import { employeeApi } from '@global/api/employee/employee.api';
import { collectDataApi } from '@global/api/updateUserData/collectData.api';
import { uploadPhotoApi } from '@global/api/uploadPhoto/uploadPhoto.api';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    userReducer,
    employeeReducer,
    CommonReducer,
    [authApi.reducerPath]: authApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [collectDataApi.reducerPath]: collectDataApi.reducer,
    [uploadPhotoApi.reducerPath]: uploadPhotoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(employeeApi.middleware)
      .concat(collectDataApi.middleware)
      .concat(uploadPhotoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
