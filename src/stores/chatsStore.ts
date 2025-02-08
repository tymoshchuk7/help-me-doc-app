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
    lastMessages: ITenantMessage[],
  }>>
  retrieveChat: (id: string) => Promise<APIResult<{
    chat: ITenantChat & IChatPartner,
    messages: ITenantMessage[],
  }>>,
  markMessageAsRead: (id: string) => Promise<APIResult<{ messages: ITenantMessage[] }>>,
  lastMessages: Record<string, ITenantMessage>,
  chats: Record<string, ITenantChat & IChatPartner>,
}

// eslint-disable-next-line max-len
const mergeDataIntoStore = (initialData: Record<string, any>, incomingData: Array<{ id: string }>) => {
  const changes = Object.fromEntries(incomingData.map((i) => [i.id, i]));
  return { ...initialData, ...changes };
};

const endpoint = '/chats';

const useChatsStore = create<ChatsState>((set, getState) => ({
  chats: {},
  lastMessages: {},
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
    onSuccess: (data) => {
      const state = getState();

      return set({
        chats: mergeDataIntoStore(state.chats, data.chats),
        lastMessages: mergeDataIntoStore(state.lastMessages, data.lastMessages),
      });
    },
  }),
  retrieveChat: (chatId: string) => apiRequest({
    path: `${endpoint}/${chatId}`,
  }),
  markMessageAsRead: (messageId: string) => apiRequest<{ messages: ITenantMessage[] }>({
    method: 'put',
    path: `${endpoint}/${messageId}`,
    onSuccess: (data) => {
      const state = getState();
      const result = mergeDataIntoStore(state.lastMessages, data.messages);
      return set({
        lastMessages: result,
      });
    },
  }),
}));

export default useChatsStore;
