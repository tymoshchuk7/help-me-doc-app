import { TRole } from './permissions';

export interface User {
  id: string,
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  avatar: string;
}

export interface Invitation {
  id: string,
  tenant: string,
  email: string,
  role: TRole,
}

export interface TenantParticipant {
  id: string,
  user_id: string,
  status: string,
  role: TRole,
}

export interface TenantChat {
  id: string,
  me: string,
  otherParticipant: string,
}