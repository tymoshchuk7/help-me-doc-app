import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface UserState {
  user: Record<string, string>,
}

export const getUser = createAsyncThunk('user/get', async () => {
  const idToken = window.localStorage.getItem('token') as string;
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/users/`, { headers: {
    Authorization: `Bearer ${idToken}`,
  } });
  return data;
});

const initialState: UserState = {
  user: {},
};

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