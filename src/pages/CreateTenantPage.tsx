import { ReactElement, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Button, Form, FormProps, Divider, Typography } from 'antd';
import { useUserStore } from '../stores';
import { tenantValidator } from '../validators';
import { AppRouteNames } from '../constants';
import { AuthPageLayout, Input } from '../components';

const { Title } = Typography;

const CreateTenantPage = (): ReactElement => {
  const navigate = useNavigate();
  const { createTenant } = useUserStore();
  const [form] = Form.useForm();
  const [error, setError] = useState<null | string | undefined>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit: FormProps<{ name: string }>['onFinish'] = async (values) => {
    const { name } = values;
    try {
      setLoading(true);
      const { hasError, error: apiError } = await createTenant(name);
      if (!hasError) {
        navigate(AppRouteNames.dashboard);
      } else {
        setError(apiError?.message);
      }
    } catch (e) {
      setError((e as Error).toString());
    }
    setLoading(false);
  };

  return (
    <AuthPageLayout errorMessage={error}>
      <Title level={4}>Create your tenant</Title>
      <Divider />
      <Form onFinish={onSubmit} form={form} layout="vertical">
        <Input
          name="name"
          label="Tenant name"
          placeholder="name"
          rules={tenantValidator.name}
        />
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

const CreateTenantPageContainer = (): ReactElement => {
  const { me } = useUserStore();

  return me?.default_tenant ? <Navigate to={AppRouteNames.dashboard} /> : <CreateTenantPage />;
};

export default CreateTenantPageContainer;
