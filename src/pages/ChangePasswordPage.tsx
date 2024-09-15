import React, { ReactElement, useState } from 'react';
import { Auth0Error } from 'auth0-js';
import {
  Button, Form, FormProps, Typography,
} from 'antd';
import { Link } from 'react-router-dom';
import { userValidator } from '../validators';
import { IUser } from '../types';
import { useAuth } from '../contexts';
import { AuthPageLayout, Input } from '../components';

const ChangePasswordPage = (): ReactElement => {
  const { onChangePassword } = useAuth();
  const [form] = Form.useForm();
  const [error, setError] = useState<null | Auth0Error>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit: FormProps<IUser>['onFinish'] = async (values) => {
    const { email } = values;
    try {
      setLoading(true);
      await onChangePassword(email);
    } catch (e) {
      setError(e as Auth0Error);
    }
    setLoading(false);
  };

  return (
    <AuthPageLayout errorMessage={error?.description || null}>
      <Typography.Text>
        Please provide your email and follow the instructions sent to you.
      </Typography.Text>
      <Form onFinish={onSubmit} form={form} layout="vertical" style={{ marginTop: 10 }}>
        <Input
          name="email"
          label="Email"
          placeholder="email"
          rules={userValidator.email}
        />
        <div>
          Return to
          {' '}
          <Link to="/login">Login</Link>
          {' '}
          page
        </div>
        <Button
          loading={loading}
          disabled={loading}
          style={{ marginTop: 20 }}
          htmlType="submit"
        >
          Submit
        </Button>
      </Form>
    </AuthPageLayout>
  );
};

export default ChangePasswordPage;
