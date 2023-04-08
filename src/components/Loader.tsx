import React, { ReactElement } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = <LoadingOutlined style={{ fontSize: 36 }} spin />;

const Loader = (): ReactElement => <Spin indicator={antIcon} />;

export default Loader;