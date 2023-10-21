import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createAsyncAction } from '../helpers';
import { User, TenantParticipant } from '../types';
import { setParticipants } from './participantsReducer';

interface State {
  me: User,
  data: Record<string, User>
}

interface Response {
  user: User,
  participants: Record<string, TenantParticipant>
}

export const getMe = createAsyncThunk(
  'user/get',
  (_, thunk) => createAsyncAction<Response>({
    thunk,
    path: '/users',
    onSuccess: (data) => {
      thunk.dispatch(setParticipants(data.participants));
    },
  }),
);

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