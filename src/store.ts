import { configureStore } from '@reduxjs/toolkit';
import appReducer from './redux/appReducer';
import tenantReducer from './redux/tenantReducer';

export const store = configureStore({
  reducer: {
    app: appReducer,
    tenant: tenantReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;