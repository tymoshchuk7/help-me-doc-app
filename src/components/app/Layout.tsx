import { ReactElement, useState } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import FloatingMenu, { ModalType } from './FloatingMenu';
import NewMessageModal from './NewChatModal';

const { Content } = Layout;

const AppLayout = (): ReactElement => {
  const [modalVisibility, setModalVisibility] = useState<null | ModalType>(null);

  return (
    <Layout className="min-height-100vh">
      <NewMessageModal open={modalVisibility === 'message'} closeModal={() => setModalVisibility(null)} />
      <Header />
      <FloatingMenu onClick={(item) => setModalVisibility(item)} />
      <Layout>
        <Sidebar />
        <Layout style={{ padding: 24 }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
