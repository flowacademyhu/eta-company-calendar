import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReminderDetail } from '~/app/models/reminder-detail-model';
import { AbstractApiConnector } from '~/app/shared/api-connectors/AbstractApiConnector';

export class ReminderApiConnector extends AbstractApiConnector {
  protected readonly apiRoute: string = `${this.apiBaseUrl}/api`;

  public getReminder(id: number): Observable<ReminderDetail> {
    return this.http.get<ReminderDetail>(`${this.apiRoute}/reminders/${id}`);
  }

  public create(reminder: ReminderDetail): Observable<ReminderDetail> {
    return this.http.post<ReminderDetail>(`${this.apiRoute}`, reminder);
  }

  public getAllReminder(): Observable<ReminderDetail[]> {
    return this.http.get<ReminderDetail[]>(`${this.apiRoute}/reminders/`);
  }
  public getRemindersByUserId(userid: number): Observable<ReminderDetail[]> {
    const params = new HttpParams().set('startTime'
                                    , Date.now()
                                    .toString());
    return this.http.get<ReminderDetail[]>(`${this.apiRoute}/reminders/own/${userid}`
                    ,  {params});
  }

  public postReminder(reminder: ReminderDetail): Observable<ReminderDetail> {
    return this.http.post<ReminderDetail>(`${this.apiRoute}/reminders/`, reminder);
  }

  public deleteReminder(reminderId: number) {
    return this.http.delete(`${this.apiRoute}/reminders/${reminderId}`);
  }

  public updateReminder(reminder: ReminderDetail): Observable<ReminderDetail> {
    return this.http.put<ReminderDetail>(`${this.apiRoute}/reminders/`, reminder);
  }

}
