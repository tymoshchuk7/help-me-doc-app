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

export type RegisterUserDTO = Pick<IUser, 'email' | 'first_name' | 'last_name' | 'password'>;
export type LoginUserDTO = Pick<RegisterUserDTO, 'email' | 'password'>;

export interface ITenant {
  name: string,
}

export interface IInvitation {
  id: string,
  email: string,
  role: string,
}

export type CreateInvitationDTO = Pick<IInvitation, 'email' | 'role'>;

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
  is_read: boolean,
}

export enum TenantDiseaseStatus {
  ACTIVE = 'active',
  RESOLVED = 'resolved',
  CHRONIC = 'chronic',
}

export interface ITenantDisease {
  id: string,
  doctor_participant_id: string,
  patient_participant_id: string,
  name: string,
  status: TenantDiseaseStatus,
  description: string,
  treatment: string,
}

export type CreateDiseaseDTO = Pick<ITenantDisease, 'name' | 'treatment' | 'status' | 'description' | 'patient_participant_id'>;
export type UpdateDiseaseDTO = Pick<ITenantDisease, 'name' | 'treatment' | 'status' | 'description'>;

export enum AppointmentStatus {
  pending = 'pending',
  completed = 'completed',
  canceled = 'cancelled',
}

export interface ITenantAppointment {
  id: string,
  doctor_participant_id: string,
  patient_participant_id: string,
  patient_full_name: string,
  scheduled_at: string,
  status: AppointmentStatus,
}

export type CreateAppointmentDTO = Pick<ITenantAppointment, 'scheduled_at' | 'patient_participant_id'>;
export type UpdateAppointmentDTO = Pick<ITenantAppointment, 'status'>;
