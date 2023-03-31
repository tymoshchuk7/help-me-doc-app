import React, { ReactElement } from 'react';
import { Input, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';

const Login = (): ReactElement => {
  return (
    <div>
      <Row gutter={[16, 16]} justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col span={9}>
          <Input placeholder="email" />
          <Input placeholder="password" className="mt-2" />
          <div className="mt-2">
            Don't have account? <Link to="/signup">Signup</Link>
          </div>
          <Button className="mt-2">Login</Button>
        </Col>
      </Row>
    </div>
  );
};

export default Login;