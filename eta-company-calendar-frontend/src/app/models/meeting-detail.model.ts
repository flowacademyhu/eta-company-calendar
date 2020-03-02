import { Location } from './location.model';
import { Recurrence } from './recurrence.model';
import { Recurring } from './recurring.model';

export interface MeetingDetail {
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
  requiredAttendants: string[];
  optionalAttendants: string[];
}
