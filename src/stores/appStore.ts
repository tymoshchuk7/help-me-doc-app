import { create } from 'zustand';
import { AUTH_TOKEN_KEY } from '../constants';

interface AppState {
  token: string | null,
  setAuthToken: (token: string | null) => void,
}

const useAppStore = create<AppState>((set) => ({
  token: window.localStorage.getItem(AUTH_TOKEN_KEY) || null,
  setAuthToken: (token: string | null) => {
    if (token) {
      window.localStorage.setItem(AUTH_TOKEN_KEY, token);
    } else {
      window.localStorage.removeItem(AUTH_TOKEN_KEY);
    }
    set({ token });
  },
}));

export default useAppStore;
