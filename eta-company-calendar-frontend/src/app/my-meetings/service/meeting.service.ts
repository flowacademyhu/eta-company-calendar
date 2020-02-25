import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MeetingDetail } from '~/app/models/meeting-detail.model';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';

@Injectable()
export class MeetingService {

  constructor(private readonly api: ApiCommunicationService) { }

  private _meetingSub: BehaviorSubject<MeetingDetail[]> = new BehaviorSubject<MeetingDetail[]>([]);

  public get meetingSub() {
    return this._meetingSub;
  }

  public getAllMeetings() {
     this.api.meeting()
    .getMeetingsByIdAndTimeRange(1, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);

  }

}
