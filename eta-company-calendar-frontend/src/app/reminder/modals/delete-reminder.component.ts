import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '~/app/shared/services/auth.service';
import { ReminderService } from '../service/reminder.service';

@Component({
    selector: 'delete-user-dialog',
    template: `
    <div>
    <h1 align="center" mat-dialog-title>{{'reminderlist.delete' | translate}}</h1>
    <mat-dialog-content>{{'reminderlist.question' | translate}}</mat-dialog-content>
    <br>
      <button mat-raised-button type="button" (click)="onSubmit()">
      {{'deletemeeting.confirm' | translate}}</button>
      <button mat-raised-button type="button" name="cancel" (click)="onNoClick()"
        class="ml-3">{{'deletemeeting.cancel' | translate}}</button>
    </div>`,
  })

  export class DeleteReminderComponent {

    constructor(@Inject(MAT_DIALOG_DATA)
                private readonly id: number,
                public readonly dialogRef: MatDialogRef<DeleteReminderComponent>,
                public readonly reminderService: ReminderService,
                private readonly snackBar: MatSnackBar,
                private readonly translate: TranslateService,
                private readonly auth: AuthService,
                ) {}

    public onNoClick(): void {
      this.dialogRef.close();
    }

    public openSnackBar(message: string) {
      this.snackBar.open(`${message}`, undefined, {
      duration: 2000
      });
    }

    protected onSubmit() {
      this.reminderService.deleteReminder(this.id)
            .subscribe(() => {this.openSnackBar(this.translate.instant('reminderlist.snack_delete'));
                              this.reminderService.getRemindersByUserId(this.auth.tokenDetails.getValue().id);
                              this.dialogRef.close(); },
            () => {this.openSnackBar(
              this.translate.instant('deleteuser.snack_delete_error'));
              });
    }

  }
