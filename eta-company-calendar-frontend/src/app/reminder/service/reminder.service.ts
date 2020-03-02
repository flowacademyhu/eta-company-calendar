import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Reminder } from '~/app/models/reminder.model';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';

@Injectable()
export class ReminderService {

  constructor(private readonly api: ApiCommunicationService) { }

  private _reminderSub: BehaviorSubject<Reminder[]> = new BehaviorSubject<Reminder[]>([]);

  public get reminderSub() {
    return this._reminderSub;
  }

  public getRemindersByUserId(userid: number): Observable<Reminder[]> {
     return this.api.reminder()
    .getRemindersByUserId(userid);
  }

  public deleteReminder(id: number) {
    return this.api.reminder()
    .deleteReminder(id);
  }

}
