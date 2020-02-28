import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractApiConnector } from '~/app/shared/api-connectors/AbstractApiConnector';
import { ReminderDetail } from '../../models/reminder-detail.model';
import { ReminderListItem } from '~/app/models/reminder-list-item.model';

export class ReminderApiConnector extends AbstractApiConnector {
  protected readonly apiRoute: string = `${this.apiBaseUrl}/api`;

  public findByUserId(userId: number): Observable<ReminderDetail[] > {
    return this.http.get<ReminderDetail[]>(`${this.apiRoute}/reminders/own/${userId}`);
  }

  public getRemindersByInvitation(userId: number): Observable<ReminderDetail[]> {
    return this.http.get<ReminderDetail[]>(`${this.apiRoute}/invited/${userId}`);
  }

  public getRemindersByIdAndTimeRange(userId: number,
                                      startingTimeFrom: number,
                                      startingTimeTo: number
                                     ): Observable<ReminderListItem[]> {

    const params: HttpParams = new HttpParams()
      .append('startingTimeFrom', startingTimeFrom.toString())
      .append('startingTimeTo', startingTimeTo.toString());

    return this.http.get<ReminderListItem[]>(`${this.apiRoute}/reminders/uesr/${userId}`, { params });
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
