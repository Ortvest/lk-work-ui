import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseEmployeeApi = createApi({
  reducerPath: 'employeeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
  }),
  endpoints: () => ({}),
});
