import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 36 }} spin />;

const Spinner = () => <Spin indicator={antIcon} />;

export default Spinner;
