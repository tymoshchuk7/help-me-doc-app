import { AxiosError } from 'axios';

export type TRole = 'chief' | 'patient' | 'doctor' | 'admin';

export interface IUser {
  id: string,
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  avatar: string,
  default_tenant: string,
  participant?: Pick<ITenantParticipant, 'role' | 'status' | 'id'>
}

export interface ITenant {
  name: string,
}

export interface IInvitation {
  id: string,
  email: string,
  role: string,
}

export interface APIResult<R> {
  hasError: boolean,
  data?: R,
  error?: AxiosError,
}

export interface ITenantParticipant {
  id: string,
  user_id: string,
  status: string,
  role: TRole,
}
