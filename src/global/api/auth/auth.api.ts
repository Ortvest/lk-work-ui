import { UserSlice } from '@global/store/slices/User.slice';

import { API_CONFIG } from '@global/api/api.constants';
import { baseAuthApi } from '@global/api/auth/base-auth.api';
import { UserEntity, UserSignInData } from '@shared/interfaces/User.interfaces';

const { setIsAuth, setCurrentUser } = UserSlice.actions;

export const authApi = baseAuthApi.injectEndpoints({
  endpoints: (builder) => ({
    authenticateUser: builder.mutation<UserEntity, UserSignInData>({
      query: ({ email, password }) => ({
        url: API_CONFIG.signIn(),
        method: 'POST',
        body: { email, password },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setIsAuth(true));
          dispatch(setCurrentUser(data));
        } catch (error) {
          console.error('Authentication failed:', error);
        }
      },
    }),
    getMe: builder.query<UserEntity, void>({
      query: () => ({
        url: API_CONFIG.authMe(),
        method: 'GET',
        credentials: 'include',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(setCurrentUser(data));
            dispatch(setIsAuth(true));
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      },
    }),
  }),
});

export const { useAuthenticateUserMutation, useGetMeQuery } = authApi;
