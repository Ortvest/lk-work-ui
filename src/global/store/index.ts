import { UserReducer as userReducer } from './slices/User.slice';
import { EmployeeReducer as employeeReducer } from './slices/Employee.slice';
import { authApi } from '@global/api/auth/auth.api';
import { configureStore } from '@reduxjs/toolkit';
import { employeeApi } from '@global/api/employee/employee.api';

export const store = configureStore({
  reducer: {
    userReducer,
    employeeReducer,
    [authApi.reducerPath]: authApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware).concat(employeeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
