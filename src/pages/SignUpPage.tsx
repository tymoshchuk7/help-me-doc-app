import React, { ReactElement, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Auth0Error } from 'auth0-js';
import { Button, Divider, Form, FormProps } from 'antd';
import GoogleButton from 'react-google-button';
import { IUser } from '../types';
import { AuthPageLayout, Input } from '../components';
import { userValidator } from '../validators';
import { useAuth } from '../contexts';

const SignUpPage = (): ReactElement => {
  const { onSignUp, onGoogleSignIn } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [error, setError] = useState<null | Auth0Error>(null);

  const onSubmit: FormProps<IUser>['onFinish'] = async (values) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { email, password, first_name, last_name } = values;
    try {
      await onSignUp({
        email,
        password,
        first_name,
        last_name,
      });
      navigate('/login');
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
          name="first_name"
          label="First name"
          placeholder="first name"
          rules={userValidator.first_name}
        />
        <Input
          name="last_name"
          label="Last name"
          placeholder="last name"
          rules={userValidator.last_name}
        />
        <Input
          name="password"
          label="Password"
          placeholder="password"
          rules={userValidator.password}
          hideValue
        />
        <div className="mt-2">
          Already have an account?
          {' '}
          <Link to="/login">Login</Link>
        </div>
        <Button style={{ marginTop: 20 }} htmlType="submit">Sign Up</Button>
      </Form>
    </AuthPageLayout>
  );
};

export default SignUpPage;
