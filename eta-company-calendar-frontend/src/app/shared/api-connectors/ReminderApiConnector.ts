import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractApiConnector } from '~/app/shared/api-connectors/AbstractApiConnector';
import { Reminder } from '../../models/reminder.model';

export class ReminderApiConnector extends AbstractApiConnector {
  protected readonly apiRoute: string = `${this.apiBaseUrl}/api`;

  public getReminder(id: number): Observable<Reminder> {
    return this.http.get<Reminder>(`${this.apiRoute}/reminders/${id}`);
  }

  public getAllReminder(): Observable<Reminder[]> {
    return this.http.get<Reminder[]>(`${this.apiRoute}/reminders/`);
  }
  public getRemindersByUserId(userid: number): Observable<Reminder[]> {
    const params = new HttpParams().set('currentTime'
                                    , Date.now()
                                    .toString());
    return this.http.get<Reminder[]>(`${this.apiRoute}/reminders/user/time/${userid}`
                    ,  {params});
  }

  public postReminder(reminder: Reminder): Observable<Reminder> {
    return this.http.post<Reminder>(`${this.apiRoute}/reminders/`, reminder);
  }

}
