
import { API_CONFIG } from '@global/api/api.constants';
import { baseAuthApi } from '@global/api/auth/base-auth.api';
import { UserSlice } from "@global/store/slices/User.slice";

const { setIsAuth, setCurrentUser} = UserSlice.actions;

export const authApi = baseAuthApi.injectEndpoints({
  endpoints: (builder) => ({
    authenticateUser: builder.mutation<any, any>({
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
    // registerUser: builder.mutation<AuthResponse, { username: string; email: string; password: string }>({
    //   query: ({ username, email, password }) => ({
    //     url: API_ENDPOINTS.AUTH_SIGN_UP,
    //     method: HttpMethods.POST,
    //     body: { username, email, password },
    //   }),
    //   async onQueryStarted(_, { dispatch, queryFulfilled }) {
    //     try {
    //       const { data } = await queryFulfilled;
    //       if (data.user) {
    //         dispatch(setUserData(data.user));
    //         dispatch(setAuthStatus(true));
    //       }
    //     } catch (error) {
    //       console.error('Registration failed:', error);
    //       dispatch(setAuthStatus(false));
    //       dispatch(setUserData({} as UserEntity));
    //     }
    //   },
    // }),
    // getMe: builder.query<{ data: UserEntity }, void>({
    //   query: () => ({
    //     url: API_ENDPOINTS.ME,
    //     method: HttpMethods.GET,
    //     credentials: 'include',
    //   }),
    //   async onQueryStarted(_, { dispatch, queryFulfilled }) {
    //     try {
    //       const { data } = await queryFulfilled;
    //       if (data) {
    //         dispatch(setUserData(data.data));
    //         dispatch(setAuthStatus(true));
    //       }
    //     } catch (error) {
    //       console.error('Failed to fetch user data:', error);
    //       dispatch(setAuthStatus(false));
    //       dispatch(setUserData({} as UserEntity));
    //     }
    //   },
    // }),
  }),
});

export const { useAuthenticateUserMutation } = authApi;
