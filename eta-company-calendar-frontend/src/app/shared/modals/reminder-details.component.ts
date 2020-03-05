import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReminderDetail } from '~/app/models/reminder-detail-model';
import { ReminderService } from '~/app/reminder/service/reminder.service';
import { DeleteReminderComponent } from './delete-reminder.component';
// 44 62 80
@Component({
  selector: 'reminder-details-modal',
  styleUrls: ['profil-view-dialog.component.scss'],
  template: `
    <h2 class="reminder-title" align="center">{{reminder.title | uppercase}} </h2>
<div mat-dialog-content>
  <h3 align="center">{{'reminderlist.description' | translate}}</h3>
  <p>{{ reminder.description }}</p>
  <hr/>
  <mat-label>{{'reminderlist.startingTime' | translate}}</mat-label>
  <p>{{ reminder.startingTime | date: 'yyyy-MM-dd --- HH:mm' }}</p>
  <hr/>
</div>
<button mat-stroked-button (click)="onClose()">{{ 'meetinglist.modalClose' | translate }}</button>
<button class="reminder-close-button" mat-stroked-button (click)="openDialogDelete()"
>{{ 'meetinglist.delete' | translate }}</button>
	`
})

export class ReminderDetailsModal {

  public reminder: ReminderDetail;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private readonly reminderData: ReminderDetail,
    public dialogRef: MatDialogRef<ReminderDetailsModal>,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
    public readonly reminderService: ReminderService) {}

    public ngOnInit() {
      this.reminder = this.reminderData;
    }

  public onClose(): void {
    this.dialogRef.close();
  }

  public openDialogDelete(): void {
    this.dialog.closeAll();
    this.dialog.open(DeleteReminderComponent, {
      data: this.reminderData.id,
      width: '400px',
    });
  }

  public openSnackBar(message: string) {
    this.snackBar.open(`${message}`, undefined, {
    duration: 2000
    });
  }

}
