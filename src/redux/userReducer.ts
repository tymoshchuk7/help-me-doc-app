import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../helpers';
import { User } from '../types';
import { RootState } from '../store';

interface Response {
  user: User
}

export const getMe = createAsyncThunk('user/get', async (_, thunk) => {
  const { app: { token } } = thunk.getState() as RootState;
  const { data } = await apiRequest<Response>({ path: '/users/', authToken: token });
  return data.user;
});

const initialState: User = {} as User;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMe.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;