import { apiSlice } from "../../app/api/apiSlice";

export const clientApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getClientAccountDetails: builder.mutation({
      query: () => ({
        url: '/clients',
        method: 'GET',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log(data);
        } catch (err) {
          console.log(err)
        }
      }
    }),
    //login: builder.mutation({
    //  query: credentials => ({
    //    url: '/account',
    //    method: 'POST',
    //    body: { ...credentials }
    //  })
    //}),
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
  useLoginMutation,
  useSendLogoutMutation,
  useRefreshMutation,
} = clientApiSlice ;
