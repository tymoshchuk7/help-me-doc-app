import { create } from 'zustand';
import { apiRequest } from './helpers';
import { APIResult } from '../types';

interface MiscState {
  getSignUrl: (path: string) => Promise<APIResult<{ url: string }>>
}

const endpoint = '/';

const useWidgetsDataStore = create<MiscState>(() => ({
  getSignUrl: async (path) => apiRequest<{ url: string }>({
    path: `${endpoint}/signed-url`,
    method: 'post',
    body: { data: { path } },
  }),
}));

export default useWidgetsDataStore;
