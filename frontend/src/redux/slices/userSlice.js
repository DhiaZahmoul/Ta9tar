import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    name: '',
    token: '',
  },
  reducers: {
    setUser: (state, action) => {
      const { id, name, token } = action.payload;
      state.id = id;
      state.name = name;
      state.token = token;
    },
    logout: (state) => {
      state.id = null;
      state.name = '';
      state.token = '';
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
