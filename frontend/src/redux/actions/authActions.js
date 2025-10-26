import axios from 'axios';
import { setCredentials, logout } from '../slices/authSlice';

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/auth/login', credentials);
    dispatch(setCredentials(data));
    localStorage.setItem('token', data.token);
  } catch (error) {
    console.error('Login failed:', error);
  }
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/auth/register', userData);
    dispatch(setCredentials(data));
    localStorage.setItem('token', data.token);
  } catch (error) {
    console.error('Registration failed:', error);
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(logout());
};
