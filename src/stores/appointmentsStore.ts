import { create } from 'zustand';
import { apiRequest, mergeDataIntoStore } from './helpers';
import {
  APIResult, ITenantAppointment, CreateAppointmentDTO,
  UpdateAppointmentDTO,
} from '../types';

interface AppointmentsState {
  appointments: Record<string, ITenantAppointment>,
  loadAppointments: () => Promise<APIResult<{ appointments: ITenantAppointment[] }>>,
  retrieveAppointment: (id: string) => Promise<APIResult<{ appointment: ITenantAppointment }>>,
  createAppointment: (
    appointment: CreateAppointmentDTO,
  ) => Promise<APIResult<{ appointment: ITenantAppointment }>>,
  updateAppointment: (
    id: string,
    appointment: UpdateAppointmentDTO,
  ) => Promise<APIResult<{ appointment: ITenantAppointment }>>
}

const endpoint = '/appointments';

const useAppointmentsStore = create<AppointmentsState>((setState, getState) => ({
  appointments: {},
  loadAppointments: async () => apiRequest<{ appointments: ITenantAppointment[] }>({
    path: endpoint,
    onSuccess: (data) => {
      const state = getState();

      return setState({
        appointments: mergeDataIntoStore(state.appointments, data.appointments),
      });
    },
  }),
  retrieveAppointment: async (id: string) => apiRequest<{ appointment: ITenantAppointment }>({
    path: `${endpoint}/${id}`,
    onSuccess: (data) => {
      const state = getState();

      return setState({
        appointments: mergeDataIntoStore(state.appointments, data.appointment),
      });
    },
  }),
  createAppointment: async (
    appointment: CreateAppointmentDTO,
  ) => apiRequest<{ appointment: ITenantAppointment }>({
    path: endpoint,
    body: { data: { ...appointment } },
    method: 'post',
    successToastMessage: 'Appointment has been scheduled',
    onSuccess: (data) => {
      const state = getState();

      return setState({
        appointments: mergeDataIntoStore(state.appointments, data.appointment),
      });
    },
  }),
  updateAppointment: async (
    id: string,
    disease: UpdateAppointmentDTO,
  ) => apiRequest<{ appointment: ITenantAppointment }>({
    path: `${endpoint}/${id}`,
    body: { data: { ...disease } },
    method: 'put',
    successToastMessage: 'Appointment has been updated',
    onSuccess: (data) => {
      const state = getState();

      return setState({
        appointments: mergeDataIntoStore(state.appointments, data.appointment),
      });
    },
  }),
}));

export default useAppointmentsStore;
