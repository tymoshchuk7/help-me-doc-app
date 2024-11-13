import { ReactElement } from 'react';
import {
  Modal, Form, Skeleton, Input,
  Select as AntdSelect, Button,
} from 'antd';
import Resolve from '../helpers/Resolve';
import { useDispatchPromise } from '../../hooks';
import { useChatsStore } from '../../stores';
import { ITenantParticipant, IUser } from '../../types';
import Select from '../controls/Select';

const { Option } = AntdSelect;
const { TextArea } = Input;

interface Props {
  open: boolean,
  closeModal: () => void,
}

interface Response {
  contacts: ITenantParticipant[],
}

const ModalBody = (): ReactElement => {
  const { getAvailableContacts } = useChatsStore();
  const loadPromise = useDispatchPromise<Response>(getAvailableContacts);

  return (
    <Resolve promises={[loadPromise]} loader={<Skeleton active paragraph={{ rows: 4 }} />}>
      {(data) => (
        <Form>
          <Select placeholder="Select a recipient bellow" name="recipient" rules={[]} label="Recipient">
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
          <TextArea style={{ height: 120, resize: 'none' }} />
          <div className="flex justify-end">
            <Button htmlType="submit" disabled style={{ marginTop: '24px' }}>
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
    <ModalBody />
  </Modal>
);

export default NewChatModal;
