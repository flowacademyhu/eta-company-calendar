import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Location } from '~/app/models/location.model';
import { MeetingDetail } from '~/app/models/meeting-detail.model';
import { UserResponse } from '~/app/models/user-response.model';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';

export interface DialogData {
  startingTime: string;
  finishTime: string;
  user: UserResponse;
}

@Component({
  selector: 'app-meeting-create',
  styleUrls: ['./meeting-create.component.css'],
  templateUrl: './meeting-create.component.html'
})

export class MeetingCreateComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private meetingForm: FormGroup;
  protected locations: string[] = Object.values(Location);
  protected requiredAttendantsList: string[] = [];
  protected optionalAttendantsList: string[] = [];
  protected formMaxStartTime: Date = new Date(Number.MAX_VALUE);
  protected formMinFinishTime: Date = new Date(Number.MIN_VALUE);

  constructor(private readonly api: ApiCommunicationService,
              @Inject(MAT_DIALOG_DATA) private readonly data: DialogData,
              protected readonly dateTimeAdapter: DateTimeAdapter<object>,
              private readonly dialogRef: MatDialogRef<MeetingCreateComponent>,
              private readonly translate: TranslateService) { }

  public ngOnInit() {
    this.meetingForm = new FormGroup({
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
    const startingTime = this.meetingForm.get('startingTime');
    if (this.data && startingTime) {
      startingTime.setValue(new Date(this.data.startingTime));
    }
  }

  protected isOtherLocation(): boolean {
    return this.meetingForm.get('location')?.value === Location.OTHER;
  }

  protected addAttendant(arr: string[]): void {
    const attendantType: string = arr === this.requiredAttendantsList ? 'requiredAttendant' : 'optionalAttendant';
    const attendant = this.meetingForm.get(attendantType);
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
    const timeRange = this.meetingForm.get('timeRange');
    return timeRange && timeRange.hasError('invalidRange');
  }

  private subscribeToStartingTimeChange() {
    const startingTime = this.meetingForm.get('startingTime');
    if (startingTime) {
      startingTime.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((newDate) => this.formMinFinishTime = newDate);
    }
  }

  private subscribeToFinishTimeChange() {
    const startingTime = this.meetingForm.get('finishTime');
    if (startingTime) {
      startingTime.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((newDate) => this.formMaxStartTime = newDate);
    }
  }

  protected onSubmit() {
    if (this.meetingForm.valid) {
      this.getMeetingDetailFromForm();
    }
    this.dialogRef.close();
  }

  protected closeDialog() {
    this.meetingForm.reset();
    this.dialogRef.close();
  }

  private getMeetingDetailFromForm() {
    const meetingDetail: MeetingDetail = this.meetingForm.value;
    meetingDetail.startingTime = meetingDetail.startingTime.valueOf();
    meetingDetail.finishTime = meetingDetail.finishTime.valueOf();
    meetingDetail.requiredAttendants = this.requiredAttendantsList;
    meetingDetail.optionalAttendants = this.optionalAttendantsList;
    meetingDetail.createdBy = this.data.user.email;
    this.api.meeting()
      .create(meetingDetail)
      .subscribe();
  }

  public ngOnDestroy() {
    this.destroy$.next(true);
  }

}
