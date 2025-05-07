import { UserSlice } from '@global/store/slices/User.slice';

import { API_CONFIG } from '@global/api/api.constants';
import { baseCollectData } from '@global/api/updateUserData/base-collectData.api';
import { Address, UserEntity } from '@shared/interfaces/User.interfaces';

const { setCurrentUser } = UserSlice.actions;

export const collectDataApi = baseCollectData.injectEndpoints({
  endpoints: (builder) => ({
    collectUserAddress: builder.mutation<UserEntity, { address: Address; employeeId: string }>({
      query: ({ address, employeeId }) => ({
        url: API_CONFIG.collectData(employeeId),
        method: 'PUT',
        body: { address: { ...address } },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log('Response data:', data);
          dispatch(setCurrentUser(data));
        } catch (error) {
          console.error('Failed to submit address data:', error);
        }
      },
    }),
  }),
});

export const { useCollectUserAddressMutation } = collectDataApi;
