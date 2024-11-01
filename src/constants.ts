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
}

export enum Permissions {
  CAN_INVITE_USERS = 'CAN_INVITE_USERS',
}

export const ROLE_PERMISSIONS: Record<TRole, Set<Permissions>> = {
  chief: new Set([
    Permissions.CAN_INVITE_USERS,
  ]),
  patient: new Set([]),
  doctor: new Set([]),
  admin: new Set([
    Permissions.CAN_INVITE_USERS,
  ]),
};
