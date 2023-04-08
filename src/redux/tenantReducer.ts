import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface TenantState {
  tenant: Record<string, string>,
}

interface Response {
  tenant: Record<string, string>
}

export const createTenant = createAsyncThunk('tenant/create', async () => {
  const idToken = window.localStorage.getItem('token') as string;
  const { data } = await axios.post<Response>(`${process.env.REACT_APP_API_URL}/tenants/`, { headers: {
    Authorization: `Bearer ${idToken}`,
  } });
  return data;
});

const initialState: TenantState = {
  tenant: {},
};

export const tenantSlice = createSlice({
  name: 'tenant',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTenant.fulfilled, (state, action) => {
      return { ...state, ...action.payload };
    });
  },
});

export const {} = tenantSlice.actions;

export default tenantSlice.reducer;