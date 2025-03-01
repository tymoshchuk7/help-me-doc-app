import { ReactElement, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
  Button, Form, FormProps,
  Select as AntdSelect,
} from 'antd';
import { useDispatchPromise } from '../hooks';
import { useDiseasesStore, useUserStore } from '../stores';
import { diseaseValidator } from '../validators';
import { ITenantDisease } from '../types';
import { DISEASES_STATUSES } from '../constants';
import { Select, Input, TextArea, Resolve } from '../components';

const { Option } = AntdSelect;

type TForm = Pick<ITenantDisease, 'name' | 'treatment' | 'status' | 'description' | 'patient_participant_id'>;

const DiseasePage = (): ReactElement => {
  const { id } = useParams<{ id: string }>();
  const { diseases, updateDisease } = useDiseasesStore();
  const { me } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [, setError] = useState<null | undefined | Error>(null);
  const [form] = Form.useForm<TForm>();

  const disease = useMemo(() => diseases[id], [diseases, id]);
  const formDisabled = useMemo(
    () => disease.doctor_participant_id !== me?.participant?.id,
    [disease, me],
  );

  const onSubmit: FormProps<TForm>['onFinish'] = async (values) => {
    try {
      setLoading(true);
      await updateDisease(id, values);
    } catch (e) {
      setError(e as Error);
    }
    setLoading(false);
  };

  return (
    <Form
      disabled={formDisabled}
      onFinish={onSubmit}
      form={form}
      layout="vertical"
      initialValues={{ ...disease }}
    >
      <Input
        label="Name"
        name="name"
        placeholder="Disease name"
        rules={diseaseValidator.name}
        defaultValue="name"
      />
      <Select
        placeholder="Select a status bellow"
        name="status"
        rules={diseaseValidator.status}
        label="Status"
      >
        {DISEASES_STATUSES.map((option) => (
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
        {!formDisabled && (
          <Button htmlType="submit" disabled={loading}>
            Update
          </Button>
        )}
      </div>
    </Form>
  );
};

const DiseasePageContainer = (): ReactElement => {
  const { retrieveDisease } = useDiseasesStore();
  const { id } = useParams<{ id: string }>();
  const retrieveDiseasePromise = useMemo(() => () => retrieveDisease(id!), [id, retrieveDisease]);
  const loadDiseasesPromise = useDispatchPromise(retrieveDiseasePromise);

  return (
    <Resolve promises={[loadDiseasesPromise]}>
      {() => <DiseasePage />}
    </Resolve>
  );
};

export default DiseasePageContainer;
