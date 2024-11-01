import { create } from 'zustand';
import { apiRequest } from './apiRequest';
import { APIResult, IInvitation } from '../types';

interface InvitationsState {
  data: Record<string, IInvitation>,
  preservedInvitation: IInvitation | null,
  createInvitation: (data: Pick<IInvitation, 'email' | 'role'>) => Promise<APIResult<{ invitations: IInvitation[] }>>,
  getTenantInvitations: () => Promise<APIResult<{ invitations: IInvitation[] }>>,
  retrieveInvitation: (id: string) => Promise<APIResult<{ invitation: IInvitation }>>,
  acceptInvitation: (id: string) => Promise<APIResult<{}>>,
}

const endpoint = '/invitations';

const processResponse = (data: IInvitation[]) => {
  const result: Record<string, IInvitation> = {};
  data.forEach((invitation) => {
    result[invitation.id] = invitation;
  });
  return result;
};

const useInvitationsStore = create<InvitationsState>((set) => ({
  data: {},
  preservedInvitation: null,
  createInvitation: async (data: Pick<IInvitation, 'email' | 'role'>) => apiRequest<{ invitations: IInvitation[] }>({
    path: endpoint,
    body: { data },
    method: 'post',
  }),
  getTenantInvitations: async () => apiRequest<{ invitations: IInvitation[] }>({
    path: endpoint,
    onSuccess: (data) => set(processResponse(data.invitations)),
  }),
  retrieveInvitation: async (id: string) => apiRequest<{ invitation: IInvitation }>({
    path: `${endpoint}/${id}`,
    onSuccess: (data) => set({ preservedInvitation: data.invitation }),
  }),
  acceptInvitation: async (id: string) => apiRequest({
    path: `${endpoint}/${id}/accept`,
    onSuccess: () => set({ preservedInvitation: null }),
  }),
}));

export default useInvitationsStore;
