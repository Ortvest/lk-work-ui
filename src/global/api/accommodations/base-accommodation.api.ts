import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseAccommodationApi = createApi({
  reducerPath: 'accommodationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
  }),
  endpoints: () => ({}),
});
