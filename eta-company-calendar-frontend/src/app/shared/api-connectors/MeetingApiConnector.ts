import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MeetingDetail } from '~/app/models/meeting-detail.model';
import { MeetingListItem } from '~/app/models/meeting-list-item.model';
import { AbstractApiConnector } from '~/app/shared/api-connectors/AbstractApiConnector';

export class MeetingApiConnector extends AbstractApiConnector {
  protected readonly apiRoute: string = `${this.apiBaseUrl}/api/meetings`;

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
    return this.http.post<number>(`${this.apiRoute}`, dto);
  }

}
