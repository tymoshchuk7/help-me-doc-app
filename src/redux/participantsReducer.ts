import { createSlice } from '@reduxjs/toolkit';
import { TenantParticipant } from '../types';
// import { RootState } from '../store';

interface State {
  data: Record<string, TenantParticipant>
}

const initialState: State = {
  data: {},
};

export const participantsSlice = createSlice({
  name: 'participants',
  initialState,
  reducers: {
    setParticipants: (state, action) => {
      return { data: { ...state.data, ...action.payload } };
    },
  },
});

export const { setParticipants } = participantsSlice.actions;

export default participantsSlice.reducer;