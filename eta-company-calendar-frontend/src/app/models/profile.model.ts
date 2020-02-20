export interface Profile {
  userId: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string | Date;
  dateOfEntry: string | Date;
  department: string;
  position: string;
  team: string;
  leader: string;
}
