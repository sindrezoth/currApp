import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import authReducer from '../features/auth/authSlice'
import clientReducer from '../features/clients/clientSlice.js'
import { apiSlice } from './api/apiSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        client: clientReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

setupListeners(store.dispatch)
