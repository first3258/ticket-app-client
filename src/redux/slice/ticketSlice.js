import { createSlice } from '@reduxjs/toolkit'

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState: [],
  reducers: {
    setTickets: (state, action) => {
      const tickets = action.payload;
      return tickets;
    },
    addTicket: (state, action) => {
      const ticket = action.payload;
      return [...state, ticket];
    },
    updateTicket: (state, action) => {
      const updatedTicket = action.payload;
      const index = state.findIndex(ticket => ticket._id === updatedTicket._id);
      
      if (index !== -1) {
        const newState = [...state];
        newState[index] = updatedTicket;
        return newState;
      }
      
      return state;
    }
  },
});

export const { setTickets, addTicket, updateTicket } = ticketSlice.actions

export default ticketSlice.reducer