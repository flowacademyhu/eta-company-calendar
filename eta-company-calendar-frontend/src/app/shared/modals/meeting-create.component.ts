import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-meeting-create',
  templateUrl: './meeting-create.component.html'
})

export class MeetingCreateComponent implements OnInit {
  private meetingForm: FormGroup;

  constructor(private readonly dialogRef: MatDialogRef<MeetingCreateComponent>) {}

  public ngOnInit() {
    this.meetingForm = new FormGroup({
      title: new FormControl(undefined),
      description: new FormControl(undefined),
      location: new FormControl(undefined),
      otherLocation: new FormControl(undefined),
      recurring: new FormControl(undefined),
      timeFrame: new FormGroup({
        startingTime: new FormControl(undefined),
        finishTime: new FormControl(undefined),
      }),
      requiredAttendants: new FormControl(undefined),
      optionalAttendants: new FormControl(undefined),
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

}
