import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MeetingDetail } from '~/app/models/meeting-detail.model';
import { UserResponse } from '~/app/models/user-response.model';
import { MeetingService } from '~/app/my-meetings/service/meeting.service';
import { AuthService } from '../services/auth.service';
import { DeleteMeetingComponent } from './delete-meeting.component';
import { MeetingCreateComponent } from './meeting-create.component';

@Component({
  selector: 'meeting-details-modal',
  styleUrls: ['profil-view-dialog.component.scss'],
  template: `
  <h1 mat-dialog-title align="center">{{ meeting.title | translate | uppercase }}</h1>
<div mat-dialog-content>

  <h3>{{ 'meetinglist.location' | translate }}</h3>
  <p>{{ 'location.' + meeting.location | translate }}</p>
  <p *ngIf="meeting.otherLocation">{{ meeting.otherLocation }}</p>

  <h3>{{'meeting.description' | translate}}</h3>
  <p *ngIf="meeting.description; else noDescription">{{ meeting.description }}</p>

  <h3>{{'meetinglist.startingTime' | translate}}</h3>
  <p>{{ meeting.startingTime | date: 'yyyy-MM-dd --- HH:mm' }}</p>

  <h3>{{'meetinglist.finishTime' | translate}}</h3>
  <p>{{ meeting.finishTime | date: 'yyyy-MM-dd --- HH:mm' }}</p>

  <div *ngIf="meeting.rrule">
    <app-recurrence-show [rruleStr]="meeting.rrule.rrule"></app-recurrence-show>
  </div>

  <app-attendants
    *ngIf="meeting.requiredAttendants.length > 0 || meeting.optionalAttendants.length > 0"
    [canModify]="false"
    [currentUserId]="meeting.createdByUser"
    [inputRequiredAttendantIds]="meeting.requiredAttendants"
    [inputOptionalAttendantIds]="meeting.optionalAttendants"
    ></app-attendants>

  <ng-template #noDescription>{{ 'meeting.noData' | translate }}</ng-template>

</div>

<div class="d-flex justify-content-between">
  <button mat-stroked-button
  *ngIf="loggedInUser.id === meeting.createdByUser"
  (click)="openDialogModify()"
  >{{ 'meetinglist.modify' | translate }}</button>

  <button mat-stroked-button
  *ngIf="loggedInUser.id === meeting.createdByUser"
  (click)="openDialogDelete()"
  class="delete-button"
  >{{ 'meetinglist.delete' | translate }}</button>

  <div class="flex-grow-1"></div>

  <button mat-stroked-button (click)="onClose()">
    {{ 'meetinglist.modalClose' | translate }}</button>
</div>

	`
})

export class MeetingDetailsModal {

  public meeting: MeetingDetail;
  private loggedInUser: UserResponse;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private readonly meetingData: MeetingData,
    public dialogRef: MatDialogRef<MeetingDetailsModal>,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
    public readonly meetingService: MeetingService,
    private readonly auth: AuthService) {}

    public ngOnInit() {
      this.setLoggedInUser();
      this.meeting = this.meetingData.meetingData;
    }

  public onClose(): void {
    this.dialogRef.close();
  }

  public openDialogModify(): void {
    this.dialog.closeAll();
    this.dialog.open(MeetingCreateComponent, {
      data: { user: this.loggedInUser, meetingDetail: this.meeting },
      width: '500px',
    });
  }

  public openDialogDelete(): void {
    this.dialog.closeAll();
    this.dialog.open(DeleteMeetingComponent, {
      data: this.meetingData.meetingId,
      width: '400px',
    });
  }

  public openSnackBar(message: string) {
    this.snackBar.open(`${message}`, undefined, {
    duration: 2000
    });
  }

  private setLoggedInUser() {
    const tokenDetails = this.auth.tokenDetails.getValue();
    this.loggedInUser = {
      email: tokenDetails.user_name,
      id: tokenDetails.id,
      role: tokenDetails.authorities[0]
    };
  }
}

export interface MeetingData {
  meetingData: MeetingDetail;
  meetingId: number;
}
