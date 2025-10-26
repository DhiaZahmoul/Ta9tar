import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chats: [],
  selectedChat: null,
  loading: false,
  error: null,
};

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    selectChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    clearChats: (state) => {
      state.chats = [];
      state.selectedChat = null;
    },
  },
});

export const { setChats, selectChat, clearChats } = chatsSlice.actions;
export default chatsSlice.reducer;
