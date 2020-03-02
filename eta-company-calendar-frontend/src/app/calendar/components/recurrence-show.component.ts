import { Component, Input, OnChanges } from '@angular/core';
import RRule from 'rrule';

@Component({
  selector: 'app-recurrence-show',
  template: `
  <div class="mt-2 mb-2">
    <div *ngIf="!rruleStr">
      {{ 'recurrenceSelect.showNoRecurrence' | translate }}
    </div>

    <div *ngIf="rruleStr">
      <div>
        {{ 'recurrenceSelect.showRepetition' | translate }}
        : {{ interval }} {{ 'recurrenceSelect.'+frequency | translate }}
      </div>
      <div *ngIf="weekDaysSelected">
        <span>{{ 'recurrenceSelect.showWeekDays' | translate }}:</span>
        <span *ngFor="let day of weekDaysSelected; index as i">
          <span *ngIf="i !== 0">, </span>
          {{ 'recurrenceSelect.'+day | translate }}
        </span>
      </div>
      <div *ngIf="occurrences">
        {{ 'recurrenceSelect.showOccurrences' | translate }}: {{ occurrences }}
      </div>
      <div *ngIf="endDate">
        {{ 'recurrenceSelect.showEndDate' | translate }}: {{ endDate | date }}
      </div>
    </div>
  </div>
  `
})

export class RecurrenceShowComponent implements OnChanges {

  @Input() public rruleStr: string;
  private rrule: RRule;
  protected frequency: string;
  protected interval: number;
  protected weekDaysSelected: string[] | undefined;
  protected occurrences: number | undefined;
  protected endDate: Date | undefined;

  private frequencies: string[] = ['intervalYear', 'intervalMonth', 'invervalWeek', 'intervalDay'];
  private weekDays: string[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  public ngOnChanges() {
    this.setPropertiesFromRrule();
  }

  private setPropertiesFromRrule() {
    if (this.rruleStr) {
      this.rrule = RRule.fromString(this.rruleStr);

      this.frequency = this.frequencies[this.rrule.options.freq];

      this.interval = this.rrule.options.interval;

      if (this.rrule.options.byweekday) {
        this.weekDaysSelected = this.rrule.options.byweekday.sort()
          .map((dayNum) => this.weekDays[dayNum]);
      } else {
        this.weekDaysSelected = undefined;
      }

      if (this.rrule.options.count) {
        this.occurrences = this.rrule.options.count;
      } else {
        this.occurrences = undefined;
      }

      if (this.rrule.options.until) {
        this.endDate = this.rrule.options.until;
      } else {
        this.endDate = undefined;
      }
    }
  }

}
