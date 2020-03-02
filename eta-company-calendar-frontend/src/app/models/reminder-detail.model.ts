import { Recurring } from './recurring.model';

export interface ReminderDetail {
  title: string;
  description: string;
  startingTime: number;
  createdAt: number;
  updatedAt: number;
  recurring: Recurring;
  createdBy: string;
  createdByUser: number;
}
