export type TRole = 'chief' | 'patient' | 'doctor' | 'admin';

export enum Permissions {
  CAN_INVITE_USERS = 'CAN_INVITE_USERS',
}

export const ROLE_PERMISSIONS: Record<TRole, Set<Permissions>> = {
  chief: new Set([
    Permissions.CAN_INVITE_USERS,
  ]),
  patient: new Set([]),
  doctor: new Set([
    Permissions.CAN_INVITE_USERS,
  ]),
  admin: new Set([
    Permissions.CAN_INVITE_USERS,
  ]),
};

