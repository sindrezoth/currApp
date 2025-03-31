import {
  createSelector,
  createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const scriptsAdapter = createEntityAdapter({})

const initialState = scriptsAdapter.getInitialState()

export const scriptsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getScripts: builder.query({
      query: () => ({
        url: '/scripts',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        },
      }),
      transformResponse: responseData => {
        const loadedScripts = responseData.map(script => {
          script.id = script._id
          return script
        });
        return scriptsAdapter.setAll(initialState, loadedScripts)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Script', id: 'LIST' },
            ...result.ids.map(id => ({ type: 'Script', id }))
          ]
        } else return [{ type: 'Script', id: 'LIST' }]
      }
    }),
    registerScript: builder.mutation({
      query: initialScriptData => ({
        url: '/register',
        method: 'POST',
        body: {
          ...initialScriptData,
        }
      }),
      invalidatesTags: [
        { type: 'Script', id: "LIST" }
      ]
    }),
    addNewScript: builder.mutation({
      query: initialScriptData => ({
        url: '/scripts',
        method: 'POST',
        body: {
          ...initialScriptData,
        }
      }),
      invalidatesTags: [
        { type: 'Script', id: "LIST" }
      ]
    }),
    updateScript: builder.mutation({
      query: initialScriptData => ({
        url: '/scripts',
        method: 'PATCH',
        body: {
          ...initialScriptData,
        }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Script', id: arg.id }
      ]
    }),
    deleteScript: builder.mutation({
      query: ({ id }) => ({
        url: `/scripts`,
        method: 'DELETE',
        body: { id }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Script', id: arg.id }
      ]
    }),
  }),
})

export const {
  useGetScriptsQuery,
  useRegisterScriptMutation,
  useAddNewScriptMutation,
  useUpdateScriptMutation,
  useDeleteScriptMutation,
} = scriptsApiSlice;

export const selectScriptsResult = scriptsApiSlice.endpoints.getScripts.select();

const selectScriptsData = createSelector(
  selectScriptsResult,
  scriptsResult => scriptsResult.data // normalized state object with ids & entities
);

export const {
  selectAll: selectAllScripts,
  selectById: selectScriptById,
  selectIds: selectScriptIds
} = scriptsAdapter.getSelectors(state => selectScriptsData(state) ?? initialState);
