import { useUserStore } from '../stores';
import { Permissions, ROLE_PERMISSIONS } from '../constants';

export default function useHasPermissions(permissions: Permissions[]): boolean {
  const { me } = useUserStore();
  const role = me?.participant?.role;

  if (!me?.default_tenant || !role) {
    return false;
  }

  return permissions.every((permission) => ROLE_PERMISSIONS[role].has(permission));
}
