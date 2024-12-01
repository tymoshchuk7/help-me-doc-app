import { create } from 'zustand';
import { apiRequest } from './apiRequest';
import { ITenantParticipant, APIResult } from '../types';

interface ParticipantsState {
  loadParticipants: () => Promise<APIResult<{ participants: ITenantParticipant[] }>>,
  participants: ITenantParticipant[],
}

const endpoint = '/participants';

const useDiseasesStore = create<ParticipantsState>((set) => ({
  participants: [],
  loadParticipants: async () => apiRequest<{ participants: ITenantParticipant[] }>({
    path: endpoint,
    onSuccess: (data) => set({ participants: data.participants }),
  }),
}));

export default useDiseasesStore;
