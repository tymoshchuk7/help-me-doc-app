import { ReactElement, useState } from 'react';
import { Layout, Popover, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts';
import { useUserStore } from '../../stores';

const Header = (): ReactElement => {
  const { onLogOut } = useAuth();
  const { me } = useUserStore();
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
        title={`${me?.first_name} ${me?.last_name}`}
        trigger="click"
        open={open}
        onOpenChange={togglePopover}
      >
        <Avatar className="cursor-pointer" src={me?.avatar} icon={!me?.avatar ? <UserOutlined /> : null} />
      </Popover>
    </Layout.Header>
  );
};

export default Header;
