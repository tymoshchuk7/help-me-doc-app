import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  token: string | null,
  preserveTenantToBeCreated: string | null,
}

const initialState: AppState = {
  token: window.localStorage.getItem('token') ?? null,
  preserveTenantToBeCreated: window.sessionStorage.getItem('tenantToBeCreated') ?? null,
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
    preserveTenantCreate: (state, action: PayloadAction<string | null>) => {
      if (action.payload) {
        window.sessionStorage.setItem('tenantToBeCreated', action.payload);
      } else {
        window.sessionStorage.removeItem('tenantToBeCreated');
      }
      return { ...state, preserveTenantToBeCreated: action.payload };
    },
  },
});

export const { updateToken, preserveTenantCreate } = appSlice.actions;

export default appSlice.reducer;