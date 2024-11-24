import { ReactElement, useState, ReactNode, useMemo } from 'react';
import { Menu, Layout } from 'antd';
import { ContactsOutlined, MessageOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserStore } from '../../stores';
import { Permissions, ROLE_PERMISSIONS } from '../../constants';

interface ISidebarItem {
  key: string,
  label: string,
  to: string,
  icon: ReactNode,
  permissions: Permissions[],
  selected: (to: string, pathname: string) => boolean,
}

const allSidebarItems: ISidebarItem[] = [{
  key: 'Dashboard',
  label: 'Dashboard',
  to: '/',
  permissions: [],
  icon: <ContactsOutlined />,
  selected: (to, pathname) => to === pathname,
}, {
  key: 'Chats',
  label: 'Chats',
  to: '/chats',
  permissions: [Permissions.CAN_SEND_MESSAGES],
  icon: <MessageOutlined />,
  selected: (to, pathname) => pathname.startsWith(to),
}];

const Sidebar = (): ReactElement => {
  const location = useLocation();
  const navigate = useNavigate();
  const { me } = useUserStore();
  const [collapsed, setCollapsed] = useState(false);

  // eslint-disable-next-line arrow-body-style
  const participantSidebarItems = useMemo(() => {
    return allSidebarItems.filter((item) => {
      if (item.permissions.length === 0) {
        return true;
      }
      const role = me?.participant?.role;
      if (!role) {
        return false;
      }
      return item.permissions.every((permission) => ROLE_PERMISSIONS[role].has(permission));
    }).map((item) => ({
      key: item.key,
      label: item.label,
      icon: item.icon,
      to: item.to,
    }));
  }, [me?.participant?.role]);

  const selectedSidebarItem = useMemo(() => (
    allSidebarItems.find((item) => item.selected(item.to, location.pathname))
  ), [location.pathname]);

  return (
    <Layout.Sider
      width={200}
      breakpoint="md"
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Menu
        mode="inline"
        selectedKeys={selectedSidebarItem ? [selectedSidebarItem?.key] : []}
        style={{ height: '100%', borderRight: 0 }}
        items={participantSidebarItems}
        onSelect={(item) => navigate((item.item as unknown as { props: { to: string } }).props.to)}
      />
    </Layout.Sider>
  );
};

export default Sidebar;
