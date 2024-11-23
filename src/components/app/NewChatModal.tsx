import { ReactElement, useState } from 'react';
import {
  Modal, Form, Skeleton,
  Select as AntdSelect, Button, FormProps,
} from 'antd';
import { useDispatchPromise } from '../../hooks';
import { useChatsStore } from '../../stores';
import { ITenantParticipant, IUser } from '../../types';
import { messageValidator } from '../../validators';
import Resolve from '../helpers/Resolve';
import Select from '../controls/Select';
import TextArea from '../controls/TextArea';

const { Option } = AntdSelect;

interface Props {
  open: boolean,
  closeModal: () => void,
}

interface IForm {
  recipient: string,
  content: string,
}

const ModalBody = ({ closeModal }: { closeModal: () => void }): ReactElement => {
  const { getAvailableContacts, createNewMessage } = useChatsStore();
  const loadPromise = useDispatchPromise(getAvailableContacts);
  const [form] = Form.useForm<IForm>();
  const [loading, setLoading] = useState(false);
  const [, setError] = useState<null | undefined | Error>(null);

  const onSubmit: FormProps<IForm>['onFinish'] = async (values) => {
    const { recipient, content } = values;
    try {
      setLoading(true);
      const { hasError } = await createNewMessage(recipient, content);
      if (!hasError) {
        form.resetFields();
        closeModal();
      }
    } catch (e) {
      setError(e as Error);
    }
    setLoading(false);
  };

  return (
    <Resolve promises={[loadPromise]} loader={<Skeleton active paragraph={{ rows: 4 }} />}>
      {(data) => (
        <Form onFinish={onSubmit} form={form} layout="vertical">
          <Select
            placeholder="Select a recipient bellow"
            name="recipient"
            rules={messageValidator.recipient}
            label="Recipient"
          >
            {(data.data.contacts as Array<ITenantParticipant & IUser>).map((participant) => (
              <Option
                key={`send-message-contact-${participant.id}`}
                value={participant.id}
              >
                {participant.first_name}
                &nbsp;
                {participant.last_name}
              </Option>
            ))}
          </Select>
          <TextArea rules={messageValidator.recipient} name="content" placeholder="" />
          <div className="flex justify-end">
            <Button htmlType="submit" disabled={loading}>
              Send!
            </Button>
          </div>
        </Form>
      )}
    </Resolve>
  );
};

const NewChatModal = ({ open, closeModal }: Props): ReactElement => (
  <Modal
    title={<div>Send message to..</div>}
    open={open}
    onCancel={closeModal}
    okButtonProps={{ style: { display: 'none' } }}
    footer={<></>}
  >
    <ModalBody closeModal={closeModal} />
  </Modal>
);

export default NewChatModal;
