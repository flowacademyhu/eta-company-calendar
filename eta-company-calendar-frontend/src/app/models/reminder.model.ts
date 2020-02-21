export interface Reminder {

  id: number;
  title: string;
  description: string;
  startingTime: number;
  endingTime: number;
  recurring: string;
  userid: number;
}
