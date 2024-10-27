import { create } from 'zustand';
import { apiRequest } from './apiRequest';
import { IUser, APIResult } from '../types';

interface UserState {
  me: IUser | null,
  getMe: () => Promise<APIResult<{ user: IUser }>>,
  createTenant: (name: string) => Promise<APIResult<{ user: IUser }>>,
}

const usersEndpoint = '/users';
const tenantsEndpoint = '/tenants';

const useUserStore = create<UserState>((set) => ({
  me: null,
  getMe: async () => apiRequest<{ user: IUser }>({
    path: `${usersEndpoint}/me`,
    onSuccess: (data) => set({ me: data.user }),
  }),
  createTenant: async (name: string) => apiRequest<{ user: IUser }>({
    path: `${tenantsEndpoint}`,
    onSuccess: (data) => set({ me: data.user }),
    body: { data: { name } },
    method: 'post',
  }),
}));

export default useUserStore;
