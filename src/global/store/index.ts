import { AccommodationReducer as accommodationReducer } from '@global/store/slices/Accommodation.slice';
import { CommonReducer } from '@global/store/slices/Common.slice';
import { EmployeeReducer as employeeReducer } from '@global/store/slices/Employee.slice';
import { UserReducer as userReducer } from '@global/store/slices/User.slice';
import { workAssetReducer } from '@global/store/slices/WorkAssets.slice';
import { WorkCompanyReducer as workCompanyReducer } from '@global/store/slices/WorkCompany.slice';

import { accommodationApi } from '@global/api/accommodations/accommodation.api';
import { authApi } from '@global/api/auth/auth.api';
import { employeeApi } from '@global/api/employee/employee.api';
import { pdfApi } from '@global/api/pdf/pdf.api';
import { collectDataApi } from '@global/api/updateUserData/collectData.api';
import { uploadPhotoApi } from '@global/api/uploadPhoto/uploadPhoto.api';
import { workCompanyApi } from '@global/api/work-company/work-company.api';
import { workAssetsApi } from '@global/api/workAssets/workAssets';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    userReducer,
    employeeReducer,
    workAssetReducer,
    CommonReducer,
    accommodationReducer,
    workCompanyReducer,
    [authApi.reducerPath]: authApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [collectDataApi.reducerPath]: collectDataApi.reducer,
    [uploadPhotoApi.reducerPath]: uploadPhotoApi.reducer,
    [accommodationApi.reducerPath]: accommodationApi.reducer,
    [workCompanyApi.reducerPath]: workCompanyApi.reducer,
    [pdfApi.reducerPath]: pdfApi.reducer,
    [workAssetsApi.reducerPath]: workAssetsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(employeeApi.middleware)
      .concat(collectDataApi.middleware)
      .concat(uploadPhotoApi.middleware)
      .concat(accommodationApi.middleware)
      .concat(workCompanyApi.middleware)
      .concat(pdfApi.middleware)
      .concat(workAssetsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
