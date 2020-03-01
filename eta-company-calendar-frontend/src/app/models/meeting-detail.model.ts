import { Location } from './location.model';
import { Recurring } from './recurring.model';
import { Recurrence } from './recurrence.model';

export interface MeetingDetail {
  title: string;
  description: string;
  location: Location;
  otherLocation: string;
  recurring: Recurring;
  recurrence: Recurrence;
  startingTime: number;
  finishTime: number;
  createdBy: string;
  requiredAttendants: string[];
  optionalAttendants: string[];
}
