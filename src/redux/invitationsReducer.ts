import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncAction } from '../helpers';
import { setParticipants } from './participantsReducer';
import { Invitation, TenantParticipant } from '../types';

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

export const loadInvitation = createAsyncThunk(
  'invitation/get',
  (id: string, thunk) => createAsyncAction<GetResponse>({
    thunk,
    path: `/invitations/${id}`,
  }),
);

export const createInvitation = createAsyncThunk(
  'invitation/post',
  (body: { email: string, role: string }, thunk) => createAsyncAction<PostResponse>({
    thunk,
    path: '/invitations/',
    method: 'post',
    body,
  }),
);

export const acceptInvitation = createAsyncThunk(
  'invitation/accept',
  (id: string, thunk) => createAsyncAction<AcceptResponse>({
    thunk,
    path: `/invitations/${id}/accept`,
    onSuccess: (data) => {
      thunk.dispatch(setParticipants(data));
    },
  }),
);

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
      return { ...state, invitation: action.payload.invitation };
    });
    builder.addCase(createInvitation.fulfilled, (state, action) => {
      return { ...state, data: { ...state.data, ...action.payload.invitations } };
    });
    builder.addCase(acceptInvitation.fulfilled, (state) => {
      return { ...state, invitation: null, preserveAcceptInvitation: null };
    });
  },
});

export const { preserveAcceptInvitation } = invitationSlice.actions;

export default invitationSlice.reducer;