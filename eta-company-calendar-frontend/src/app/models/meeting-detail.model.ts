import { Location } from './location.model';
import { Recurring } from './recurring.model';

export interface MeetingDetail {
  title: string;
  description: string;
  location: Location;
  otherLocation: string;
  recurring: Recurring;
  startingTime: number;
  finishTime: number;
  createdBy: string;
  requiredAttendants: string[];
  optionalAttendants: string[];
}
