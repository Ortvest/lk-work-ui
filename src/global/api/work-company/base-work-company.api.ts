import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseWorkCompanyApi = createApi({
  reducerPath: 'workCompanyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
  }),
  endpoints: () => ({}),
});
