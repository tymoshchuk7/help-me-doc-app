import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiRequest } from '../helpers';
import { setParticipants } from './participantsReducer';
import { Invitation, TenantParticipant } from '../types';
import { RootState } from '../store';

interface GetResponse {
  invitation: Invitation
}

interface PostResponse {
  invitations: Record<string, Invitation>,
}

interface AcceptResponse {
  participants: Record<string, TenantParticipant>
}

interface State {
  invitation: Invitation | null,
  preserveAcceptInvitation: string | null,
  data: Record<string, Invitation>
}

export const loadInvitation = createAsyncThunk('invitation/get', async (id: string) => {
  const { data } = await apiRequest<GetResponse>({ path: `/invitations/${id}` });
  return data.invitation;
});

export const createInvitation = createAsyncThunk(
  'invitation/post',
  async (body: { email: string, role: string }, thunk) => {
    const { app: { token } } = thunk.getState() as RootState;
    const { data } = await apiRequest<PostResponse>({
      path: '/invitations',
      method: 'post',
      body,
      authToken: token,
    });
    return data.invitations;
  },
);

export const acceptInvitation = createAsyncThunk('invitation/accept', async (id: string, thunk) => {
  const { app: { token } } = thunk.getState() as RootState;
  const { data } = await apiRequest<AcceptResponse>({
    path: `/invitations/${id}/accept`,
    authToken: token,
  });
  thunk.dispatch(setParticipants(data.participants));
  return data;
});

const initialState: State = {
  invitation: null,
  preserveAcceptInvitation: sessionStorage.getItem('preserveAcceptInvitation') ?? null,
  data: {},
};

export const invitationSlice = createSlice({
  name: 'invitations',
  initialState,
  reducers: {
    preserveAcceptInvitation: (state, action: PayloadAction<string | null>) => {
      if (action.payload) {
        window.sessionStorage.setItem('preserveAcceptInvitation', action.payload);
      } else {
        window.sessionStorage.removeItem('preserveAcceptInvitation');
      }
      return { ...state, preserveAcceptInvitation: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadInvitation.fulfilled, (state, action) => {
      return { ...state, invitation: action.payload };
    });
    builder.addCase(createInvitation.fulfilled, (state, action) => {
      return { ...state, data: { ...state.data, ...action.payload } };
    });
    builder.addCase(acceptInvitation.fulfilled, (state) => {
      return { ...state, invitation: null, preserveAcceptInvitation: null };
    });
  },
});

export const { preserveAcceptInvitation } = invitationSlice.actions;

export default invitationSlice.reducer;