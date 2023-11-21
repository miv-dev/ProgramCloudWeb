import { createApi } from '@reduxjs/toolkit/query/react';
import { LoginInput } from '../../pages/Login';
import customFetchBase from './customFetchBase';
import { userApi } from './userApi';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    loginUser: builder.mutation<
      { access_token: string; status: string },
      LoginInput>({
      query(data) {
        return {
          url: 'auth/login',
          method: 'POST',
          body: data,
          credentials: 'include',
        };
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (error) {}
      },
    }),
    logoutUser: builder.mutation<void, void>({
      query() {
        return {
          url: 'auth/logout',
          credentials: 'include',
        };
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLogoutUserMutation,
} = authApi;