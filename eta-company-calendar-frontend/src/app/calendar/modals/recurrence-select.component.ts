import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RRule, Weekday } from 'rrule';

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
    {name: 'WEEK', value: RRule.WEEKLY },
    {name: 'MONTH', value: RRule.MONTHLY },
    {name: 'YEAR', value: RRule.YEARLY },
  ];

  protected selectedDays: DayOfWeek[] = [];

  protected startingDate: Date;

  protected hasEndDate: boolean = true;

  constructor(private readonly dialogRef: MatDialogRef<RecurrenceSelectComponent>,
              @Inject(MAT_DIALOG_DATA) private readonly data: DialogData) { }

  public ngOnInit() {
    console.log(this.data);
    this.startingDate = this.data.startingDate;
    this.recurrenceForm = new FormGroup({
      frequency: new FormControl(undefined, [Validators.required, Validators.min(1)]),
      interval: new FormControl(undefined, [Validators.required]),
      weekDays: new FormControl([]),
      hasEndDate: new FormControl(undefined),
      until: new FormControl(undefined),
    });
    this.recurrenceForm.get('frequency')
      ?.setValue(this.frequencyTypes[1].value);
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

  public onSubmit() {
    console.log(this.recurrenceForm);
    const rrule = new RRule({
      freq: this.recurrenceForm.get('frequency')?.value,
      byweekday: this.selectedDays.map((weekday) => weekday.value),
      dtstart: this.data.startingDate,
      until: this.recurrenceForm.get('until')?.value
    });
    console.log(rrule);
    console.log(rrule.toString());
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

export interface DialogData {
  startingDate: Date;
  duration?: number;
  rrule?: string;
}
