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

const invitationStorageKey = 'preservedInvitation';
const setPreservedInvitation = (invitation: IInvitation) => (
  window.sessionStorage.setItem(invitationStorageKey, JSON.stringify(invitation))
);
const getPreservedInvitation = (): IInvitation | null => {
  const invitation = window.sessionStorage.getItem(invitationStorageKey);
  return invitation ? JSON.parse(invitation) : null;
};
const clearPreservedInvitation = () => window.sessionStorage.removeItem(invitationStorageKey);

const useInvitationsStore = create<InvitationsState>((set) => ({
  data: {},
  preservedInvitation: getPreservedInvitation(),
  createInvitation: async (data: Pick<IInvitation, 'email' | 'role'>) => apiRequest<{ invitations: IInvitation[] }>({
    path: endpoint,
    body: { data },
    method: 'post',
    successToastMessage: 'The invitation has been sent',
  }),
  getTenantInvitations: async () => apiRequest<{ invitations: IInvitation[] }>({
    path: endpoint,
    onSuccess: (data) => set(processResponse(data.invitations)),
  }),
  retrieveInvitation: async (id: string) => apiRequest<{ invitation: IInvitation }>({
    path: `${endpoint}/${id}`,
    onSuccess: (data) => {
      setPreservedInvitation(data.invitation);
      set({ preservedInvitation: data.invitation });
    },
  }),
  acceptInvitation: async (id: string) => apiRequest({
    path: `${endpoint}/${id}/accept`,
    onSuccess: () => {
      clearPreservedInvitation();
      set({ preservedInvitation: null });
    },
  }),
}));

export default useInvitationsStore;
