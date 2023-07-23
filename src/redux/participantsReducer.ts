import { createSlice } from '@reduxjs/toolkit';
import { TenantParticipant } from '../types';
// import { RootState } from '../store';

const initialState: Record<string, TenantParticipant> = {};

export const participantsSlice = createSlice({
  name: 'participants',
  initialState,
  reducers: {
    setParticipants: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setParticipants } = participantsSlice.actions;

export default participantsSlice.reducer;