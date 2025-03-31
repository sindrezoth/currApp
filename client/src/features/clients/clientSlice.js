import { createSlice } from '@reduxjs/toolkit'

const clientSlice = createSlice({
  name: 'client',
  initialState: { email: null, phone: null, country: null, wallet: null, firstname: null, lastname: null, traderId: null},
  reducers: {
    setClient: (state, action) => {
      const { phone, country, email, wallet, firstname, lastname, traderId, invested } = action.payload.data;
      state.phone = phone;
      state.country = country;
      state.email = email;
      state.wallet = wallet;
      state.firstname = firstname;
      state.lastname = lastname;
      state.traderId = traderId;
      state.invested = invested;
    }
  }
})

export const { setClient } = clientSlice.actions

export default clientSlice.reducer

export const selectClient = (state) => state.client
