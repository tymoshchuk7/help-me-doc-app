import { ReactElement } from 'react';
import {
  Button, Form, FormProps,
  Select as AntdSelect,
} from 'antd';
import { useInvitationsStore } from '../../stores';
import { invitationValidator } from '../../validators';
import { CreateInvitationDTO } from '../../types';
import Input from './Input';
import Select from './Select';

const { Option } = AntdSelect;

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 2, span: 16 },
};

const InviteParticipant = (): ReactElement => {
  const [form] = Form.useForm();
  const { createInvitation } = useInvitationsStore();

  const onReset = () => {
    form.resetFields();
  };

  const onFinish: FormProps<CreateInvitationDTO>['onFinish'] = async (data) => {
    const { hasError } = await createInvitation(data);
    if (!hasError) {
      onReset();
    }
  };

  return (
    <Form
      {...layout}
      form={form}
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Input
        name="email"
        label="Email"
        placeholder="email"
        rules={invitationValidator.email}
      />
      <Select
        name="role"
        label="Role"
        placeholder="select one of the roles"
        rules={invitationValidator.role}
      >
        <Option value="patient">Patient</Option>
        <Option value="doctor">Doctor</Option>
        <Option value="admin">Admin</Option>
      </Select>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset} className="ml-20">
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default InviteParticipant;
