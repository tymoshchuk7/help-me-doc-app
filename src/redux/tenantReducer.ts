import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createAsyncAction } from '../helpers';

interface Response {
  tenant: Record<string, string>
}

export const createTenant = createAsyncThunk(
  'tenant/create',
  async (_, thunk) => createAsyncAction<Response>({
    thunk,
    path: '/tenants/',
    method: 'post',
  }),
);

const initialState: Record<string, string> = {};

export const tenantSlice = createSlice({
  name: 'tenant',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTenant.fulfilled, (state, action) => {
      return action.payload.tenant;
    });
  },
});

export const {} = tenantSlice.actions;

export default tenantSlice.reducer;