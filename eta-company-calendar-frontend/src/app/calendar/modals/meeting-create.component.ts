import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Location } from '~/app/models/location.model';
import { MeetingDetail } from '~/app/models/meeting-detail.model';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';
import { AuthService } from '~/app/shared/services/auth.service';
import { RecurrenceDialogData } from '../models/recurrence-dialog-data.model';
import { RecurrenceSelectComponent } from './recurrence-select.component';
import RRule from 'rrule';
import { Recurrence } from '~/app/models/recurrence.model';

export interface DialogData {
  startingTime: string;
  finishTime: string;
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
  protected rruleStr: string;

  constructor(private readonly api: ApiCommunicationService,
              private readonly auth: AuthService,
              @Inject(MAT_DIALOG_DATA) private readonly data: DialogData,
              protected readonly dateTimeAdapter: DateTimeAdapter<object>,
              private readonly dialog: MatDialog,
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

  protected onClickRecurrence() {
    this.rruleStr = '';
    const dialogData: RecurrenceDialogData = {
      startingDate: new Date(),
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
        this.addRecurrence();
      }
    });
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
    meetingDetail.createdBy = this.auth.tokenDetails.getValue().user_name;
    this.api.meeting()
      .create(meetingDetail)
      .subscribe();
  }

  private addRecurrence() {
    if (!this.rruleStr) {
      return;
    }
    const startingTime = this.meetingForm.get('startingTime')?.value.valueOf();
    const finishTime = this.meetingForm.get('finishTime')?.value.valueOf();
    const duration = finishTime - startingTime;

    const rrule = RRule.fromString(this.rruleStr);
    const until = rrule.options.until;
    console.log(this.rruleStr);
    console.log(rrule);

    const recurrence: Recurrence = {
      dtstart: startingTime,
      rrule: this.rruleStr,
      duration,
    };
    console.log(recurrence);

  }

  public ngOnDestroy() {
    this.destroy$.next(true);
  }

}
