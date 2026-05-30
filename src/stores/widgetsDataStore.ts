import { create } from 'zustand';
import { apiRequest } from './helpers';
import { ITenantDisease, APIResult, ITenantAppointment } from '../types';

interface WidgetsDataState {
  tableWidgetData: ITenantDisease[],
  calendarWidgetData: ITenantAppointment[],
  loadDashboardWidgetsData: () => Promise<APIResult<{ data: ITenantDisease[] }>>,
  loadCalendarWidgetsData: () => Promise<APIResult<{ data: ITenantAppointment[] }>>,
}

const endpoint = '/';

const useWidgetsDataStore = create<WidgetsDataState>((set) => ({
  tableWidgetData: [],
  calendarWidgetData: [],
  loadDashboardWidgetsData: async () => apiRequest<{ data: ITenantDisease[] }>({
    path: `${endpoint}/table-widget`,
    onSuccess: (data) => set({ tableWidgetData: data.data }),
  }),
  loadCalendarWidgetsData: async () => apiRequest<{ data: ITenantAppointment[] }>({
    path: `${endpoint}/calendar-widget`,
    onSuccess: (data) => set({ calendarWidgetData: data.data }),
  }),
}));

export default useWidgetsDataStore;
