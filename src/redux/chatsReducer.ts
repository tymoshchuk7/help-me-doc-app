import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../helpers';
import { RootState } from '../store';

interface Response {
  chats: Record<string, object>
}

export const loadChats = createAsyncThunk('chats/get', async (_, thunk) => {
  const { app: { token } } = thunk.getState() as RootState;
  const { data } = await apiRequest<Response>({ path: '/chats/', authToken: token });
  return data;
});

export const createChat = createAsyncThunk('chats/post', async (_, thunk) => {
  const { app: { token } } = thunk.getState() as RootState;
  const { data } = await apiRequest<Response>({
    path: '/chats/',
    authToken: token,
    method: 'post',
  });
  return data;
});

export const retrieveChat = createAsyncThunk('chats/retrieve', async (id: string, thunk) => {
  const { app: { token } } = thunk.getState() as RootState;
  const { data } = await apiRequest<Response>({ path: `/chats/${id}`, authToken: token });
  return data;
});

const initialState: { data: Record<string, object> } = {
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
    builder.addCase(createChat.fulfilled, (state, action) => {
      return { data: { ...state.data, ...action.payload.chats } };
    });
  },
});

export const {} = chatsSlice.actions;

export default chatsSlice.reducer;