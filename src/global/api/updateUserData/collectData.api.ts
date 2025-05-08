import { UserSlice } from '@global/store/slices/User.slice';

import { API_CONFIG } from '@global/api/api.constants';
import { baseCollectData } from '@global/api/updateUserData/base-collectData.api';
import { Address, JobInfo, UserEntity } from '@shared/interfaces/User.interfaces';

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
    collectUserJobInfo: builder.mutation<UserEntity, { jobInfo: JobInfo; employeeId: string }>({
      query: ({ jobInfo, employeeId }) => ({
        url: API_CONFIG.collectData(employeeId),
        method: 'PUT',
        body: { jobInfo: { ...jobInfo } },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log('Response data:', data);
          dispatch(setCurrentUser(data));
        } catch (error) {
          console.error('Failed to submit job info data:', error);
        }
      },
    }),
  }),
});

export const { useCollectUserAddressMutation, useCollectUserJobInfoMutation } = collectDataApi;
