import { ReactElement, useState } from 'react';
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
  const [loading, setLoading] = useState(false);

  const onSubmit: FormProps<IUser>['onFinish'] = async (values) => {
    const { email, password } = values;
    try {
      setLoading(true);
      await onLogin({ email, password });
    } catch (e) {
      setError(e as Auth0Error);
    }
    setLoading(false);
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
        <div>
          Don&apos;t have an account?
          {' '}
          <Link to="/signup">Signup</Link>
        </div>
        <div>
          <Link to="/change-password">Forget password</Link>
        </div>
        <Button
          loading={loading}
          disabled={loading}
          style={{ marginTop: 20 }}
          htmlType="submit"
        >
          Login
        </Button>
      </Form>
    </AuthPageLayout>
  );
};

export default LoginPage;
