import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../helpers';
import { RootState } from '../store';

interface Response {
  tenant: Record<string, string>
}

export const createTenant = createAsyncThunk('tenant/create', async (_, thunk) => {
  const { app: { token } } = thunk.getState() as RootState;
  const { data } = await apiRequest<Response>({ path: '/tenants/', authToken: token });
  return data.tenant;
});

const initialState: Record<string, string> = {};

export const tenantSlice = createSlice({
  name: 'tenant',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTenant.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const {} = tenantSlice.actions;

export default tenantSlice.reducer;