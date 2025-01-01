import { ReactElement } from 'react';
import { useHasPermissions } from '../../hooks';
import { useUserStore } from '../../stores';
import { Permissions } from '../../constants';
import { InviteParticipants } from '../../components';
import TableWidget from './TableWidget';

// TODO move invite form to an other place later

const DashboardPage = (): ReactElement => {
  const { me } = useUserStore();
  const canInviteParticipants = useHasPermissions([Permissions.CAN_INVITE_USERS]);

  return (
    <>
      <div>{`Hi ${me?.first_name} ${me?.last_name}!`}</div>
      {canInviteParticipants && (
        <div className="mt-20">
          <h3 className="mb-20">Invite participants to the tenant</h3>
          <InviteParticipants />
        </div>
      )}
      <TableWidget />
    </>
  );
};

export default DashboardPage;
