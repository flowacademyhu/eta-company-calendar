import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MeetingDetail } from '~/app/models/meeting-detail.model';
import { AbstractApiConnector } from '~/app/shared/api-connectors/AbstractApiConnector';

export class MyMeetingsApiConnector extends AbstractApiConnector {
  protected readonly apiRoute: string = `${this.apiBaseUrl}/api`;

  public getMeeting(meetingId: number): Observable<MeetingDetail> {
    return this.http.get<MeetingDetail>(`${this.apiRoute}/meetings/${meetingId}`);
  }

  public getAllMeetings(): Observable<MeetingDetail[]> {
    return this.http.get<MeetingDetail[]>(`${this.apiRoute}/meetings`);
  }

  public getMeetingsByUserId(userid: number): Observable<MeetingDetail[]> {
    const params = new HttpParams().set('currentTime'
                                    , Date.now()
                                    .toString());
    return this.http.get<MeetingDetail[]>(`${this.apiRoute}/meetings/user/${userid}`
                    ,  {params});
  }
}
