import { Rule } from 'antd/lib/form';
import { CreateDiseaseDTO } from '../types';

export const diseaseValidator: Record<keyof CreateDiseaseDTO, Rule[]> = {
  name: [{
    required: true,
    message: 'Please pass disease name.',
  }, {
    max: 150,
    message: 'Disease name must be max 150 characters long.',
  }],
  description: [{
    max: 2048,
    message: 'Disease description must be max 2048 characters long.',
  }],
  treatment: [{
    max: 2048,
    message: 'Disease treatment must be max 2048 characters long.',
  }],
  status: [{
    enum: ['active', 'resolved', 'chronic'],
    message: 'Please select one of the following statuses.',
  }],
  patient_participant_id: [{
    required: true,
    message: 'Please select a patient.',
  }],
} as const;
