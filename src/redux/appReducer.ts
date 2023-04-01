import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  token: string | null,
}

const initialState: AppState = {
  token: window.localStorage.getItem('token') ?? null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateToken: (state, action: PayloadAction<string>) => {
      if (action.payload) {
        window.localStorage.setItem('token', action.payload);
      } else {
        window.localStorage.removeItem('token');
      }
      return { ...state, token: action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateToken } = appSlice.actions;

export default appSlice.reducer;