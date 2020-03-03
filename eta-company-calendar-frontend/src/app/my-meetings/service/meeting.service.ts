import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MeetingDetail } from '~/app/models/meeting-detail.model';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';

@Injectable()
export class MeetingService {

  constructor(private readonly api: ApiCommunicationService) { }

  private _meetingSub: BehaviorSubject<MeetingDetail[]> = new BehaviorSubject<MeetingDetail[]>([]);

  public get meetingSub() {
    return this._meetingSub;
  }

  public getMeetingsByInvitation(userId: number): Observable<MeetingDetail[]> {
     return this.api.meeting()
    .getMeetingsByInvitation(userId);
  }

  public deleteMeeting(id: number) {
    return this.api.meeting()
    .deleteMeeting(id);
  }

}
