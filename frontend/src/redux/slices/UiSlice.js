// frontend/src/redux/slices/uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeComponent: null, // possible values: 'chat', 'contacts', 'settings', etc.
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveComponent: (state, action) => {
      state.activeComponent = action.payload;
    },
    clearActiveComponent: (state) => {
      state.activeComponent = null;
    },
  },
});

export const { setActiveComponent, clearActiveComponent } = uiSlice.actions;
export default uiSlice.reducer;
