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

export interface ITenantChat {
  id: string,
  me_chat_member_id: string,
  me_participant_id: string,
}

export interface IChatPartner {
  chat_partner_participant_id: string,
  chat_partner_first_name: string,
  chat_partner_last_name: string,
  chat_partner_avatar: string | null,
}

export interface ITenantMessage {
  id: string,
  chat_id: string,
  chat_member_id: string,
  content: string,
  sent_timestamp: string,
  participant_id: string
  user_id: string,
}

export interface ITenantDisease {
  id: string,
  doctor_participant_id: string,
  patient_participant_id: string,
  name: string,
  status: 'active' | 'resolved' | 'chronic',
  description: string,
  treatment: string,
}
