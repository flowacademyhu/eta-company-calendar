import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ReminderDetail } from '~/app/models/reminder-detail-model';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';

@Injectable()
export class ReminderService {

  constructor(private readonly api: ApiCommunicationService) { }

  private _reminderSub: BehaviorSubject<ReminderDetail[]> = new BehaviorSubject<ReminderDetail[]>([]);

  public get reminderSub() {
    return this._reminderSub;
  }

  public getRemindersByUserId(userId: number) {
     this.api.reminder()
    .getRemindersByUserId(userId)
    .subscribe((reminders: ReminderDetail[]) => {
      this._reminderSub.next(reminders); });
  }

  public deleteReminder(id: number) {
    return this.api.reminder()
    .deleteReminder(id);
  }

}
