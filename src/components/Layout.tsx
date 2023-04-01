import React, { ReactElement, ReactNode } from 'react';
import { NotificationOutlined, UserOutlined, MessageOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';

const { Header, Content, Sider } = Layout;

const sidebarLabels: Record<number, string> = {
  0: 'Participants',
  1: 'Messages',
  2: 'Notifications',
};

const sidebarItems: MenuProps['items'] = [UserOutlined, MessageOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: sidebarLabels[index],
    };
  },
);

const AppLayout = ({ children }: { children: ReactNode }): ReactElement => {
  const { token: { colorBgContainer } } = theme.useToken();

  return (
    <Layout className="min-page-height">
      <Header className="header" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div
          className="white-text cursor-pointer"
          style={{ fontSize: 16 }}
        >
          Log out
        </div>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={sidebarItems}
          />
        </Sider>
        <Layout style={{ padding: 24 }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;