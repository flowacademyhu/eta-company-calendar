import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RRule, Weekday } from 'rrule';

@Component({
  selector: 'app-recurrence-select',
  templateUrl: 'recurrence-select.component.html'
})

export class RecurrenceSelectComponent implements OnInit {
  constructor(private readonly dialogRef: MatDialogRef<RecurrenceSelectComponent>,
              @Inject(MAT_DIALOG_DATA) private readonly data: object) { }

  public ngOnInit() {
    console.log(this.data);
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  protected daysOfWeek: DayOfWeek[] = [
    { name: 'M', value: RRule.MO, isSelected: false },
    { name: 'T', value: RRule.TU, isSelected: false },
    { name: 'W', value: RRule.WE, isSelected: false },
    { name: 'T', value: RRule.TH, isSelected: false },
    { name: 'F', value: RRule.FR, isSelected: false },
    { name: 'S', value: RRule.SA, isSelected: false },
    { name: 'S', value: RRule.SU, isSelected: false },
  ];

  protected selectedDays: DayOfWeek[] = [];

  protected toggleDay(day: DayOfWeek): void {
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
