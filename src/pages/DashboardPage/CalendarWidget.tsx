import React, { ReactElement, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { BadgeProps, CalendarProps } from 'antd';
import { Badge, Calendar } from 'antd';
import dayjs, { type Dayjs } from 'dayjs';
import { useDispatchPromise } from '../../hooks';
import { useWidgetsDataStore } from '../../stores';
import { AppRouteNames } from '../../constants';
import { Resolve } from '../../components';
import { ITenantAppointment } from '../../types';

const appointmentStatuses: Record<ITenantAppointment['status'], string> = {
  pending: 'warning',
  completed: 'success',
  cancelled: 'error',
};

const CalendarWidget = ({ appointments }: { appointments: ITenantAppointment[] }): ReactElement => {
  const navigate = useNavigate();
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
      id: item.id,
      type: appointmentStatuses[item.status],
      content: `Appointment with ${item.patient_full_name}`,
    }));
  }, [groupAppointments]);

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          // eslint-disable-next-line max-len
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
          <li key={item.content} onClick={() => navigate(AppRouteNames.appointment.replace(':id', item.id))}>
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
