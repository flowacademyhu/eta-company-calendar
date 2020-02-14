import { Recurring } from './recurring.model';

export interface MeetingDetail {
  title: string;
  description: string;
  location: Location;
  otherLocation: string;
  recurring: Recurring;
  startingTime: Date;
  finishTime: Date;
  createdBy: string;
  requiredAttendants: string[];
  optionalAttendants: string[];
}

enum Location {
  MEETING_ROOM,
  MARKS_OFFICE,
  ARONS_OFFICE,
  OTHER
}
