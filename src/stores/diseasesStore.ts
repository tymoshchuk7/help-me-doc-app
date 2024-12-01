import { create } from 'zustand';
import { apiRequest } from './apiRequest';
import { APIResult, ITenantDisease } from '../types';

interface DiseasesState {
  createDisease: (disease: Pick<ITenantDisease, 'name' | 'treatment' | 'status' | 'description' | 'patient_participant_id'>) => Promise<APIResult<{ disease: ITenantDisease }>>
}

const endpoint = '/diseases';

const useDiseasesStore = create<DiseasesState>(() => ({
  createDisease: async (disease: Pick<ITenantDisease, 'name' | 'treatment' | 'status' | 'description' | 'patient_participant_id'>) => apiRequest<{ disease: ITenantDisease }>({
    path: endpoint,
    body: { data: { ...disease } },
    method: 'post',
    successToastMessage: 'Disease has been created',
  }),
}));

export default useDiseasesStore;
