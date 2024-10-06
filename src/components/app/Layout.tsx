import { ReactElement, ReactNode } from 'react';
import { Layout } from 'antd';
import Header from './Header';
import Sidebar from './Sidebar';

const { Content } = Layout;

const AppLayout = ({ children }: { children: ReactNode }): ReactElement => (
  <Layout className="min-height-100vh">
    <Header />
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
          {children}
        </Content>
      </Layout>
    </Layout>
  </Layout>
);

export default AppLayout;
