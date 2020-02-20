import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { Location } from '~/app/models/location.model';
import { MeetingDetail } from '~/app/models/meeting-detail.model';

@Component({
  selector: 'app-meeting-create',
  styleUrls: ['./meeting-create.component.css'],
  templateUrl: './meeting-create.component.html'
})

export class MeetingCreateComponent implements OnInit {
  private meetingForm: FormGroup;
  protected locations: string[] = Object.values(Location);
  protected requiredAttendantsList: string[] = [];
  protected optionalAttendantsList: string[] = [];

  constructor(private readonly dialogRef: MatDialogRef<MeetingCreateComponent>,
              protected readonly dateTimeAdapter: DateTimeAdapter<object>,
              private translate: TranslateService) { }

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
  }

  protected onSubmit() {
    if (this.meetingForm.valid) {
      this.getMeetingDetailFromForm();
    }
    this.dialogRef.close();
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

  protected getMaxStartTime() {
    const finishtime = this.meetingForm.get('finishTime')?.value;
    return finishtime ? finishtime : new Date(Number.MAX_VALUE);
  }

  protected getMinFinishTime() {
    const startTime = this.meetingForm.get('startingTime')?.value;
    return startTime ? startTime : new Date(Number.MIN_VALUE);
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
    meetingDetail.createdBy = 'admin1@test.com';
    alert('created event: ' + meetingDetail.title);
  }

}
