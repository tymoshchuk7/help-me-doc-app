import { TRole } from './types';

export const AUTH_TOKEN_KEY = 'authToken';

export enum AppRouteNames {
  authCallback = '/authCallback',
  login = '/login',
  signup = '/signup',
  changePassword = '/change-password',
  dashboard = '/',
  createTenant = '/create-tenant',
  invitationCallback = '/invitation/:id',
  chats = '/chats',
  chat = '/chats/:id',
  disease = '/disease/:id',
  appointment = '/appointment/:id',
}

export enum Permissions {
  CAN_INVITE_USERS = 'CAN_INVITE_USERS',
  CAN_SEE_INVITATIONS = 'CAN_SEE_INVITATIONS',
  CAN_SEND_MESSAGES = 'CAN_SEND_MESSAGES',
  CAN_CREATE_DISEASES = 'CAN_CREATE_DISEASES',
  CAN_VIEW_DISEASES = 'CAN_VIEW_DISEASES',
  CAN_VIEW_PARTICIPANTS = 'CAN_VIEW_PARTICIPANTS',
  CAN_VIEW_APPOINTMENTS = 'CAN_VIEW_APPOINTMENTS',
  CAN_CREATE_APPOINTMENTS = 'CAN_CREATE_APPOINTMENTS',
}

export const ROLE_PERMISSIONS: Record<TRole, Set<Permissions>> = {
  chief: new Set([
    Permissions.CAN_INVITE_USERS,
    Permissions.CAN_SEND_MESSAGES,
    Permissions.CAN_CREATE_DISEASES,
    Permissions.CAN_VIEW_DISEASES,
    Permissions.CAN_VIEW_APPOINTMENTS,
    Permissions.CAN_CREATE_APPOINTMENTS,
  ]),
  patient: new Set([
    Permissions.CAN_SEND_MESSAGES,
    Permissions.CAN_VIEW_DISEASES,
    Permissions.CAN_VIEW_APPOINTMENTS,
  ]),
  doctor: new Set([
    Permissions.CAN_SEND_MESSAGES,
    Permissions.CAN_CREATE_DISEASES,
    Permissions.CAN_VIEW_DISEASES,
    Permissions.CAN_VIEW_APPOINTMENTS,
    Permissions.CAN_CREATE_APPOINTMENTS,
  ]),
  admin: new Set([
    Permissions.CAN_INVITE_USERS,
  ]),
};
