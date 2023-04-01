import React, { ReactElement, useState } from 'react';
import { Input, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts';

const Login = (): ReactElement => {
  const { onLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async () => {
    await onLogin({ email, password });
  };

  return (
    <div>
      <Row gutter={[16, 16]} justify="center" align="middle" className="min-page-height">
        <Col span={9}>
          <Input placeholder="email" value={email} onChange={({ target }) => setEmail(target.value)} />
          <Input
            placeholder="password"
            type="password" className="mt-2"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <div className="mt-2">
            Don't have account? <Link to="/signup">Signup</Link>
          </div>
          <Button className="mt-2" onClick={onSubmit}>Login</Button>
        </Col>
      </Row>
    </div>
  );
};

export default Login;