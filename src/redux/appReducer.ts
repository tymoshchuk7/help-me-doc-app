import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  token: string | null,
  preserveWorkspaceToBeCreated: string | null,
}

const initialState: AppState = {
  token: window.localStorage.getItem('token') ?? null,
  preserveWorkspaceToBeCreated: window.sessionStorage.getItem('workspaceToBeCreated') ?? null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateToken: (state, action: PayloadAction<string | null>) => {
      if (action.payload) {
        window.localStorage.setItem('token', action.payload);
      } else {
        window.localStorage.removeItem('token');
      }
      return { ...state, token: action.payload };
    },
    preserveWorkspaceCreate: (state, action: PayloadAction<string | null>) => {
      if (action.payload) {
        window.sessionStorage.setItem('workspaceToBeCreated', action.payload);
      } else {
        window.sessionStorage.removeItem('workspaceToBeCreated');
      }
      return { ...state, preserveWorkspaceToBeCreated: action.payload };
    },
  },
});

export const { updateToken, preserveWorkspaceCreate } = appSlice.actions;

export default appSlice.reducer;