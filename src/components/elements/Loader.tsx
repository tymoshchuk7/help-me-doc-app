import { ReactElement } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = <LoadingOutlined style={{ fontSize: 36 }} spin />;

const Loader = (): ReactElement => (
  <div className="min-height-100vh flex justify-center align-center">
    <Spin indicator={antIcon} />
  </div>
);

export default Loader;
