import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../helpers';
import { User, TenantParticipant } from '../types';
import { RootState } from '../store';
import { setParticipants } from './participantsReducer';

interface State {
  me: User,
  data: Record<string, User>
}

interface Response {
  user: User,
  participants: Record<string, TenantParticipant>
}

export const getMe = createAsyncThunk('user/get', async (_, thunk) => {
  const { app: { token } } = thunk.getState() as RootState;
  const { data } = await apiRequest<Response>({ path: '/users/', authToken: token });
  thunk.dispatch(setParticipants(data.participants));
  return data;
});

const initialState: State = {
  me: {} as User,
  data: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMe.fulfilled, (state, action) => {
      return { ...state, me: action.payload.user };
    });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;