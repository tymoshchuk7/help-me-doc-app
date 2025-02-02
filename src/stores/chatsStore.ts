import { create } from 'zustand';
import { apiRequest } from './apiRequest';
import { encryptionClient } from '../helpers';
import {
  APIResult, ITenantParticipant, IUser, ITenantChat,
  IChatPartner, ITenantMessage,
} from '../types';

interface ChatsState {
  getAvailableContacts: () => Promise<APIResult<{ contacts: ITenantParticipant & IUser }>>,
  createNewMessage: (
    recipientParticipantId: string, content: string,
  ) => Promise<APIResult<{ chat: ITenantChat }>>,
  loadChats: () => Promise<APIResult<{
    chats: Array<ITenantChat & IChatPartner>,
    unreadChatsCount: number,
  }>>
  retrieveChat: (id: string) => Promise<APIResult<{
    chat: ITenantChat & IChatPartner,
    messages: ITenantMessage[],
  }>>,
  markMessageAsRead: (id: string) => Promise<APIResult<{ messages: ITenantMessage[] }>>,
  lastMessages: ITenantMessage[],
  chats: Array<ITenantChat & IChatPartner>,
}

const endpoint = '/chats';

const useChatsStore = create<ChatsState>((set) => ({
  unreadChatsCount: '0',
  getAvailableContacts: async () => apiRequest({
    path: `${endpoint}/contacts`,
  }),
  createNewMessage: async (participantRecipientId: string, content: string) => apiRequest({
    path: endpoint,
    method: 'post',
    body: { data: { participantRecipientId, content: encryptionClient.encryptMessage(content) } },
    successToastMessage: 'Message has been sent!',
  }),
  // eslint-disable-next-line max-len
  loadChats: () => apiRequest<{ lastMessages: ITenantMessage[], chats: Array<ITenantChat & IChatPartner> }>({
    path: endpoint,
    onSuccess: (data) => set({
      chats: data.chats,
      lastMessages: data.lastMessages,
    }),
  }),
  retrieveChat: (chatId: string) => apiRequest({
    path: `${endpoint}/${chatId}`,
  }),
  markMessageAsRead: (messageId: string) => apiRequest({
    method: 'put',
    path: `${endpoint}/${messageId}`,
  }),
}));

export default useChatsStore;
