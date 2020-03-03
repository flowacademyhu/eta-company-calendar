import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ReminderService } from '~/app/reminder/service/reminder.service';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'delete-reminder-dialog',
    template: `
    <div>
    <h1 align="center" mat-dialog-title>{{'deleteReminder.title' | translate}}</h1>
    <mat-dialog-content>{{'deleteReminder.question' | translate}}</mat-dialog-content>
    <br>
      <button mat-raised-button type="button" (click)="deleteReminder()">
      {{'deleteReminder.confirm' | translate}}</button>
      <button mat-raised-button type="button" name="cancel" (click)="onNoClick()"
        class="ml-3">{{'deleteReminder.cancel' | translate}}</button>
    </div>`,
  })

  export class DeleteReminderComponent {

    constructor(@Inject(MAT_DIALOG_DATA)
                private readonly id: number,
                public readonly dialogRef: MatDialogRef<DeleteReminderComponent>,
                private readonly snackBar: MatSnackBar,
                public readonly reminderService: ReminderService,
                private readonly translate: TranslateService,
                private readonly auth: AuthService
                ) {}

    public onNoClick(): void {
      this.dialogRef.close();
    }

    public openSnackBar(message: string) {
      this.snackBar.open(`${message}`, undefined, {
      duration: 2000
      });
    }

    public deleteReminder() {
      return this.reminderService
      .deleteReminder(this.id)
      .subscribe(() => {this.openSnackBar(this.translate.instant('reminderlist.snack_delete')),
                        this.reminderService.getRemindersByUserId(this.auth.tokenDetails.getValue().id);
                        this.dialogRef.close(); },
      () => {this.openSnackBar(this.translate.instant('meetinglist.snack_delete_fail')); }
      );
    }

  }
