import { Location } from './location.model';
import { Recurrence } from './recurrence.model';
import { Recurring } from './recurring.model';

export interface MeetingDetail {
  id: number;
  title: string;
  description: string;
  location: Location;
  otherLocation: string;
  recurring: Recurring;
  rrule?: Recurrence;
  startingTime: number;
  finishTime: number;
  createdBy: string;
  createdByUser: number;
  requiredAttendants: number[];
  optionalAttendants: number[];
}
