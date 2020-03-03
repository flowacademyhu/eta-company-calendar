import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventListItem } from '~/app/models/event.model';
import { AbstractApiConnector } from '~/app/shared/api-connectors/AbstractApiConnector';

export class EventApiConnector extends AbstractApiConnector {
  protected readonly apiRoute: string = `${this.apiBaseUrl}/api/events`;

  public getEventsByIdAndTimeRange(userId: number,
                                   startingTimeFrom: number,
                                   startingTimeTo: number
                                   ): Observable<EventListItem[]> {

const params: HttpParams = new HttpParams()
.append('startingTimeFrom', startingTimeFrom.toString())
.append('startingTimeTo', startingTimeTo.toString());

return this.http.get<EventListItem[]>(`${this.apiRoute}/user/${userId}`, { params });
}

}