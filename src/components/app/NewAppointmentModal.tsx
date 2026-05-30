import { ReactElement, useState } from 'react';
import {
  Modal, Form, Skeleton,
  Select as AntdSelect, Button, FormProps,
} from 'antd';
import { useDispatchPromise } from '../../hooks';
import { useParticipantsStore, useAppointmentsStore } from '../../stores';
import { appointmentValidator } from '../../validators';
import { ITenantParticipant, IUser, CreateAppointmentDTO } from '../../types';
import Resolve from '../helpers/Resolve';
import Select from '../controls/Select';
import DatePicker from '../controls/DatePicker';

const { Option } = AntdSelect;

interface Props {
  open: boolean,
  closeModal: () => void,
}

const ModalBody = ({ closeModal }: { closeModal: () => void }): ReactElement => {
  const { loadParticipants } = useParticipantsStore();
  const { createAppointment } = useAppointmentsStore();
  const loadParticipantsPromise = useDispatchPromise(loadParticipants);
  const [form] = Form.useForm<CreateAppointmentDTO>();
  const [loading, setLoading] = useState(false);
  const [, setError] = useState<null | undefined | Error>(null);

  const onSubmit: FormProps<CreateAppointmentDTO>['onFinish'] = async (values) => {
    try {
      setLoading(true);
      const { hasError } = await createAppointment({ ...values });
      if (!hasError) {
        closeModal();
      }
    } catch (e) {
      closeModal();
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
            rules={appointmentValidator.patient_participant_id}
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
          <DatePicker label="Starting date" name="scheduled_at" rules={appointmentValidator.scheduled_at} />
          <div className="flex justify-end">
            <Button htmlType="submit" disabled={loading}>
              Create!
            </Button>
          </div>
        </Form>
      )}
    </Resolve>
  );
};

const NewDiseaseModal = ({ open, closeModal }: Props): ReactElement => (
  <Modal
    title={<div>Create appointment for..</div>}
    open={open}
    onCancel={closeModal}
    okButtonProps={{ style: { display: 'none' } }}
    footer={<></>}
  >
    <ModalBody closeModal={closeModal} />
  </Modal>
);

export default NewDiseaseModal;
