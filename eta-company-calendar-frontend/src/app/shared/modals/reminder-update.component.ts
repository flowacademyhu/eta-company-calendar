
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { Subject } from 'rxjs';
import { ReminderDetail } from '~/app/models/reminder-detail.model';
import { UserResponse } from '~/app/models/user-response.model';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';
import { AuthService } from '~/app/shared/services/auth.service';
import { MatSnackBar } from '@angular/material';
@Component({
    selector: 'update-reminder-dialog',
    template: `
    <div class="container">
  <form [formGroup]="reminderForm" (ngSubmit)="onSubmit()">
    <div class="d-flex flex-column">

      <div class="d-flex justify-content-center">
        <h4>{{ 'reminder.header' | translate  }}</h4>
      </div>

      <mat-form-field class="alignment">
        <mat-label>{{ 'reminder.title' | translate }} *</mat-label>
        <input matInput formControlName="title" type="text" maxlength="80">
        <mat-error>{{ 'reminder.titleError' | translate }}</mat-error>
      </mat-form-field>

      <mat-form-field class="alignment">
        <mat-label>{{ 'reminder.description' | translate }}</mat-label>
        <textarea matInput formControlName="description" maxlength="255"></textarea>
      </mat-form-field>

      <div class="d-flex align-items-center">
        <mat-form-field>
          <mat-label >{{ 'reminder.startingTime' | translate }} *</mat-label>
          <input
            matInput
            type="datetime" autocomplete="off"
            formControlName="startingTime"
            [owlDateTime]="dt1" [owlDateTimeTrigger]="dt1" >
          <owl-date-time #dt1 [firstDayOfWeek]="1"></owl-date-time>
        </mat-form-field>
        <mat-icon [owlDateTimeTrigger]="dt1">event</mat-icon>

      <div class="d-flex justify-content-between">
        <button mat-stroked-button color="primary" class="btn-block" type="submit" [disabled]="reminderForm.invalid"
        >{{ 'reminder.submitButton' | translate }}</button>
        <button mat-stroked-button class="btn-block" (click)="closeDialog()"
        >{{ 'reminder.cancelButton' | translate }}</button>
      </div>

    </div>
    </div>
  </form>
</div>
    `,
  })

  export class ReminderUpdateComponent implements OnInit {

    private destroy$: Subject<boolean> = new Subject<boolean>();
    private reminderForm: FormGroup;
    protected formMaxStartTime: Date = new Date(Number.MAX_VALUE);
    protected rruleStr: string;
  
    constructor(private readonly api: ApiCommunicationService,
                private readonly auth: AuthService,
                @Inject(MAT_DIALOG_DATA)
                private readonly data: DialogData,
                protected readonly dateTimeAdapter: DateTimeAdapter<object>,
                private readonly dialogRef: MatDialogRef<ReminderUpdateComponent>,
                private readonly translate: TranslateService
                private readonly snackBar: MatSnackBar) { }

    public ngOnInit() {
      this.reminderForm = new FormGroup({
        title: new FormControl(undefined, [Validators.required]),
        description: new FormControl(undefined),
        recurring: new FormControl(undefined),
        startingTime: new FormControl(undefined, [Validators.required]),
      });
      this.dateTimeAdapter.setLocale(this.translate.currentLang);
      this.dialogRef.disableClose = true;
      this.setStartingTimeFromDialogData();
    }

    public onNoClick(): void {
      this.dialogRef.close();
    }

    public openSnackBar(message: string) {
      this.snackBar.open(`${message}`, undefined, {
      duration: 2000
      });
    }

    public updateReminder() {
      return this.reminderService
      .updateReminder(this.id)
      .subscribe(() => {this.openSnackBar(this.translate.instant('reminderlist.snack_delete')),
                        this.reminderService.getRemindersByUserId(this.auth.tokenDetails.getValue().id);
                        this.dialogRef.close(); },
      () => {this.openSnackBar(this.translate.instant('meetinglist.snack_delete_fail')); }
      );
    }

  }
