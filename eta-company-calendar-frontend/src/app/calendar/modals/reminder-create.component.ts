import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Location } from '~/app/models/location.model';
import { ReminderDetail } from '~/app/models/reminder-detail.model';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';
import { AuthService } from '~/app/shared/services/auth.service';

export interface DialogData {
  startingTime: string;
  finishTime: string;
}

@Component({
  selector: 'app-reminder-create',
  styleUrls: ['./reminder-create.component.css'],
  templateUrl: './reminder-create.component.html'
})

export class ReminderCreateComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private reminderForm: FormGroup;
  protected locations: string[] = Object.values(Location);
  protected requiredAttendantsList: string[] = [];
  protected optionalAttendantsList: string[] = [];
  protected formMaxStartTime: Date = new Date(Number.MAX_VALUE);
  protected formMinFinishTime: Date = new Date(Number.MIN_VALUE);

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
      location: new FormControl(undefined),
      otherLocation: new FormControl(undefined),
      recurring: new FormControl(undefined),
      startingTime: new FormControl(undefined, [Validators.required]),
      finishTime: new FormControl(undefined, [Validators.required]),
      requiredAttendant: new FormControl(undefined, [Validators.email]),
      optionalAttendant: new FormControl(undefined, [Validators.email])
    });
    this.dateTimeAdapter.setLocale(this.translate.currentLang);
    this.dialogRef.disableClose = true;
    this.subscribeToStartingTimeChange();
    this.subscribeToFinishTimeChange();
    this.setStartingTimeFromDialogData();
  }

  private setStartingTimeFromDialogData() {
    const startingTime = this.reminderForm.get('startingTime');
    if (this.data && startingTime) {
      startingTime.setValue(new Date(this.data.startingTime));
    }
  }

  protected isOtherLocation(): boolean {
    return this.reminderForm.get('location')?.value === Location.OTHER;
  }

  protected addAttendant(arr: string[]): void {
    const attendantType: string = arr === this.requiredAttendantsList ? 'requiredAttendant' : 'optionalAttendant';
    const attendant = this.reminderForm.get(attendantType);
    if (attendant?.valid) {
      arr.push(attendant.value);
      attendant.reset();
    } else {
      attendant?.markAsTouched();
    }
  }

  protected removeAttendant(attendant: string, arr: string[]) {
    const index = arr.indexOf(attendant);
    if (index >= 0) {
      arr.splice(index, 1);
    }
  }

  protected checkTimeRangeError() {
    const timeRange = this.reminderForm.get('timeRange');
    return timeRange && timeRange.hasError('invalidRange');
  }

  private subscribeToStartingTimeChange() {
    const startingTime = this.reminderForm.get('startingTime');
    if (startingTime) {
      startingTime.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((newDate) => this.formMinFinishTime = newDate);
    }
  }

  private subscribeToFinishTimeChange() {
    const startingTime = this.reminderForm.get('finishTime');
    if (startingTime) {
      startingTime.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((newDate) => this.formMaxStartTime = newDate);
    }
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
    reminderDetail.createdBy = this.auth.tokenDetails.getValue().user_name;
    this.api.reminder()
      .create(reminderDetail)
      .subscribe();
  }

  public ngOnDestroy() {
    this.destroy$.next(true);
  }

}
