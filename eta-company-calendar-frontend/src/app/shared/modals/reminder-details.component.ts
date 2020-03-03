import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReminderDetail } from '~/app/models/reminder-detail-model';
import { ReminderService } from '~/app/reminder/service/reminder.service';
import { DeleteReminderComponent } from './delete-reminder.component';

@Component({
  selector: 'reminder-details-modal',
  styleUrls: ['profil-view-dialog.component.scss'],
  template: `
  <h1>
    <p>{{reminder.title}} </p>
</h1>
<div mat-dialog-content>
  <mat-label>{{'reminderlist.description' | translate}}</mat-label>
  <p>{{ reminder.description }}</p>
  <hr/>
  <mat-label>{{'reminderlist.recurring' | translate}}</mat-label>
  <p>{{ reminder.recurring }}</p>
  <hr/>
  <mat-label>{{'reminderlist.startingTime' | translate}}</mat-label>
  <p>{{ reminder.startingTime | date: 'yyyy-MM-dd HH:mm' }}</p>
  <hr/>
</div>
<div mat-dialog-actions>
<button mat-stroked-button (click)="onClose()">{{ 'meetinglist.modalClose' | translate }}</button>
<button mat-stroked-button (click)="openDialogDelete()">{{ 'meetinglist.delete' | translate }}</button>
</div>
	`
})

export class ReminderDetailsModal {

  public reminder: ReminderDetail;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private readonly reminderData: ReminderData,
    public dialogRef: MatDialogRef<ReminderDetailsModal>,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
    public readonly reminderService: ReminderService) {}

    public ngOnInit() {
      this.reminder = this.reminderData.reminderData;
    }

  public onClose(): void {
    this.dialogRef.close();
  }

  public openDialogDelete(): void {
    this.dialog.closeAll();
    this.dialog.open(DeleteReminderComponent, {
      data: this.reminderData.reminderId,
      width: '400px',
    });
  }

  public openSnackBar(message: string) {
    this.snackBar.open(`${message}`, undefined, {
    duration: 2000
    });
  }

}

export interface ReminderData {
  reminderData: ReminderDetail;
  reminderId: number;
}
