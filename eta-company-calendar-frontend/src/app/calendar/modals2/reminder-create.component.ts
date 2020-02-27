import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { Subject } from 'rxjs';
import { ReminderDetail } from '~/app/models/reminder-detail.model';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';

export interface DialogData {
  startingTime: string;
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

  constructor(private readonly dialogRef: MatDialogRef<ReminderCreateComponent>,
              @Inject(MAT_DIALOG_DATA) private readonly data: DialogData,
              protected readonly dateTimeAdapter: DateTimeAdapter<object>,
              private readonly translate: TranslateService,
              private readonly api: ApiCommunicationService) { }

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
    const reminderDetail: ReminderDetail = this.reminderForm.value;
    reminderDetail.startingTime = reminderDetail.startingTime.valueOf();
    reminderDetail.createdBy = 'user0@test.com';
    this.api.reminder()
      .create(reminderDetail)
      .subscribe();
  }

  public ngOnDestroy() {
    this.destroy$.next(true);
  }

}
