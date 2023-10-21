import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Input, Select } from 'antd';
import { createInvitation } from '../redux/invitationsReducer';
import { AppDispatch } from '../store';

const { Option } = Select;

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 2, span: 16 },
};

const App: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = async (values: { email: string, role: string }) => {
    await dispatch(createInvitation(values));
    onReset();
  };

  return (
    <>
      <h3>Invite a participant</h3>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        className="mt-2"
      >
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="role" label="Role" rules={[{ required: true }]}>
          <Select
            placeholder="Select a option and change input text above"
            allowClear
          >
            <Option value="chief">Chief</Option>
            <Option value="patient">Patient</Option>
            <Option value="doctor">Doctor</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset} className="ml-2">
            Reset
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default App;