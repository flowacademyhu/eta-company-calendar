import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MeetingDetail } from '~/app/models/meeting-detail.model';
import { MeetingService } from '~/app/my-meetings/service/meeting.service';
import { DeleteMeetingComponent } from './delete-meeting.component';

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

  <h3>{{'meetinglist.recurring' | translate}}</h3>
  <p *ngIf="meeting.recurring; else noDescription">{{ meeting.recurring }}</p>

  <h3>{{'meetinglist.startingTime' | translate}}</h3>
  <p>{{ meeting.startingTime | date: 'yyyy-MM-dd --- HH:mm' }}</p>

  <h3>{{'meetinglist.finishTime' | translate}}</h3>
  <p>{{ meeting.finishTime | date: 'yyyy-MM-dd --- HH:mm' }}</p>

  <app-attendants
  *ngIf="meeting.requiredAttendants.length > 0 || meeting.optionalAttendants.length > 0"
  [canModify]="false"
  [currentUserId]="meeting.createdByUser"
  [inputRequiredAttendantIds]="meeting.requiredAttendants"
  [inputOptionalAttendantIds]="meeting.optionalAttendants"
  ></app-attendants>

  <h3>{{'meetinglist.createdBy' | translate}}</h3>
  <p *ngIf="meeting.createdBy; else noDescription">{{ meeting.createdBy.name }} - ({{ meeting.createdBy.email }})</p>

  <ng-template #noDescription>{{ 'meeting.noData' | translate }}</ng-template>

</div>
<button mat-stroked-button (click)="openDialogDelete()">
  {{ 'meetinglist.modify' | translate }}</button>
<button mat-stroked-button (click)="openDialogDelete()" class="delete-button">
  {{ 'meetinglist.delete' | translate }}</button>
<button mat-stroked-button (click)="onClose()" class="close-button">
  {{ 'meetinglist.modalClose' | translate }}</button>

	`
})

export class MeetingDetailsModal {

  public meeting: MeetingDetail;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private readonly meetingData: MeetingData,
    public dialogRef: MatDialogRef<MeetingDetailsModal>,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
    public readonly meetingService: MeetingService) {}

    public ngOnInit() {
      this.meeting = this.meetingData.meetingData;
    }

  public onClose(): void {
    this.dialogRef.close();
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
}

export interface MeetingData {
  meetingData: MeetingDetail;
  meetingId: number;
}
