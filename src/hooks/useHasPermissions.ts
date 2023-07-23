import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { ROLE_PERMISSIONS, Permissions } from '../types/permissions';

export default function useHasPermissions(permissions: Array<Permissions>): boolean {
  const currentUser = useSelector(({ user }: RootState) => user);
  const participants = useSelector(({ participants: _participants }: RootState) => _participants);
  if (!currentUser) {
    return false;
  }
  const participant = Object.values(participants || {}).find(({ user_id }) => user_id === currentUser.id);
  if (!participant) {
    return false;
  }
  return permissions.every((permission) => ROLE_PERMISSIONS[participant.role].has(permission));
}