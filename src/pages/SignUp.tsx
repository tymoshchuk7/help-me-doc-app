import React, { ReactElement } from 'react';
import { Input, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';

const SignUp = (): ReactElement => {
  return (
    <div>
      <Row gutter={[16, 16]} justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col span={9}>
          <Input placeholder="email" />
          <Input placeholder="password" className="mt-2" />
          <div className="mt-2">
            Already have account? <Link to="/login">Login</Link>
          </div>
          <Button className="mt-2">Login</Button>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;