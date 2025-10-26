import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contacts: [],
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    updateContactStatus: (state, action) => {
      const { id, status } = action.payload;
      const contact = state.contacts.find((c) => c.id === id);
      if (contact) contact.status = status;
    },
  },
});

export const { setContacts, updateContactStatus } = contactsSlice.actions;
export default contactsSlice.reducer;
