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
}

export enum Permissions {
  CAN_INVITE_USERS = 'CAN_INVITE_USERS',
  CAN_SEND_MESSAGES = 'CAN_SEND_MESSAGES',
  CAN_CREATE_DISEASES = 'CAN_CREATE_DISEASES',
}

export const ROLE_PERMISSIONS: Record<TRole, Set<Permissions>> = {
  chief: new Set([
    Permissions.CAN_INVITE_USERS,
    Permissions.CAN_SEND_MESSAGES,
    Permissions.CAN_CREATE_DISEASES,
  ]),
  patient: new Set([
    Permissions.CAN_SEND_MESSAGES,
  ]),
  doctor: new Set([
    Permissions.CAN_SEND_MESSAGES,
    Permissions.CAN_CREATE_DISEASES,
  ]),
  admin: new Set([
    Permissions.CAN_INVITE_USERS,
  ]),
};
