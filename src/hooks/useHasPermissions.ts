import { useUserStore } from '../stores';
import { Permissions, ROLE_PERMISSIONS } from '../constants';

export default function useHasPermissions(permissions: Permissions[], rule: 'all' | 'or' = 'all'): boolean {
  const { me } = useUserStore();
  const role = me?.participant?.role;

  if (!me?.default_tenant || !role) {
    return false;
  }

  return rule === 'all' ? permissions.every((permission) => ROLE_PERMISSIONS[role].has(permission)) : permissions.some((permission) => ROLE_PERMISSIONS[role].has(permission));
}
