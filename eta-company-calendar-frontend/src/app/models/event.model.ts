import { Rrule } from './rrule.model';

export interface EventListItem {
  id: number;
  title: string;
  startingTime: string;
  eventType: EventType;
  finishTime?: number;
  rrule?: Rrule;
}

export enum EventType {
  MEETING = 'MEETING', REMINDER = 'REMINDER'
}
