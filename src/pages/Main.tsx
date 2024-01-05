import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useHasPermissions } from '../hooks';
import { RootState }  from '../store';
import { Permissions } from '../types/permissions';
import { PageLayout, InviteParticipant } from '../components';

const Main = (): ReactElement => {
  const { first_name } = useSelector(({ user }: RootState) => user.me);
  const canInvite = useHasPermissions([Permissions.CAN_INVITE_USERS]);

  return (
    <PageLayout>
      <div>Hello, {first_name}!</div>
      {canInvite && <InviteParticipant />}
    </PageLayout>
  );
};

export default Main;