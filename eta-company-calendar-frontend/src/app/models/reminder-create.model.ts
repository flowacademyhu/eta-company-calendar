import { Recurrence } from './recurrence.model';

export interface ReminderCreate {
  id?: number;
  title: string;
  description: string;
  startingTime: number;
  createdBy: string;
  rrule?: Recurrence;
}