export interface Meeting {
  id: number;
  title: string;
  description: string;
  location: string;
  otherLocation: string;
  recurring: string;
  startingTime: number;
  finishTime: number;
  createdBy: any;
  updatedBy: any;
  requiredAttendants: any;
  optionalAttendants: any;
}
