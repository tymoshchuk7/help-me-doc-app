import { ReactElement, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Button, Form, FormProps, Modal,
  Select as AntdSelect,
} from 'antd';
import { upperCase } from 'lodash';
import { useDispatchPromise } from '../hooks';
import { useAppointmentsStore, useUserStore } from '../stores';
import { updateAppointmentValidator } from '../validators';
import { UpdateAppointmentDTO, AppointmentStatus } from '../types';
import { Select, Resolve } from '../components';

const { Option } = AntdSelect;

const EditAppointmentPage = (): ReactElement => {
  const { id } = useParams<{ id: string }>();
  const { appointments, updateAppointment } = useAppointmentsStore();
  const { me } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [, setError] = useState<null | undefined | Error>(null);
  const [form] = Form.useForm<UpdateAppointmentDTO>();

  const appointment = useMemo(() => appointments[id!], [appointments, id]);
  const formDisabled = useMemo(
    () => appointment.doctor_participant_id !== me?.participant?.id,
    [appointment, me],
  );

  const onSubmit: FormProps<UpdateAppointmentDTO>['onFinish'] = async (values) => {
    try {
      setLoading(true);
      await updateAppointment(id!, values);
    } catch (e) {
      setError(e as Error);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center">
      <Form
        disabled={formDisabled}
        onFinish={onSubmit}
        form={form}
        layout="vertical"
        initialValues={{ ...appointment }}
        style={{ maxWidth: '700px', flexGrow: 1 }}
      >
        <Select
          placeholder="Select a status bellow"
          name="status"
          rules={updateAppointmentValidator.status}
          label="Status"
        >
          {Object.values(AppointmentStatus).map((status) => (
            <Option key={`disease-status-${status}`} value={status}>
              {upperCase(status)}
            </Option>
          ))}
        </Select>
        <div className="flex justify-end">
          {!formDisabled && (
            <Button htmlType="submit" disabled={loading}>
              Update
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

const AppointmentModal = (): ReactElement => {
  const navigate = useNavigate();

  return (
    <Modal
      title={<div>Appointment</div>}
      open
      onCancel={() => navigate('/')}
      okButtonProps={{ style: { display: 'none' } }}
      footer={<></>}
    >
      <EditAppointmentPage />
    </Modal>
  );
};

const AppointmentPageContainer = (): ReactElement => {
  const { retrieveAppointment } = useAppointmentsStore();
  const { id } = useParams<{ id: string }>();
  // eslint-disable-next-line max-len
  const retrieveDiseasePromise = useMemo(() => () => retrieveAppointment(id!), [id, retrieveAppointment]);
  const loadDiseasesPromise = useDispatchPromise(retrieveDiseasePromise);

  return (
    <Resolve promises={[loadDiseasesPromise]}>
      {() => <AppointmentModal />}
    </Resolve>
  );
};

export default AppointmentPageContainer;
