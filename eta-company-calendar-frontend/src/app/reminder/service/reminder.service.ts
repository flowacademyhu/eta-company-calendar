import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Reminder } from '~/app/models/reminder.model';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';

@Injectable()
export class ReminderService {

  constructor(private readonly api: ApiCommunicationService) { }

  private _reminderSub: BehaviorSubject<Reminder[]> = new BehaviorSubject<Reminder[]>([]);

  public get reminderSub() {
    return this._reminderSub;
  }

  public getRemindersByUserId(userid: number) {
     this.api.reminder()
    .getRemindersByUserId(userid)
    .subscribe((reminder: Reminder[]) => {
      this._reminderSub.next(reminder); });
  }

}
