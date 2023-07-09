import React, { ReactElement, useState } from 'react';
import { Auth0Error } from 'auth0-js';
import {
  Input, Row, Col, Button,
  Form, Divider, Alert,
} from 'antd';
import GoogleButton from 'react-google-button';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts';

const Login = (): ReactElement => {
  const { onLogin, onGoogleSignIn } = useAuth();
  const [form] = Form.useForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<null | Auth0Error>(null);

  const onSubmit = async () => {
    try {
      await onLogin({ email, password });
    } catch (e) {
      setError(e as Auth0Error);
    }
  };

  return (
    <div>
      <Row gutter={[16, 16]} justify="center" align="middle" className="min-page-height">
        <Col span={9}>
          <GoogleButton onClick={onGoogleSignIn} />
          <Divider />
          <Form onFinish={onSubmit} form={form}>
            <Input placeholder="email" value={email} onChange={({ target }) => setEmail(target.value)} />
            <Input
              placeholder="password"
              type="password"
              className="mt-2"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <div className="mt-2">
              Don't have an account? <Link to="/signup">Signup</Link>
            </div>
            {error ? <Alert description={error.description} type="error" className="mt-2" /> : <div />}
            <Button className="mt-2" htmlType="submit">Login</Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;