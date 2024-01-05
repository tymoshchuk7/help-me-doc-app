import React, {
  ReactElement, useCallback, useState,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Modal, Form, Select,
} from 'antd';
import { createChat } from '../../redux/chatsReducer';
import { RootState, AppDispatch } from '../../store';

const { Option } = Select;

interface Props {
  open: boolean,
  onHideModal: () => void,
}

const CreateChatModal = ({ open, onHideModal }: Props): ReactElement => {
  const [loading, setOnLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const allParticipants = useSelector(({ participants }: RootState) => participants.data);
  const allUsers = useSelector(({ user }: RootState) => user.data);
  const [form] = Form.useForm<{ recipient: string }>();

  const onSubmit = useCallback(async () => {
    setOnLoading(true);
    const participantRecipientId = form.getFieldValue('recipient');
    try {
      await dispatch(createChat({ participantRecipientId }));
    } catch {}
    setOnLoading(false);
  }, [dispatch, form]);

  return (
    <Modal
      title="Basic Modal"
      open={open}
      onOk={onSubmit}
      onCancel={onHideModal}
      okText="Create"
      confirmLoading={loading}
    >
      <Form
        form={form}
        name="control-hooks"
        onFinish={onSubmit}
        style={{ maxWidth: 600 }}
        className="mt-2"
      >
        <Form.Item name="recipient" label="Role" rules={[{ required: true }]}>
          <Select
            placeholder="Select a option and change input text above"
            allowClear
          >
            {Object.values(allParticipants).map(({ id, user_id }) => (
              <Option value={id} key={id}>
                {allUsers[user_id].first_name}&nbsp;{allUsers[user_id].last_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateChatModal;