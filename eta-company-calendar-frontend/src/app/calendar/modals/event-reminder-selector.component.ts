import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EventInput } from '@fullcalendar/core';
import { Observable } from 'rxjs';
import { UserResponse } from '~/app/models/user-response.model';
import { MeetingCreateComponent } from './meeting-create.component';

@Component({
  selector: 'app-event-reminder-selector',
  template: `
    <div align="center">
      <h2>{{'eventselector.dialog_title' | translate | uppercase}}</h2>
      <h4>{{'eventselector.selector_title' | translate | uppercase}}</h4>
    </div>
    <button mat-stroked-button (click)="newMeeting()" mat-dialog-close>
    {{'eventselector.new_meeting' | translate}}</button>
    <br>
    <button mat-stroked-button >{{'eventselector.new_reminder' | translate}}</button>
    <br>
    <button mat-stroked-button (click)="onNoClick()">{{'eventselector.close' | translate}}</button>
  `,
  styles: [`
    button {
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
              @Inject(MAT_DIALOG_DATA) private readonly data: DialogData,
              public readonly dialogRef: MatDialogRef<EventReminderSelectorComponent>,
              ) { }

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

  public onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface DialogData {
  event: EventInput;
  user: UserResponse;
  isEmployee: boolean;
}
