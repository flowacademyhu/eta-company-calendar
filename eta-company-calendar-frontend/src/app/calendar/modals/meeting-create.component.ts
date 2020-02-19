import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef } from '@angular/material/dialog';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { Location } from '~/app/models/location.model';


@Component({
  selector: 'app-meeting-create',
  styleUrls: ['./meeting-create.component.css'],
  templateUrl: './meeting-create.component.html'
})

export class MeetingCreateComponent implements OnInit {
  private meetingForm: FormGroup;
  protected locations: string[] = Object.values(Location);
  public requiredAttendants: string[] = [];
  protected optionalAttendands: string[];

  constructor(private readonly dialogRef: MatDialogRef<MeetingCreateComponent>,
              protected readonly dateTimeAdapter: DateTimeAdapter<object>) {
    dateTimeAdapter.setLocale('hu');
  }

  public ngOnInit() {
    this.meetingForm = new FormGroup({
      title: new FormControl(undefined),
      description: new FormControl(undefined),
      location: new FormControl(undefined),
      otherLocation: new FormControl(undefined),
      recurring: new FormControl(undefined),
      startingTime: new FormControl(undefined),
      finishTime: new FormControl(undefined),
      attendant: new FormControl(undefined, [Validators.email]),
    });
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  protected onSubmit() {
    if (this.meetingForm.valid) {
      alert('form is valid');
    } else {
      alert('form not valid');
    }
  }

  protected isOtherLocation(): boolean {
    return this.meetingForm.get('location')?.value === Location.OTHER;
  }

  protected addAttendant(event: MatChipInputEvent, arr: string[]): void {
    const attendant = this.meetingForm.get('atendant');
    if (attendant?.valid) {
      console.log(attendant.value);
    } else {
      console.log('not valid');
    }
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      arr.push(value);
    }

    if (input) {
      input.value = '';
    }
  }
  protected removeAttendant(attendant: string, arr: string[]) {
    const index = arr.indexOf(attendant);

    if (index >= 0) {
      arr.splice(index, 1);
    }
  }

}
