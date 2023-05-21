import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../types';

interface Response {
  user: User
}

export const getUser = createAsyncThunk('user/get', async () => {
  const idToken = window.localStorage.getItem('token') as string;
  const { data } = await axios.get<Response>(`${process.env.REACT_APP_API_URL}/users/`, { headers: {
    Authorization: `Bearer ${idToken}`,
  } });
  return data.user;
});

const initialState: User = {} as User;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      return { ...state, ...action.payload };
    });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;