import { ReactElement, useState } from 'react';
import { Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import FloatingMenu, { ModalType } from './FloatingMenu';
import NewMessageModal from './NewChatModal';
import NewDiseaseModal from './NewDiseaseModal';

const { Content } = Layout;

const AppLayout = (): ReactElement => {
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
  const [modalVisibility, setModalVisibility] = useState<null | ModalType>(null);

  const hideModal = () => setModalVisibility(null);

  return (
    <Layout className="min-height-100vh">
      <NewMessageModal open={modalVisibility === 'message'} closeModal={hideModal} />
      <NewDiseaseModal open={modalVisibility === 'disease'} closeModal={hideModal} />
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
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
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
