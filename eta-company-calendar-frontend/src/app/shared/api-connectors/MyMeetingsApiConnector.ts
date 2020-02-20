import { Observable } from 'rxjs';
import { AbstractApiConnector } from '~/app/shared/api-connectors/AbstractApiConnector';
import { Meeting } from '../../models/meeting.model';

export class MyMeetingsApiConnector extends AbstractApiConnector {
  protected readonly apiRoute: string = `${this.apiBaseUrl}/api`;

  public getMeeting(meetingId: number): Observable<Meeting> {
    return this.http.get<Meeting>(`${this.apiRoute}/meetings/${meetingId}`);
  }

  public getAllMeetings(): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${this.apiRoute}/meetings`);
  }
}
