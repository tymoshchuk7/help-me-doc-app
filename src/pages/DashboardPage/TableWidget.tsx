import { ReactElement, useMemo } from 'react';
import { Table, Typography } from 'antd';
import type { TableColumnsType } from 'antd';
import { useDispatchPromise } from '../../hooks';
import { useWidgetsDataStore, useUserStore } from '../../stores';
import { Resolve } from '../../components';

const { Title } = Typography;

interface DiseaseDataType {
  key: React.Key;
  name: string;
  status: string;
  description: number;
  treatment: string;
}

interface ParticipantDataType {
  key: React.Key;
  participant_full_name: string;
  status: string;
  role: number;
  email: string;
  phone_number: string;
  description: string;
}

// columns patient, name, description,  status, treatment

const patientColumn = {
  title: 'Patient',
  dataIndex: 'patient_full_name',
};

const diseaseTableColumns: TableColumnsType<DiseaseDataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    filters: [
      {
        text: 'Active',
        value: 'active',
      },
      {
        text: 'Resolved',
        value: 'resolved',
      },
      {
        text: 'Chronic',
        value: 'chronic',
      },
    ],
    filterSearch: true,
    onFilter: (value, record) => record.status === value,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    ellipsis: true,
    width: '25%',
  },
  {
    title: 'Treatment',
    dataIndex: 'treatment',
    ellipsis: true,
    width: '25%',
  },
];

const participantTableColumns: TableColumnsType<ParticipantDataType> = [
  {
    title: 'Participant',
    dataIndex: 'participant_full_name',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Role',
    dataIndex: 'role',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Phone number',
    dataIndex: 'phone_number',
  },
];

type DataType = DiseaseDataType | ParticipantDataType;

const TableWidget = (): ReactElement => {
  const { loadDashboardWidgetsData } = useWidgetsDataStore();
  const { me } = useUserStore();
  const loadDataPromise = useDispatchPromise(loadDashboardWidgetsData);

  const tableColumns = useMemo(() => {
    const shouldRenderParticipants = me?.participant?.role === 'admin';
    if (shouldRenderParticipants) {
      return participantTableColumns;
    }
    return me?.participant?.role === 'patient' ? diseaseTableColumns : [
      patientColumn,
      ...diseaseTableColumns,
    ];
  }, [me?.participant?.role]);

  const tableHeading = useMemo(() => {
    switch (me?.participant?.role) {
      case 'chief':
        return 'Tenant diseases';
      case 'patient':
        return 'Your diseases';
      case 'doctor':
        return 'Created diseases';
      default:
        return 'Tenant participants';
    }
  }, [me?.participant?.role]);

  return (
    <>
      <Title level={3}>
        {tableHeading}
      </Title>
      <Resolve promises={[loadDataPromise]}>
        {(data) => (
          <Table
            <DataType>
            // @ts-ignore
            columns={tableColumns}
            dataSource={data?.data?.tableWidgetData || []}
          />
        )}
      </Resolve>
    </>
  );
};

export default TableWidget;
