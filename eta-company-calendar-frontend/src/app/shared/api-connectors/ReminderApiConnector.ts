import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractApiConnector } from '~/app/shared/api-connectors/AbstractApiConnector';
import { ReminderDetail } from '../../models/reminder-detail.model';

export class ReminderApiConnector extends AbstractApiConnector {
  protected readonly apiRoute: string = `${this.apiBaseUrl}/api`;

  public getReminder(id: number): Observable<ReminderDetail> {
    return this.http.get<ReminderDetail>(`${this.apiRoute}/reminders/${id}`);
  }

  public getAllReminder(): Observable<ReminderDetail[]> {
    return this.http.get<ReminderDetail[]>(`${this.apiRoute}/reminders/`);
  }
  public getRemindersByUserId(userid: number): Observable<ReminderDetail[]> {
    const params = new HttpParams().set('startTime'
                                    , Date.now()
                                    .toString());
    return this.http.get<ReminderDetail[]>(`${this.apiRoute}/reminders/user/time/${userid}`
                    ,  {params});
  }

  public create(reminder: ReminderDetail): Observable<ReminderDetail> {
    return this.http.post<ReminderDetail>(`${this.apiRoute}/reminders/`, reminder);
  }

}
