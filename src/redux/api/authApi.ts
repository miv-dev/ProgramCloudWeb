import { createApi } from '@reduxjs/toolkit/query/react';
import { LoginInput } from '../../pages/Login';
import { setToken } from '../features/userSlice';
import customFetchBase from './customFetchBase';
import { userApi } from './userApi';
import {ITokenSession} from "./types";

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    loginUser: builder.mutation<
     { data:  { accessToken: string; refreshToken: string }, success: boolean},
      LoginInput>({
        query(data) {
          return {
            url: 'auth/login',
            method: 'POST',
            body: data,
          };
          },
        async onQueryStarted(_args, { dispatch, queryFulfilled }) {
          try {
            let result = await queryFulfilled;
            dispatch(setToken(result.data.data as ITokenSession))
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