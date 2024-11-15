import { create } from 'zustand';
import { apiRequest } from './apiRequest';
import { encryptionClient } from '../helpers';
import {
  APIResult, ITenantParticipant, IUser, ITenantChat,
  IChatPartner,
} from '../types';

interface ChatsState {
  getAvailableContacts: () => Promise<APIResult<{ contacts: ITenantParticipant & IUser }>>,
  createNewMessage: (
    recipientParticipantId: string, content: string,
  ) => Promise<APIResult<{ chat: ITenantChat }>>,
  loadChats: () => Promise<APIResult<{ chats: Array<ITenantChat & IChatPartner> }>>
}

const endpoint = '/chats';

const useChatsStore = create<ChatsState>(() => ({
  getAvailableContacts: async () => apiRequest({
    path: `${endpoint}/contacts`,
  }),
  createNewMessage: async (participantRecipientId: string, content: string) => apiRequest({
    path: endpoint,
    method: 'post',
    body: { data: { participantRecipientId, content: encryptionClient.encryptMessage(content) } },
    successToastMessage: 'Message has been sent!',
  }),
  loadChats: () => apiRequest({
    path: endpoint,
  }),
}));

export default useChatsStore;
