import React, { ReactElement, useState } from 'react';
import { Input, Row, Col, Button, Form } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts';

const Login = (): ReactElement => {
  const { onLogin } = useAuth();
  const [form] = Form.useForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, setError] = useState<null | unknown>(null);

  const onSubmit = async () => {
    try {
      await onLogin({ email, password });
    } catch (e) {
      setError(e);
    }
  };

  return (
    <div>
      <Row gutter={[16, 16]} justify="center" align="middle" className="min-page-height">
        <Col span={9}>
          <Form onFinish={onSubmit} form={form}>
            <Input placeholder="email" value={email} onChange={({ target }) => setEmail(target.value)} />
            <Input
              placeholder="password"
              type="password" className="mt-2"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <div className="mt-2">
              Don't have an account? <Link to="/signup">Signup</Link>
            </div>
            <Button className="mt-2" htmlType="submit">Login</Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;