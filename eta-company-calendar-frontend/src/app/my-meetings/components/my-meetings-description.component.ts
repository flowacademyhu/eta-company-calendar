import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Meeting } from '~/app/models/meeting.model';
import { MeetingService } from '~/app/my-meetings/service/meeting.service';

@Component({
  selector: 'app-my-meetings-description',
  template: `
	<div>
	{{meetings$ | async}}
	<p></p>
	</div>
  `,
})
export class MyMeetingsDescriptionComponent implements OnInit {

  protected meetings$: Observable<Meeting[]>;

  constructor(private readonly meetingService: MeetingService) {}

  public ngOnInit() {
    this.meetingService.getAllMeetings();
    this.meetings$ = this.meetingService
    .meetingSub;
  }

}
