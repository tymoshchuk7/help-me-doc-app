import { TRole } from './types';

export const AUTH_TOKEN_KEY = 'authToken';

export const DISEASES_STATUSES = [
  { value: 'active', label: 'Active' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'chronic', label: 'Chronic' },
];

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
}

export enum Permissions {
  CAN_INVITE_USERS = 'CAN_INVITE_USERS',
  CAN_SEND_MESSAGES = 'CAN_SEND_MESSAGES',
  CAN_CREATE_DISEASES = 'CAN_CREATE_DISEASES',
  CAN_VIEW_DISEASES = 'CAN_VIEW_DISEASES',
}

export const ROLE_PERMISSIONS: Record<TRole, Set<Permissions>> = {
  chief: new Set([
    Permissions.CAN_INVITE_USERS,
    Permissions.CAN_SEND_MESSAGES,
    Permissions.CAN_CREATE_DISEASES,
    Permissions.CAN_VIEW_DISEASES,
  ]),
  patient: new Set([
    Permissions.CAN_SEND_MESSAGES,
    Permissions.CAN_VIEW_DISEASES,
  ]),
  doctor: new Set([
    Permissions.CAN_SEND_MESSAGES,
    Permissions.CAN_CREATE_DISEASES,
    Permissions.CAN_VIEW_DISEASES,
  ]),
  admin: new Set([
    Permissions.CAN_INVITE_USERS,
  ]),
};
