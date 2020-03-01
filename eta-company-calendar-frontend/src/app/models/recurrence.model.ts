export interface Recurrence {
  rrule: string;
  dtstart: number;
  until?: number;
  duration?: number;
}
