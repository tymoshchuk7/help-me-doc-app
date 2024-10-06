import { ReactElement, ReactNode } from 'react';
import { Menu, Layout } from 'antd';
import {
  ContactsOutlined, MessageOutlined, NotificationOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

interface SidebarItemProps {
  title: string,
  to: string,
  icon: ReactNode,
}

const SidebarItem = ({ title, to, icon }: SidebarItemProps): ReactElement => (
  <Menu.Item>
    <Link to={to} className="ml-20">
      {icon}
      <span className="ml-20">{title}</span>
    </Link>
  </Menu.Item>
);

const Sidebar = (): ReactElement => (
  <Layout.Sider width={200}>
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      style={{ height: '100%', borderRight: 0 }}
    >
      <SidebarItem title="Dashboard" icon={<ContactsOutlined />} to="/" />
      <SidebarItem title="Messages" icon={<MessageOutlined />} to="/" />
      <SidebarItem title="Notifications" icon={<NotificationOutlined />} to="/" />
    </Menu>
  </Layout.Sider>
);

export default Sidebar;
