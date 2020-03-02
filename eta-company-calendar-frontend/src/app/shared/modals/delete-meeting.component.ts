import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { MeetingService } from '~/app/my-meetings/service/meeting.service';

@Component({
    selector: 'delete-meeting-dialog',
    template: `
    <div>
    <h1 align="center" mat-dialog-title>{{'deletemeeting.title' | translate}}</h1>
    <mat-dialog-content>{{'deletemeeting.question' | translate}}</mat-dialog-content>
    <br>
      <button mat-raised-button type="button" (click)="deleteMeeting()">
      {{'deletemeeting.confirm' | translate}}</button>
      <button mat-raised-button type="button" name="cancel" (click)="onNoClick()"
        class="ml-3">{{'deletemeeting.cancel' | translate}}</button>
    </div>`,
  })

  export class DeleteMeetingComponent {

    constructor(@Inject(MAT_DIALOG_DATA)
                private readonly id: number,
                public readonly dialogRef: MatDialogRef<DeleteMeetingComponent>,
                private readonly snackBar: MatSnackBar,
                public readonly meetingService: MeetingService,
                private readonly translate: TranslateService,
                ) {}

    public onNoClick(): void {
      this.dialogRef.close();
    }

    public openSnackBar(message: string) {
      this.snackBar.open(`${message}`, undefined, {
      duration: 2000
      });
    }

    public deleteMeeting() {
      return this.meetingService
      .deleteMeeting(this.id)
      .subscribe(() => {this.openSnackBar(this.translate.instant('meetinglist.snack_delete')),
              this.dialogRef.close(); },
      () => {this.openSnackBar(this.translate.instant('meetinglist.snack_delete_fail')); }
      );
    }

  }
