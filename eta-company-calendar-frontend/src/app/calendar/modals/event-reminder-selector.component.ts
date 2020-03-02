import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EventInput } from '@fullcalendar/core';
import { Observable } from 'rxjs';
import { UserResponse } from '~/app/models/user-response.model';
import { MeetingCreateComponent } from './meeting-create.component';

@Component({
  selector: 'app-event-reminder-selector',
  template: `
    <div align=center>
      <h2>{{'eventselector.dialog_title' | translate | uppercase}}</h2>
      <h4>{{'eventselector.selector_title' | translate | uppercase}}</h4>
    </div>
    <a mat-stroked-button (click)=newMeeting() mat-dialog-close>{{'eventselector.new_meeting' | translate}}</a>
    <br>
    <a mat-stroked-button >{{'eventselector.new_reminder' | translate}}</a>
  `,
  styles: [`
    a {
      border: 2px solid;
      border-color: black !important;
      width: 200px;
      margin-bottom: 10%;
    }
  `]
})
export class EventReminderSelectorComponent {

  protected loggedInUser: UserResponse;
  protected selectedUser: UserResponse;
  protected userEmployees$: Observable<UserResponse[]>;

  constructor(private readonly dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) private readonly data: DialogData) { }

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
