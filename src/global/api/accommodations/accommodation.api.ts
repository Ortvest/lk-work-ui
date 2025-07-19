import { AccommodationSlice } from '@global/store/slices/Accommodation.slice';

import { baseAccommodationApi } from '@global/api/accommodations/base-accommodation.api';
import { API_CONFIG } from '@global/api/api.constants';
import { AddAccommodation } from '@shared/interfaces/Accommodation.interfaces';

const { setAccommodations } = AccommodationSlice.actions;
export const accommodationApi = baseAccommodationApi.injectEndpoints({
  endpoints: (builder) => ({
    createAccommodation: builder.mutation<boolean, AddAccommodation>({
      query: ({ address, name, price }) => ({
        url: API_CONFIG.addAccommodations(),
        method: 'POST',
        body: { address, name, price },
      }),
    }),
    getAllAccommodations: builder.query({
      query: () => ({
        url: API_CONFIG.getAllAccommodations(),
        method: 'GET',
        credentials: 'include',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAccommodations(data));
        } catch (error) {
          console.error('Failed to fetch accommodations data:', error);
        }
      },
    }),
  }),
});

export const { useGetAllAccommodationsQuery, useCreateAccommodationMutation, useLazyGetAllAccommodationsQuery } =
  accommodationApi;
