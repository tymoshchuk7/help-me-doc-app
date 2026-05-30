import { Rule } from 'antd/lib/form';
import { CreateAppointmentDTO } from '../types';

export const appointmentValidator: Record<keyof CreateAppointmentDTO, Rule[]> = {
  patient_participant_id: [{
    required: true,
    message: 'Please select a patient.',
  }],
  scheduled_at: [{
    required: true,
    message: 'Please select a starting date.',
  }],
} as const;
