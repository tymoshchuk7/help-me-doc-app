import React, { ReactElement } from 'react';
import { useUserStore } from '../stores';
import { AppPageLayout } from '../components';

const DashboardPage = (): ReactElement => {
  const { me } = useUserStore();

  return (
    <AppPageLayout>
      <div>{`Hi ${me?.first_name} ${me?.last_name}!`}</div>
    </AppPageLayout>
  );
};

export default DashboardPage;
