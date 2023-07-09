import React, { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth0Error } from 'auth0-js';
import {
  Input, Row, Col, Button,
  Form, Divider, Alert,
} from 'antd';
import { Link } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import { useAuth } from '../contexts';

//TODO add validation
const SignUp = (): ReactElement => {
  const { onSignUp, onGoogleSignIn } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState<null | Auth0Error>(null);

  const onSubmit = async () => {
    try {
      await onSignUp({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        role: 'chief',
      });
      navigate('/login');
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
            {error ? <Alert description={error.description} type="error" className="mt-2" /> : <div />}
            <Button htmlType="submit" className="mt-2">Sign Up</Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;