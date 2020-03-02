import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { RRule, Weekday } from 'rrule';
import { RecurrenceDialogData } from '../models/recurrence-dialog-data.model';

@Component({
  selector: 'app-recurrence-select',
  styles: [`
    .mat-icon {
      cursor: pointer;
    }

    .number-input {
      width: 30px;
    }
  `],
  templateUrl: 'recurrence-select.component.html'
})

export class RecurrenceSelectComponent implements OnInit {

  private recurrenceForm: FormGroup;

  protected frequencyTypes: Frequency[] = [
    {name: 'intervalYear', value: RRule.YEARLY },
    {name: 'intervalMonth', value: RRule.MONTHLY },
    {name: 'invervalWeek', value: RRule.WEEKLY },
    {name: 'intervalDay', value: RRule.DAILY },
  ];

  protected weekDays: DayOfWeek[] = [
    { name: 'monday', value: RRule.MO, isSelected: false },
    { name: 'tuesday', value: RRule.TU, isSelected: false },
    { name: 'wednesday', value: RRule.WE, isSelected: false },
    { name: 'thursday', value: RRule.TH, isSelected: false },
    { name: 'friday', value: RRule.FR, isSelected: false },
    { name: 'saturday', value: RRule.SA, isSelected: false },
    { name: 'sunday', value: RRule.SU, isSelected: false },
  ];

  protected endTypes: string[] = ['endTypeOccurrences', 'endTypeDate', 'endTypeNever'];

  protected selectedDays: DayOfWeek[] = [];

  protected startingDate: Date;

  constructor(private readonly dialogRef: MatDialogRef<RecurrenceSelectComponent>,
              @Inject(MAT_DIALOG_DATA) private readonly data: RecurrenceDialogData,
              protected readonly dateTimeAdapter: DateTimeAdapter<object>,
              private readonly translate: TranslateService) { }

  public ngOnInit() {
    this.dateTimeAdapter.setLocale(this.translate.currentLang);

    this.startingDate = this.data.startingDate;

    this.recurrenceForm = new FormGroup({
      frequency: new FormControl(undefined, [Validators.required]),
      interval: new FormControl(undefined, [Validators.required, Validators.min(1)]),
      weekDays: new FormControl([]),
      endType: new FormControl(undefined),
      occurrences: new FormControl(undefined),
      endDate: new FormControl(undefined),
    }, [WeekDaySelectedValidator, EndingSelectedValidator] );

    if (this.data.rrule) {
      this.setValuesFromRRule(this.data.rrule);
    } else {
      this.setDefaultValues();
    }
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

  protected onSubmit() {
    const freq = this.recurrenceForm.get('frequency')?.value;
    const interval = this.recurrenceForm.get('interval')?.value;
    const byweekday = this.getByweekdayFromForm();
    const dtstart = this.data.startingDate;
    const count = this.getCountFromForm();
    const until = this.getUntilFromForm();
    const rrule = new RRule({
      freq, interval, byweekday, dtstart, count, until
    });
    this.dialogRef.close({ rruleStr: rrule.toString() });
  }

  protected onRemove() {
    this.dialogRef.close({ rruleStr: '' });
  }

  private getByweekdayFromForm(): Weekday[] | undefined {
    if (this.recurrenceForm.get('frequency')?.value === RRule.WEEKLY) {
      return this.selectedDays.map((weekday) => weekday.value);
    } else {
      return undefined;
    }
  }

  private getCountFromForm(): number | undefined {
    if (this.recurrenceForm.get('endType')?.value === 'endTypeOccurrences') {
      return this.recurrenceForm.get('occurrences')?.value;
    } else {
      return undefined;
    }
  }

  private getUntilFromForm(): Date | undefined {
    if (this.recurrenceForm.get('endType')?.value === 'endTypeDate') {
      return this.recurrenceForm.get('endDate')?.value;
    } else {
      return undefined;
    }
  }

  private setDefaultValues() {
    this.recurrenceForm.get('frequency')
      ?.setValue(this.frequencyTypes[RRule.WEEKLY].value);

    this.recurrenceForm.get('interval')
      ?.setValue(1);

    this.recurrenceForm.get('endType')
      ?.setValue(this.endTypes[0]);
    this.setEndTypeDefaults();

    const dayOfStartingDate = (this.startingDate.getDay() - 1 < 0) ? 6 : this.startingDate.getDay() - 1;
    this.toggleWeekDay(this.weekDays[dayOfStartingDate]);
  }

  private setEndTypeDefaults() {
    const defaultEndDate = new Date(this.startingDate).setDate(this.startingDate.getDate() + 7);
    this.recurrenceForm.get('endDate')
      ?.setValue(new Date(defaultEndDate));

    this.recurrenceForm.get('occurrences')
      ?.setValue(1);
  }

  private setValuesFromRRule(rruleStr: string) {
    const rrule = RRule.fromString(rruleStr);

    this.recurrenceForm.get('frequency')
      ?.setValue(this.frequencyTypes[rrule.options.freq].value);

    this.recurrenceForm.get('interval')
      ?.setValue(rrule.options.interval);

    if (rrule.options.byweekday) {
      rrule.options.byweekday.forEach((day) => this.toggleWeekDay(this.weekDays[day]));
    }

    this.setEndTypeFromRRule(rrule);
  }

  private setEndTypeFromRRule(rrule: RRule) {
    this.setEndTypeDefaults();

    if (rrule.options.count) {
      this.recurrenceForm.get('endType')
        ?.setValue(this.endTypes[0]);
      this.recurrenceForm.get('occurrences')
        ?.setValue(rrule.options.count);
    } else if (rrule.options.until) {
      this.recurrenceForm.get('endType')
      ?.setValue(this.endTypes[1]);
      this.recurrenceForm.get('endDate')
        ?.setValue(rrule.options.until);
    } else {
      this.recurrenceForm.get('endType')
      ?.setValue(this.endTypes[2]);
    }
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

export const WeekDaySelectedValidator: ValidatorFn = (control: AbstractControl): ValidationErrors => {
  const frequency = control.get('frequency');
  const weekDays = control.get('weekDays');
  return frequency?.value === RRule.WEEKLY && weekDays?.value.length === 0 ? { NoWeekDaySelected: true } : {};
};

export const EndingSelectedValidator: ValidatorFn = (control: AbstractControl): ValidationErrors => {
  const endType = control.get('endType');
  const occurrences = control.get('occurrences');
  const endDate = control.get('endDate');

  switch (endType?.value) {
    case 'endTypeOccurrences':
      return occurrences?.value >= 1 ? {} : { NoOccurrenceSelected : true };
    case 'endTypeDate':
      return endDate?.value ? {} : { NoEndDateSelected: true };
    default:
      return {};
  }
};
