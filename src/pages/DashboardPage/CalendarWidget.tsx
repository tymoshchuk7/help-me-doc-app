import React, { ReactElement, useMemo, useCallback } from 'react';
import type { BadgeProps, CalendarProps } from 'antd';
import { Badge, Calendar } from 'antd';
import dayjs, { type Dayjs } from 'dayjs';
import { useDispatchPromise } from '../../hooks';
import { useWidgetsDataStore } from '../../stores';
import { Resolve } from '../../components';
import { ITenantAppointment } from '../../types';

const appointmentStatuses: Record<ITenantAppointment['status'], string> = {
  pending: 'warning',
  completed: 'success',
  confirmed: 'success',
  cancelled: 'error',
};

const CalendarWidget = ({ appointments }: { appointments: ITenantAppointment[] }): ReactElement => {
  // eslint-disable-next-line arrow-body-style
  const groupAppointments = useMemo(() => {
    return appointments.reduce<Record<string, ITenantAppointment[]>>((acc, cur) => {
      const timestamp = dayjs(cur.scheduled_at).format('YYYY-MM-DD');
      if (!acc[timestamp]) {
        acc[timestamp] = [];
      }
      acc[timestamp].push(cur);
      return acc;
    }, {});
  }, [appointments]);

  const getListData = useCallback((value: Dayjs) => {
    const timestamp = value.format('YYYY-MM-DD');
    const dayData = groupAppointments[timestamp] ?? [];
    return dayData.map((item) => ({
      type: appointmentStatuses[item.status],
      content: `Appointment with ${item.patient_full_name}`,
    }));
  }, [groupAppointments]);

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type as BadgeProps['status']} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') {
      return dateCellRender(current);
    }
    return info.originNode;
  };

  return <Calendar cellRender={cellRender} />;
};

const Container = (): React.ReactElement => {
  const { loadCalendarWidgetsData } = useWidgetsDataStore();
  const loadDataPromise = useDispatchPromise(loadCalendarWidgetsData);

  return (
    <Resolve promises={[loadDataPromise]}>
      {(data) => (
        <CalendarWidget appointments={data?.data?.data ?? []} />
      )}
    </Resolve>
  );
};

export default Container;
