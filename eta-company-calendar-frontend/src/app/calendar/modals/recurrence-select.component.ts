import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { DateTimeAdapter } from 'ng-pick-datetime';
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
  protected endDate: Date;

  constructor(private readonly dialogRef: MatDialogRef<RecurrenceSelectComponent>,
              @Inject(MAT_DIALOG_DATA) private readonly data: DialogData,
              protected readonly dateTimeAdapter: DateTimeAdapter<object>,
              private readonly translate: TranslateService) { }

  public ngOnInit() {
    console.log(this.data);
    this.dateTimeAdapter.setLocale(this.translate.currentLang);

    this.startingDate = this.data.startingDate;

    this.recurrenceForm = new FormGroup({
      frequency: new FormControl(undefined, [Validators.required, Validators.min(1)]),
      interval: new FormControl(undefined, [Validators.required]),
      weekDays: new FormControl([]),
      hasEndDate: new FormControl(undefined),
      until: new FormControl(undefined),
    }, WeekDaySelectedValidator);

    this.setDefaultValues();

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
    this.recurrenceForm.get('weekDays')
      ?.setValue(this.selectedDays.map((d) => d.value));
  }

  public onSubmit() {
    this.getAllErrors();
    const rrule = new RRule({
      freq: this.recurrenceForm.get('frequency')?.value,
      byweekday: this.selectedDays.map((weekday) => weekday.value),
      dtstart: this.data.startingDate,
      until: this.recurrenceForm.get('until')?.value
    });
    this.dialogRef.close(rrule);
  }

  private setDefaultValues() {
    this.recurrenceForm.get('frequency')
      ?.setValue(this.frequencyTypes[1].value);
    this.recurrenceForm.get('interval')
      ?.setValue(1);
    this.recurrenceForm.get('hasEndDate')
      ?.setValue(true);

    const dayOfStartingDate = this.startingDate.getDay() - 1;
    this.toggleWeekDay(this.weekDays[dayOfStartingDate]);
  }

  // test
  private getAllErrors() {
    Object.keys(this.recurrenceForm.controls).forEach((key) => {
      console.log('error: ', key, this.recurrenceForm.get(key)?.errors);
    });
    console.log('form group error: ', this.recurrenceForm.errors);
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

export const WeekDaySelectedValidator: ValidatorFn = (control: AbstractControl): ValidationErrors => {
  const frequency = control.get('frequency');
  const weekDays = control.get('weekDays');
  return frequency?.value === RRule.WEEKLY && weekDays?.value.length === 0 ? { NoWeekDaySelected: true } : {};
};
