import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const basePdfApi = createApi({
  reducerPath: 'pdfApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
  }),
  endpoints: () => ({}),
});
