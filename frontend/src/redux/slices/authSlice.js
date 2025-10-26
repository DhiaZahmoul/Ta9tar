import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: typeof window !== 'undefined' ? localStorage.getItem("currentUserId") : null,
  isLoading: false,
  error: null,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.userId = action.payload; // ✅ payload is just the user ID
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.userId = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
