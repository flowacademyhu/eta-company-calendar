import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { Subject } from 'rxjs';
import { ReminderCreate } from '~/app/models/reminder-create.model';
import { UserResponse } from '~/app/models/user-response.model';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';
import { AuthService } from '~/app/shared/services/auth.service';

export interface DialogData {
  startingTime: string;
  finishTime: string;
  user: UserResponse;
}

@Component({
  selector: 'app-reminder-create',
  styleUrls: ['./reminder-create.component.css'],
  templateUrl: './reminder-create.component.html'
})

export class ReminderCreateComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private reminderForm: FormGroup;
  protected formMaxStartTime: Date = new Date(Number.MAX_VALUE);
  protected rruleStr: string;

  constructor(private readonly api: ApiCommunicationService,
              private readonly auth: AuthService,
              @Inject(MAT_DIALOG_DATA) private readonly data: DialogData,
              protected readonly dateTimeAdapter: DateTimeAdapter<object>,
              private readonly dialogRef: MatDialogRef<ReminderCreateComponent>,
              private readonly translate: TranslateService) { }

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

  private setStartingTimeFromDialogData() {
    const startingTime = this.reminderForm.get('startingTime');
    if (this.data && startingTime) {
      startingTime.setValue(new Date(this.data.startingTime));
    }
  }

  protected checkTimeRangeError() {
    const timeRange = this.reminderForm.get('timeRange');
    return timeRange && timeRange.hasError('invalidRange');
  }

  protected onSubmit() {
    if (this.reminderForm.valid) {
      this.getreminderDetailFromForm();
    }
    this.dialogRef.close();
  }

  protected closeDialog() {
    this.reminderForm.reset();
    this.dialogRef.close();
  }

  private getreminderDetailFromForm() {
    const reminderCreateModel: ReminderCreate = this.reminderForm.value;
    reminderCreateModel.startingTime = reminderCreateModel.startingTime.valueOf();
    reminderCreateModel.createdBy = this.auth.tokenDetails.getValue().user_name;
    this.api.reminder()
      .postReminder(reminderCreateModel)
      .subscribe();
  }

  public ngOnDestroy() {
    this.destroy$.next(true);
  }

}
