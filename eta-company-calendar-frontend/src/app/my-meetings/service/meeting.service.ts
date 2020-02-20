import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Meeting } from '~/app/models/meeting.model';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';

@Injectable()
export class MeetingService {

  constructor(private readonly api: ApiCommunicationService) { }

  private _meetingSub: BehaviorSubject<Meeting[]> = new BehaviorSubject<Meeting[]>([]);

  public get meetingSub() {
    return this._meetingSub;
  }

  public getAllMeetings() {
     this.api.meeting()
    .getAllMeetings()
    .subscribe((meeting: Meeting[]) => {
      this._meetingSub.next(meeting);});

  }

}
