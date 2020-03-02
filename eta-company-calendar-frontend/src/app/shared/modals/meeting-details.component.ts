import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
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
<button mat-stroked-button (click)="deleteMeeting()">{{ 'meetinglist.delete' | translate }}</button>
</div>
	`
})

export class MeetingDetailsModal {

  public meeting: MeetingDetail;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private readonly meetingData: MeetingData,
    public dialogRef: MatDialogRef<MeetingDetailsModal>,
    private readonly snackBar: MatSnackBar,
    private readonly translate: TranslateService,
    public readonly meetingService: MeetingService) {}

    public ngOnInit() {
      this.meeting = this.meetingData.meetingData;
    }

  public onClose(): void {
    this.dialogRef.close();
  }

  public deleteMeeting() {
    return this.meetingService
    .deleteMeeting(this.meetingData.meetingId)
    .subscribe(() => {this.openSnackBar(this.translate.instant('meetinglist.snack_delete')),
            this.dialogRef.close(); },
    () => {this.openSnackBar(this.translate.instant('meetinglist.snack_delete_fail')); }
    );
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
