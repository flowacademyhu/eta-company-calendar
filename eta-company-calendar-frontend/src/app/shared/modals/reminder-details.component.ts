import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReminderDetail } from '~/app/models/reminder-detail.model';
import { ReminderService } from '~/app/reminder/service/reminder.service';

@Component({
  selector: 'reminder-details-modal',
  styleUrls: ['profil-view-dialog.component.scss'],
  template: `
  <h1 mat-dialog-title>{{ reminder.title | translate | uppercase }}</h1>
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

  <mat-label>{{'reminderlist.createdBy' | translate}}</mat-label>
  <p>{{ reminder.createdBy.email }}</p>

</div>
<div mat-dialog-actions>
<button mat-stroked-button (click)="onClose()">{{ 'reminderlist.modalClose' | translate }}</button>
</div>
	`
})

export class ReminderDetailsModal {

  public reminder: ReminderDetail;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private readonly reminderData: ReminderDetail,
    public dialogRef: MatDialogRef<ReminderDetailsModal>,
    public readonly reminderService: ReminderService) {}

    public ngOnInit() {
      this.reminder = this.reminderData;
    }

  public onClose(): void {
    this.dialogRef.close();
  }
}
