import { Rrule } from './rrule.model';

export interface ReminderListItem {
  id: number;
  title: number;
  startingTime: number;
  description: string;
  rrule?: Rrule;
}
