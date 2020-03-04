import { Recurrence } from './recurrence.model';
import { Recurring } from './recurring.model';

export interface ReminderDetail {
  id: number;
  title: string;
  description: string;
  startingTime: number;
  createdAt: number;
  updatedAt: number;
  recurring: Recurring;
  createdBy: string;
  createdByUser: number;
  rrule?: Recurrence;
}
