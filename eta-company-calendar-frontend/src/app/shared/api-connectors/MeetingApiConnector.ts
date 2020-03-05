import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MeetingDetail } from '~/app/models/meeting-detail.model';
import { MeetingListItem } from '~/app/models/meeting-list-item.model';
import { AbstractApiConnector } from '~/app/shared/api-connectors/AbstractApiConnector';

export class MeetingApiConnector extends AbstractApiConnector {
  protected readonly apiRoute: string = `${this.apiBaseUrl}/api/meetings`;

  public getMeetingsByInvitation(userId: number): Observable<MeetingDetail[]> {
    return this.http.get<MeetingDetail[]>(`${this.apiRoute}/invited/${userId}`)
      .pipe(map((meetings) => {
        meetings.map((meeting) => {
          if (meeting.rrule) {
            const startingTime = meeting.rrule.dtstart;
            const duration = meeting.rrule.duration ? meeting.rrule.duration : 0;
            meeting.startingTime = startingTime;
            meeting.finishTime = startingTime + duration;
          }
          return meeting;
        });
        return meetings;
      }));
  }

  public getMeetingById(meetingId: number): Observable<MeetingDetail> {
      return this.http.get<MeetingDetail>(`${this.apiRoute}/${meetingId}`);
  }

  public getMeetingsByIdAndTimeRange(userId: number,
                                     startingTimeFrom: number,
                                     startingTimeTo: number
                                     ): Observable<MeetingListItem[]> {

    const params: HttpParams = new HttpParams()
      .append('startingTimeFrom', startingTimeFrom.toString())
      .append('startingTimeTo', startingTimeTo.toString());

    return this.http.get<MeetingListItem[]>(`${this.apiRoute}/user/${userId}`, { params });
  }

  public create(dto: MeetingDetail): Observable<number> {
    return this.http.post<number>(`${this.apiRoute}/sendEmail`, dto);
  }

  public update(dto: MeetingDetail): Observable<void> {
    return this.http.put<void>(`${this.apiRoute}`, dto);
  }

  public deleteMeeting(meetingId: number) {
    return this.http.delete(`${this.apiRoute}/${meetingId}`);
  }

}
