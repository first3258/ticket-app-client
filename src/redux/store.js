import { configureStore } from "@reduxjs/toolkit"
import ticketSlice from './slice/ticketSlice'

export const store = configureStore({
  reducer: {
    ticket: ticketSlice,
  }
})