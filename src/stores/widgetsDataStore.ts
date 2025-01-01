import { create } from 'zustand';
import { apiRequest } from './apiRequest';
import { ITenantDisease, APIResult } from '../types';

interface WidgetsDataState {
  tableWidgetData: ITenantDisease[],
  loadDashboardWidgetsData: () => Promise<APIResult<{ tableWidgetData: ITenantDisease[] }>>,
}

const endpoint = '/';

const useWidgetsDataStore = create<WidgetsDataState>((set) => ({
  tableWidgetData: [],
  loadDashboardWidgetsData: async () => apiRequest<{ tableWidgetData: ITenantDisease[] }>({
    path: `${endpoint}/table-widget`,
    onSuccess: (data) => set({ tableWidgetData: data.tableWidgetData }),
  }),
}));

export default useWidgetsDataStore;
