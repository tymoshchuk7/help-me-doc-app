import React, { ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';
import { Layout, Popover, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts';
import { RootState } from  '../../store';

const Header = (): ReactElement => {
  const { onLogOut } = useAuth();
  const { avatar, last_name: lastName, first_name: firstName } = useSelector(({ user }: RootState) => user);
  const [open, setOpen] = useState(false);

  const togglePopover = () => setOpen((prev) => !prev);

  return (
    <Layout.Header className="display-flex justify-end align-center">
      <Popover
        content={(
          <div>
            <div onClick={onLogOut} className="cursor-pointer">Log out</div>
          </div>
        )}
        title={`${firstName} ${lastName}`}
        trigger="click"
        open={open}
        onOpenChange={togglePopover}
      >
        <Avatar className="cursor-pointer" src={avatar} icon={!avatar ? <UserOutlined /> : null} />
      </Popover>
    </Layout.Header>
  );
};

export default Header;