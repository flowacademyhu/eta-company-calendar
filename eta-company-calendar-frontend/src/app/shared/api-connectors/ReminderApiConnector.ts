import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReminderCreate } from '~/app/models/reminder-create.model';
import { ReminderDetail } from '~/app/models/reminder-detail-model';
import { ReminderListItem } from '~/app/models/reminder-list-item.model';
import { AbstractApiConnector } from '~/app/shared/api-connectors/AbstractApiConnector';

export class ReminderApiConnector extends AbstractApiConnector {
  protected readonly apiRoute: string = `${this.apiBaseUrl}/api/reminders`;

  public findByUserId(userId: number): Observable<ReminderDetail[]> {
    return this.http.get<ReminderDetail[]>(`${this.apiRoute}/own/${userId}`);
  }

  public getReminder(id: number): Observable<ReminderDetail> {
    return this.http.get<ReminderDetail>(`${this.apiRoute}/${id}`);
  }

  public getReminderById(reminderId: number): Observable<ReminderDetail> {
    return this.http.get<ReminderDetail>(`${this.apiRoute}/${reminderId}`);
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

    return this.http.get<ReminderListItem[]>(`${this.apiRoute}/user/${userId}`, { params });
  }

  public getAllReminder(): Observable<ReminderDetail[]> {
    return this.http.get<ReminderDetail[]>(`${this.apiRoute}/`);
  }
  public getRemindersByUserId(userid: number): Observable<ReminderDetail[]> {
    const params = new HttpParams().set('startTime'
                                    , Date.now()
                                    .toString());
    return this.http.get<ReminderDetail[]>(`${this.apiRoute}/own/${userid}`
                    ,  {params});
  }

  public postReminder(reminder: ReminderCreate): Observable<ReminderCreate> {
    return this.http.post<ReminderCreate>(`${this.apiRoute}/`, reminder);
  }

  public deleteReminder(reminderId: number) {
    return this.http.delete(`${this.apiRoute}/${reminderId}`);
  }

  public getMeetingsByIdAndTimeRange(userId: number,
                                     startingTimeFrom: number,
                                     startingTimeTo: number
                                    ): Observable<ReminderListItem[]> {

    const params: HttpParams = new HttpParams()
      .append('startingTimeFrom', startingTimeFrom.toString())
      .append('startingTimeTo', startingTimeTo.toString());
    return this.http.get<ReminderListItem[]>(`${this.apiRoute}/list/user/${userId}`, { params });
  }
}
