import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MeetingDetail } from '~/app/models/meeting-detail.model';
import { MeetingService } from '~/app/my-meetings/service/meeting.service';

@Component({
  selector: 'meeting-details-modal',
  styleUrls: ['profil-view-dialog.component.scss'],
  template: `
  <h1 mat-dialog-title>{{ meeting.title | translate | uppercase }}</h1>
<div mat-dialog-content>

  <mat-label>{{ 'meetinglist.location' | translate }}</mat-label>
  <p>{{ meeting.location }}</p>
  <hr/>

  <mat-label>{{'meetinglist.description' | translate}}</mat-label>
  <p>{{ meeting.description }}</p>
  <hr/>

  <mat-label>{{'meetinglist.recurring' | translate}}</mat-label>
  <p>{{ meeting.recurring }}</p>
  <hr/>

  <mat-label>{{'meetinglist.startingTime' | translate}}</mat-label>
  <p>{{ meeting.startingTime | date: 'yyyy-MM-dd HH:mm' }}</p>
  <hr/>

  <mat-label>{{'meetinglist.finishTime' | translate}}</mat-label>
  <p>{{ meeting.finishTime | date: 'yyyy-MM-dd HH:mm' }}</p>
  <hr/>

  <mat-label>{{'meetinglist.createdBy' | translate}}</mat-label>
  <p>{{ meeting.createdBy.email }}</p>

</div>
<div mat-dialog-actions>
<button mat-stroked-button (click)="onClose()">{{ 'meetinglist.modalClose' | translate }}</button>
</div>
	`
})

export class MeetingDetailsModal {

  public meeting: MeetingDetail;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private readonly meetingData: MeetingDetail,
    public dialogRef: MatDialogRef<MeetingDetailsModal>,
    public readonly meetingService: MeetingService) {}

    public ngOnInit() {
      this.meeting = this.meetingData;
    }

  public onClose(): void {
    this.dialogRef.close();
  }
}
