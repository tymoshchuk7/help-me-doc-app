import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createAsyncAction } from '../helpers';
import { TenantParticipant, User, TenantChat } from '../types';
import { setUsers } from './userReducer';
import { setParticipants } from './participantsReducer';

interface GetResponse {
  chats: Record<string, TenantChat>,
  participants: Record<string, TenantParticipant>,
  users: Record<string, User>,
}

const endpoint = '/chats/';

export const loadChats = createAsyncThunk(
  'chats/load',
  (_, thunk) => createAsyncAction<GetResponse>({
    thunk,
    path: endpoint,
    onSuccess: (data) => {
      thunk.dispatch(setUsers(data.users));
      thunk.dispatch(setParticipants(data.participants));
    },
  }),
);

export const createChat = createAsyncThunk(
  'chats/create',
  (body: { participantRecipientId: string }, thunk) => createAsyncAction({
    thunk,
    path: endpoint,
    method: 'post',
    body,
  }),
);

export const retrieveChat = createAsyncThunk(
  'chats/retrieve',
  (id: string, thunk) => createAsyncAction<Response>({
    thunk,
    path: `${endpoint}${id}`,
  }),
);

const initialState: { data: Record<string, TenantChat> } = {
  data: {},
};

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadChats.fulfilled, (state, action) => {
      return { data: { ...state.data, ...action.payload.chats } };
    });
    builder.addCase(createChat.fulfilled, (state) => {
      return state;
    });
  },
});

export const {} = chatsSlice.actions;

export default chatsSlice.reducer;