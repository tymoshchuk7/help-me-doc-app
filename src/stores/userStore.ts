import { create } from 'zustand';
import { apiRequest } from './apiRequest';
import { IUser, APIResult } from '../types';

interface UserState {
  me: IUser | null,
  getMe: () => Promise<APIResult<{ user: IUser }>>,
}

const usersEndpoint = '/users';

const useUserStore = create<UserState>((set) => ({
  me: null,
  getMe: async () => apiRequest<{ user: IUser }>({
    path: `${usersEndpoint}/me`,
    onSuccess: (data) => set({ me: data.user }),
  }),
}));

export default useUserStore;
