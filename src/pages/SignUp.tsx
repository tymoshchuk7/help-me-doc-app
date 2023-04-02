import React, { ReactElement, useState } from 'react';
import { Input, Row, Col, Button, Form } from 'antd';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts';

//TODO add validation
const SignUp = (): ReactElement => {
  const { onSignUp } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [, setError] = useState<null | unknown>(null);

  const onSubmit = async () => {
    try {
      await onSignUp({ email, password, first_name: firstName, last_name: lastName });
      navigate('/login');
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
              className="mt-2"
              placeholder="first name"
              value={firstName}
              onChange={({ target }) => setFirstName(target.value)}
            />
            <Input
              className="mt-2"
              placeholder="last name"
              value={lastName}
              onChange={({ target }) => setLastName(target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              className="mt-2"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <div className="mt-2">
              Already have an account? <Link to="/login">Login</Link>
            </div>
            <Button htmlType="submit" className="mt-2">Sign Up</Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;