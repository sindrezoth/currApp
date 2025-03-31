import { apiSlice } from "../../app/api/apiSlice";
import { setClient } from './clientSlice.js';

export const clientApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getClientAccountDetails: builder.mutation({
      query: () => ({
        url: '/account',
        method: 'GET',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setClient({data}));
        } catch (err) {
          console.log(err)
        }
      }
    }),
    updateClientAccount: builder.mutation({
      query: account => ({
        url: '/account',
        method: 'PATCH',
        body: { ...account }
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setClient({ data }));
        } catch (err) {
          console.log(err)
        }
      }
    }),
    //sendLogout: builder.mutation({
    //  query: () => ({
    //    url: '/account/logout',
    //    method: 'POST',
    //  }),
    //  async onQueryStarted(arg, { dispatch, queryFulfilled }) {
    //    try {
    //      const { data } = await queryFulfilled
    //      console.log(data)
    //      dispatch(logOut())
    //      setTimeout(() => {
    //        dispatch(apiSlice.util.resetApiState())
    //      }, 2000)
    //    } catch (err) {
    //      console.log(err)
    //    }
    //  }
    //}),
    //refresh: builder.mutation({
    //  query: () => ({
    //    url: '/account/refresh',
    //    method: 'GET',
    //  }),
    //  async onQueryStarted(arg, { dispatch, queryFulfilled }) {
    //    try {
    //      const { data } = await queryFulfilled
    //      const { accessToken } = data
    //      dispatch(setCredentials({ accessToken }))
    //    } catch (err) {
    //      console.log(err)
    //    }
    //  }
    //}),
  })
});

export const {
  useGetClientAccountDetailsMutation,
  useUpdateClientAccountMutation,
  useSendLogoutMutation,
  useRefreshMutation,
} = clientApiSlice ;
