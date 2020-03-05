import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { RRule } from 'rrule';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Location } from '~/app/models/location.model';
import { MeetingDetail } from '~/app/models/meeting-detail.model';
import { Recurrence } from '~/app/models/recurrence.model';
import { UserResponse } from '~/app/models/user-response.model';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';
import { RecurrenceDialogData } from '../models/recurrence-dialog-data.model';
import { RecurrenceSelectComponent } from './recurrence-select.component';

export interface DialogData {
  startingTime: string;
  finishTime: string;
  user: UserResponse;
  meetingDetail?: MeetingDetail;
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
  protected requiredAttendantIds: number[] = [];
  protected optionalAttendantIds: number[] = [];
  protected formMinFinishTime: Date = new Date(Number.MIN_VALUE);
  protected rruleStr: string;
  protected modifyMeetingDetail: MeetingDetail;

  constructor(private readonly api: ApiCommunicationService,
              @Inject(MAT_DIALOG_DATA) private readonly data: DialogData,
              protected readonly dateTimeAdapter: DateTimeAdapter<object>,
              private readonly dialog: MatDialog,
              private readonly dialogRef: MatDialogRef<MeetingCreateComponent>,
              private readonly translate: TranslateService) { }

  public ngOnInit() {
    this.meetingForm = new FormGroup({
      title: new FormControl(undefined, [Validators.required]),
      description: new FormControl(undefined),
      location: new FormControl(undefined, [Validators.required]),
      otherLocation: new FormControl(undefined),
      recurring: new FormControl(undefined),
      startingTime: new FormControl(undefined, [Validators.required]),
      finishTime: new FormControl(undefined, [Validators.required]),
      requiredAttendant: new FormControl(undefined, [Validators.email]),
      optionalAttendant: new FormControl(undefined, [Validators.email])
    });
    this.dateTimeAdapter.setLocale(this.translate.currentLang);
    this.dialogRef.disableClose = true;

    if (this.data.meetingDetail) {
      this.modifyMeetingDetail = this.data.meetingDetail;
      this.setFormsFromMeetingDetail(this.data.meetingDetail);
      this.subscribeToStartingTimeChange();
    } else {
      this.subscribeToStartingTimeChange();
      this.setStartingTimeFromDialogData();
    }
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

  protected checkTimeRangeError() {
    const timeRange = this.meetingForm.get('timeRange');
    return timeRange && timeRange.hasError('invalidRange');
  }

  private subscribeToStartingTimeChange() {
    const startingTime = this.meetingForm.get('startingTime');
    if (startingTime) {
      startingTime.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((newDate) => {
        if (!newDate) { return; }
        this.formMinFinishTime = newDate;
        this.meetingForm.get('finishTime')
          ?.setValue(new Date(newDate.valueOf() + 3600000));
      });
    }
  }

  protected onClickRecurrence() {
    const dialogData: RecurrenceDialogData = {
      startingDate: this.meetingForm.get('startingTime')?.value,
      rrule: this.rruleStr
    };
    const dialogRef = this.dialog.open(RecurrenceSelectComponent, {
      width: '500px',
      data: dialogData,
    });
    dialogRef.afterClosed()
    .subscribe((result) => {
      if (result) {
        this.rruleStr = result.rruleStr;
      }
    });
  }

  protected onSubmit() {
    if (this.meetingForm.valid) {
      this.postMeetingDetail();
    }
    this.dialogRef.close();
  }

  protected closeDialog() {
    this.meetingForm.reset();
    this.dialogRef.close();
  }

  private postMeetingDetail() {
    const meetingDetail: MeetingDetail = this.meetingForm.value;
    meetingDetail.startingTime = meetingDetail.startingTime.valueOf();
    meetingDetail.finishTime = meetingDetail.finishTime.valueOf();
    meetingDetail.requiredAttendants = this.requiredAttendantIds;
    meetingDetail.optionalAttendants = this.optionalAttendantIds;
    meetingDetail.createdByUser = this.data.user.id;
    meetingDetail.rrule = this.addRecurrence();
    if (this.modifyMeetingDetail) {
      meetingDetail.id = this.modifyMeetingDetail.id;
      this.api.meeting()
        .update(meetingDetail)
        .subscribe();
    }
    this.api.meeting()
      .create(meetingDetail)
      .subscribe();
  }

  private addRecurrence(): Recurrence | undefined {
    if (!this.rruleStr) {
      return undefined;
    }
    const startingTime = this.meetingForm.get('startingTime')?.value
      .valueOf();
    const finishTime = this.meetingForm.get('finishTime')?.value
      .valueOf();
    const duration = finishTime - startingTime;

    let rrule = RRule.fromString(this.rruleStr);
    if (startingTime !== rrule.options.dtstart.valueOf()) {
      const rruleOptions = rrule.options;
      rruleOptions.dtstart = new Date(startingTime);
      rrule = new RRule(rruleOptions);
    }

    let until = rrule.options.until?.valueOf();
    if (!until && rrule.options.count) {
      until = rrule.all()
        .pop()
        ?.valueOf();
    }
    return {
      dtstart: startingTime,
      rrule: rrule.toString(),
      duration,
    };
  }

  private setFormsFromMeetingDetail(meetingDetail: MeetingDetail) {
    this.meetingForm.get('title')
      ?.setValue(meetingDetail.title);
    this.meetingForm.get('description')
      ?.setValue(meetingDetail.description);
    this.meetingForm.get('location')
      ?.setValue(meetingDetail.location);
    this.meetingForm.get('otherLocation')
      ?.setValue(meetingDetail.otherLocation);

    const recurrence = meetingDetail.rrule;
    if (recurrence) {
      this.rruleStr = recurrence.rrule;
      this.setDatesFromRecurrence(recurrence);
    } else {
      this.meetingForm.get('startingTime')
        ?.setValue(new Date(meetingDetail.startingTime));
      this.meetingForm.get('finishTime')
        ?.setValue(new Date(meetingDetail.finishTime));
    }

    this.requiredAttendantIds.push(...meetingDetail.requiredAttendants);
    this.optionalAttendantIds.push(...meetingDetail.optionalAttendants);
  }

  private setDatesFromRecurrence(rrule: Recurrence) {
    const startingTime = rrule.dtstart;
    const finishTime = rrule.duration ? startingTime + rrule.duration : startingTime;
    this.meetingForm.get('startingTime')
      ?.setValue(new Date(startingTime));
    this.meetingForm.get('finishTime')
      ?.setValue(new Date(finishTime));
  }

  protected getRequiredAttendants(arg: number[]) {
    this.requiredAttendantIds = arg;
  }

  protected getOptionalAttendants(arg: number[]) {
    this.optionalAttendantIds = arg;
  }

  public ngOnDestroy() {
    this.destroy$.next(true);
  }

}
