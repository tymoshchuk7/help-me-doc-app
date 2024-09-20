import { create } from 'zustand';
import useAppStore from './appStore';
import { apiRequest } from '../helpers';

const useUserStore = create((set) => ({
  me: {},
  getMe: async () => {
    const { token } = useAppStore.getState();
    const { data } = await apiRequest({
      path: '/users/',
      authToken: token,
      method: 'get',
    });

    set({ data });
    return data;
  },
}));

export default useUserStore;
