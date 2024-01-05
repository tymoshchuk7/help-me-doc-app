import React, {
  ReactElement, ReactNode, useState,
} from 'react';
import { NotificationOutlined, MessageOutlined, ContactsOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import Header from './Header';
import SidebarItem from './SidebarItem';
import FAB from '../FAB';
import CreateChatModal from './CreateChatModal';

const { Content, Sider } = Layout;

const AppLayout = ({ children }: { children: ReactNode }): ReactElement => {
  const [createChatModalVisibility, setCreateChatModalVisibility] = useState(false);
  const { token: { colorBgContainer } } = theme.useToken();

  return (
    <Layout className="min-page-height">
      <Header />
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <SidebarItem title="Dashboard" icon={<ContactsOutlined />} to="/" />
            <SidebarItem title="Messages" icon={<MessageOutlined />} to="/chats" />
            <SidebarItem title="Notifications" icon={<NotificationOutlined />} to="/" />
          </Menu>
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
      <FAB onOpenCrateChatModal={() => setCreateChatModalVisibility(true)} />
      <CreateChatModal
        open={createChatModalVisibility}
        onHideModal={() => setCreateChatModalVisibility(false)}
      />
    </Layout>
  );
};

export default AppLayout;