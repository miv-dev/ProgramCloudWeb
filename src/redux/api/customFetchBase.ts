import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { logout, setToken } from "../features/userSlice";
import { RootState } from "../store";
import { ITokenSession } from "./types";

const baseUrl = `http://program.cloud.api.miv-dev.ru/`;
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl
})

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  const rootState = api.getState() as RootState;
  if (result.meta?.response?.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshToken = rootState.userState?.token?.refreshToken ?? ""

        const refreshResult = await baseQuery(
          { url: 'auth/refresh',  body: {"refreshToken": refreshToken} },
          api,
          extraOptions,

        );

        if (refreshResult.data) {
          // Retry the initial query
          api.dispatch(setToken(refreshResult.data as ITokenSession))
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
          window.location.href = '/login';
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export default customFetchBase;