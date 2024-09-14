import React, { ReactElement, useState } from 'react';
import { Auth0Error } from 'auth0-js';
import { Button, Form, FormProps, Divider } from 'antd';
import { Link } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import { userValidator } from '../validators';
import { IUser } from '../types';
import { useAuth } from '../contexts';
import { AuthPageLayout, Input } from '../components';

const LoginPage = (): ReactElement => {
  const { onLogin, onGoogleSignIn } = useAuth();
  const [form] = Form.useForm();
  const [error, setError] = useState<null | Auth0Error>(null);

  const onSubmit: FormProps<IUser>['onFinish'] = async (values) => {
    const { email, password } = values;
    try {
      await onLogin({ email, password });
    } catch (e) {
      setError(e as Auth0Error);
    }
  };

  return (
    <AuthPageLayout errorMessage={error?.description || null}>
      <GoogleButton onClick={onGoogleSignIn} style={{ width: '100%' }} />
      <Divider>OR</Divider>
      <Form onFinish={onSubmit} form={form} layout="vertical">
        <Input
          name="email"
          label="Email"
          placeholder="email"
          rules={userValidator.email}
        />
        <Input
          name="password"
          label="Password"
          placeholder="password"
          rules={userValidator.password}
          hideValue
        />
        <div className="mt-2">
          Don&apos;t have an account?
          {' '}
          <Link to="/signup">Signup</Link>
        </div>
        <Button style={{ marginTop: 20 }} className="mt-2" htmlType="submit">Login</Button>
      </Form>
    </AuthPageLayout>
  );
};

export default LoginPage;
