// frontend/src/redux/store.js
// Redux store configuration
//FILE CREATED BY CHATGPT

import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './slices/contactSlice';
import chatsReducer from './slices/chatSlice';
import messagesReducer from './slices/messagesSlice';
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    chats: chatsReducer,
    messages: messagesReducer,
    user: userReducer,
    auth: authReducer,
  },
});
