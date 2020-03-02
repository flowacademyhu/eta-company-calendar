import { Rrule } from './rrule.model';

export interface MeetingListItem {
  title: number;
  startingTime: number;
  finishTime: number;
  rrule?: Rrule;
}
