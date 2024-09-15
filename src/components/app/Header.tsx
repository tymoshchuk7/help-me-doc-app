import React, { ReactElement, useState } from 'react';
import { Layout, Popover, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts';

const Header = (): ReactElement => {
  const { onLogOut } = useAuth();
  const [open, setOpen] = useState(false);

  const togglePopover = () => setOpen((prev) => !prev);

  return (
    <Layout.Header className="flex justify-end align-center">
      <Popover
        content={(
          <div>
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div onKeyDown={() => {}} onClick={onLogOut} className="cursor-pointer">Log out</div>
          </div>
        )}
        title="User"
        trigger="click"
        open={open}
        onOpenChange={togglePopover}
      >
        <Avatar icon={<UserOutlined />} />
      </Popover>
    </Layout.Header>
  );
};

export default Header;
