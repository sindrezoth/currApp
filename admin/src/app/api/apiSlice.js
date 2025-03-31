import { setCredentials } from '../../features/auth/authSlice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  //baseUrl: 'http://localhost:3568/api/',
  baseUrl: 'http://194.102.104.92:3568/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result;
  try {
    result = await baseQuery(args, api, extraOptions);
  }
  catch(err){
    console.log('err', err);
  }

  if (result?.error?.status === 403) {
    console.log('sending refresh token');

    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);

    if (refreshResult?.data) {
      api.dispatch(setCredentials({ ...refreshResult.data }));

      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "Your login has expired.";
      }

      return refreshResult;
    }
  }

  return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Note', 'User', 'Client', 'Admin'],
    endpoints: builder => ({})
});
