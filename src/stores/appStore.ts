import { create } from 'zustand';
import { AUTH_TOKEN_KEY } from '../constants';

const useAppStore = create((set) => ({
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
