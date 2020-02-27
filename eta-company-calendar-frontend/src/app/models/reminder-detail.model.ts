import { Recurring } from './recurring.model';

export interface ReminderDetail {
  title: string;
  description: string;
  recurring: Recurring;
  startingTime: number;
  finishTime: number;
  createdBy: string;
}
