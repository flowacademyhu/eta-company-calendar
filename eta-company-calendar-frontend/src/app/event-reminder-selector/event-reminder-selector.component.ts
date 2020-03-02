import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EventInput } from '@fullcalendar/core';
import { Observable } from 'rxjs';
import { UserResponse } from '~/app/models/user-response.model';
import { MeetingCreateComponent } from './../calendar/modals/meeting-create.component';

@Component({
  selector: 'app-event-reminder-selector',
  templateUrl: './event-reminder-selector.component.html',
  styleUrls: ['./event-reminder-selector.component.scss']
})
export class EventReminderSelectorComponent implements OnInit {

  protected loggedInUser: UserResponse;
  protected selectedUser: UserResponse;
  protected userEmployees$: Observable<UserResponse[]>;

  constructor(private readonly dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) private readonly data: DialogData) { }

  // tslint:disable-next-line: no-empty
  public ngOnInit(): void {}

  protected newMeeting() {
    this.dialog.open(MeetingCreateComponent, {
      width: '500px',
      data: {
        startingTime: this.data.event.dateStr,
        user: this.data.user,
        isEmployee: this.data.isEmployee,
      }
    });
  }
}

export interface DialogData {
  event: EventInput;
  user: UserResponse;
  isEmployee: boolean;
}
