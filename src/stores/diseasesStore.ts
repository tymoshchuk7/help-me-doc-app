import { create } from 'zustand';
import { apiRequest, mergeDataIntoStore } from './helpers';
import { APIResult, ITenantDisease } from '../types';

type CreateDiseaseDTO = Pick<ITenantDisease, 'name' | 'treatment' | 'status' | 'description' | 'patient_participant_id'>;
type UpdateDiseaseDTO = Pick<ITenantDisease, 'name' | 'treatment' | 'status' | 'description'>;

interface DiseasesState {
  diseases: Record<string, ITenantDisease>,
  loadDiseases: () => Promise<APIResult<{ diseases: ITenantDisease[] }>>,
  retrieveDisease: (id: string) => Promise<APIResult<{ disease: ITenantDisease }>>,
  createDisease: (disease: CreateDiseaseDTO) => Promise<APIResult<{ disease: ITenantDisease }>>,
  updateDisease: (id, disease: UpdateDiseaseDTO) => Promise<APIResult<{ disease: ITenantDisease }>>
}

const endpoint = '/diseases';

const useDiseasesStore = create<DiseasesState>((setState, getState) => ({
  diseases: {},
  loadDiseases: async () => apiRequest<{ diseases: ITenantDisease[] }>({
    path: endpoint,
    onSuccess: (data) => {
      const state = getState();

      return setState({
        diseases: mergeDataIntoStore(state.diseases, data.diseases),
      });
    },
  }),
  retrieveDisease: async (id: string) => apiRequest<{ disease: ITenantDisease }>({
    path: `${endpoint}/${id}`,
    onSuccess: (data) => {
      const state = getState();

      return setState({
        diseases: mergeDataIntoStore(state.diseases, [data.disease]),
      });
    },
  }),
  createDisease: async (disease: CreateDiseaseDTO) => apiRequest<{ disease: ITenantDisease }>({
    path: endpoint,
    body: { data: { ...disease } },
    method: 'post',
    successToastMessage: 'Disease has been created',
  }),
  updateDisease: async (id, disease: UpdateDiseaseDTO) => apiRequest<{ disease: ITenantDisease }>({
    path: `${endpoint}/${id}`,
    body: { data: { ...disease } },
    method: 'put',
    successToastMessage: 'Disease has been updated',
  }),
}));

export default useDiseasesStore;
