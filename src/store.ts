import { configureStore } from '@reduxjs/toolkit';
import appReducer from './redux/appReducer';
import tenantReducer from './redux/tenantReducer';
import userReducer from './redux/userReducer';
import invitationsReducer from './redux/invitationsReducer';
import participantsReducer from './redux/participantsReducer';

export const store = configureStore({
  reducer: {
    app: appReducer,
    tenant: tenantReducer,
    user: userReducer,
    invitations: invitationsReducer,
    participants: participantsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;