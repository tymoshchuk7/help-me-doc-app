import { ReactElement, useState } from 'react';
import { Menu, Layout } from 'antd';
import { ContactsOutlined, MessageOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useHasPermissions } from '../../hooks';
import { Permissions } from '../../constants';

interface ISidebarItem {
  title: string,
  to: string,
  Icon: () => ReactElement,
  permissions: Permissions[],
}

const sidebarItems: ISidebarItem[] = [{
  title: 'Dashboard',
  to: '/',
  permissions: [],
  Icon: ContactsOutlined as unknown as () => ReactElement,
}, {
  title: 'Chats',
  to: '/chats',
  permissions: [Permissions.CAN_SEND_MESSAGES],
  Icon: MessageOutlined as unknown as () => ReactElement,
}];

const SidebarItem = ({
  title, to, Icon, permissions, collapsed,
}: ISidebarItem & { collapsed: boolean }): ReactElement | null => {
  const hasPermissions = useHasPermissions(permissions);

  return hasPermissions ? (
    <Menu.Item>
      <Link to={to} className={!collapsed ? 'ml-20' : ''}>
        <Icon />
        <span className="ml-20">{title}</span>
      </Link>
    </Menu.Item>
  ) : null;
};

const Sidebar = (): ReactElement => {
  const [collapsed, setCollapsed] = useState(false);

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
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        {sidebarItems.map((item) => (
          <SidebarItem
            key={`sidebar-item-${item.title}`}
            collapsed={collapsed}
            {...item}
          />
        ))}
      </Menu>
    </Layout.Sider>
  );
};

export default Sidebar;
