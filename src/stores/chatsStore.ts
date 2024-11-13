import { create } from 'zustand';
import { apiRequest } from './apiRequest';
import { APIResult } from '../types';

interface ChatsState {
  getAvailableContacts: () => Promise<APIResult<any>>
}

const endpoint = '/chats';

const useChatsStore = create<ChatsState>(() => ({
  getAvailableContacts: async () => apiRequest({
    path: `${endpoint}/contacts`,
  }),
}));

export default useChatsStore;
