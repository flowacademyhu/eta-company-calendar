import { Rrule } from './rrule.model';

export interface MeetingListItem {
  id: number;
  title: number;
  startingTime: number;
  finishTime: number;
  rrule?: Rrule;
}
