import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RRule, Weekday } from 'rrule';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-recurrence-select',
  templateUrl: 'recurrence-select.component.html'
})

export class RecurrenceSelectComponent implements OnInit {

  private recurrenceForm: FormGroup;

  protected weekDays: DayOfWeek[] = [
    { name: 'M', value: RRule.MO, isSelected: false },
    { name: 'T', value: RRule.TU, isSelected: false },
    { name: 'W', value: RRule.WE, isSelected: false },
    { name: 'T', value: RRule.TH, isSelected: false },
    { name: 'F', value: RRule.FR, isSelected: false },
    { name: 'S', value: RRule.SA, isSelected: false },
    { name: 'S', value: RRule.SU, isSelected: false },
  ];

  protected frequencyTypes: Frequency[] = [
    {name: 'DAY', value: RRule.DAILY },
    {name: 'WEEK', value: RRule.DAILY },
    {name: 'MONTH', value: RRule.DAILY },
    {name: 'YEAR', value: RRule.DAILY },
  ]

  protected selectedDays: DayOfWeek[] = [];

  constructor(private readonly dialogRef: MatDialogRef<RecurrenceSelectComponent>,
              @Inject(MAT_DIALOG_DATA) private readonly data: object) { }

  public ngOnInit() {
    console.log(this.data);
    this.recurrenceForm = new FormGroup({
      frequency: new FormControl(undefined, [Validators.required, Validators.min(1)]),
      interval: new FormControl(undefined, [Validators.required]),
      weekDays: new FormControl([]),
      until: new FormControl(undefined)
    });
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  protected toggleWeekDay(day: DayOfWeek): void {
    const index = this.selectedDays.indexOf(day);

    if (index >= 0) {
      this.selectedDays.splice(index, 1);
    } else {
      this.selectedDays.push(day);
    }
    day.isSelected = !day.isSelected;
  }

}

export interface DayOfWeek {
  name: string;
  isSelected: boolean;
  value: Weekday;
}

export interface Frequency {
  name: string;
  value: number;
}
