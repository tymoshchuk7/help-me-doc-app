import { ReactElement, useState } from 'react';
import {
  Modal, Form, Skeleton,
  Select as AntdSelect, Button, FormProps,
} from 'antd';
import { useDispatchPromise } from '../../hooks';
import { useDiseasesStore, useParticipantsStore } from '../../stores';
import { diseaseValidator } from '../../validators';
import { ITenantParticipant, IUser, ITenantDisease } from '../../types';
import Resolve from '../helpers/Resolve';
import Select from '../controls/Select';
import TextArea from '../controls/TextArea';
import Input from '../controls/Input';

const { Option } = AntdSelect;

interface Props {
  open: boolean,
  closeModal: () => void,
}

type TForm = Pick<ITenantDisease, 'name' | 'treatment' | 'status' | 'description' | 'patient_participant_id'>;

const diseaseStatuses = [
  { value: 'active', label: 'Active' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'chronic', label: 'Chronic' },
];

const ModalBody = ({ closeModal }: { closeModal: () => void }): ReactElement => {
  const { createDisease } = useDiseasesStore();
  const { loadParticipants } = useParticipantsStore();
  const loadParticipantsPromise = useDispatchPromise(loadParticipants);
  const [form] = Form.useForm<TForm>();
  const [loading, setLoading] = useState(false);
  const [, setError] = useState<null | undefined | Error>(null);

  const onSubmit: FormProps<TForm>['onFinish'] = async (values) => {
    try {
      setLoading(true);
      const { hasError } = await createDisease({ ...values });
      if (!hasError) {
        closeModal();
      }
    } catch (e) {
      setError(e as Error);
    }
    setLoading(false);
  };

  return (
    <Resolve
      promises={[loadParticipantsPromise]}
      loader={<Skeleton active paragraph={{ rows: 4 }} />}
    >
      {(data) => (
        <Form onFinish={onSubmit} form={form} layout="vertical">
          <Select
            placeholder="Select a patient bellow"
            name="patient_participant_id"
            rules={diseaseValidator.patient_participant_id}
            label="Patient"
          >
            {(data.data.participants as Array<ITenantParticipant & IUser>).filter((participant) => participant.role === 'patient').map((participant) => (
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
          <Input
            label="Name"
            name="name"
            placeholder="Disease name"
            rules={diseaseValidator.name}
          />
          <Select
            placeholder="Select a status bellow"
            name="status"
            rules={diseaseValidator.status}
            label="Status"
          >
            {diseaseStatuses.map((option) => (
              <Option key={`disease-status-${option.value}`} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
          <TextArea
            label="Description"
            rules={diseaseValidator.description}
            name="description"
            placeholder="Disease description"
          />
          <TextArea
            label="Treatment"
            rules={diseaseValidator.treatment}
            name="treatment"
            placeholder="Disease description"
          />
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

const NewDiseaseModal = ({ open, closeModal }: Props): ReactElement => (
  <Modal
    title={<div>Create disease for..</div>}
    open={open}
    onCancel={closeModal}
    okButtonProps={{ style: { display: 'none' } }}
    footer={<></>}
  >
    <ModalBody closeModal={closeModal} />
  </Modal>
);

export default NewDiseaseModal;
