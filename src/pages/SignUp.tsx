import React, { ReactElement, useState } from 'react';
import { Input, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts';

//TODO add validation
const SignUp = (): ReactElement => {
  const { onSignUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async () => {
    await onSignUp({ email, password });
  };

  return (
    <div>
      <Row gutter={[16, 16]} justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col span={9}>
          <Input placeholder="email" value={email} onChange={({ target }) => setEmail(target.value)} />
          <Input
            placeholder="password"
            type="password" className="mt-2"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <div className="mt-2">
            Already have account? <Link to="/login">Login</Link>
          </div>
          <Button className="mt-2" onClick={onSubmit}>Sign Up</Button>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;