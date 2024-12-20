import { ReactElement, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Auth0Error } from 'auth0-js';
import { Button, Divider, Form, FormProps } from 'antd';
import GoogleButton from 'react-google-button';
import { useAuth } from '../contexts';
import { userValidator } from '../validators';
import { useInvitationsStore } from '../stores';
import { IUser } from '../types';
import { AppRouteNames } from '../constants';
import { AuthPageLayout, Input } from '../components';

type TForm = Pick<IUser, 'email' | 'last_name' | 'first_name' | 'password'>;

const SignUpPage = (): ReactElement => {
  const { onSignUp, onGoogleSignIn } = useAuth();
  const { preservedInvitation } = useInvitationsStore();
  const navigate = useNavigate();
  const [form] = Form.useForm<TForm>();
  const [error, setError] = useState<null | Auth0Error>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.setFieldValue('email', preservedInvitation?.email || '');
    // eslint-disable-next-line
  }, []);

  const onSubmit: FormProps<TForm>['onFinish'] = async (values) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { email, password, first_name, last_name } = values;
    try {
      setLoading(true);
      await onSignUp({
        email,
        password,
        first_name,
        last_name,
      });
      navigate(AppRouteNames.login);
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
          disabled={!!preservedInvitation?.email}
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
        <div>
          Already have an account?
          {' '}
          <Link to="/login">Login</Link>
        </div>
        <Button
          disabled={loading}
          loading={loading}
          style={{ marginTop: 20 }}
          htmlType="submit"
        >
          Sign Up
        </Button>
      </Form>
    </AuthPageLayout>
  );
};

export default SignUpPage;
