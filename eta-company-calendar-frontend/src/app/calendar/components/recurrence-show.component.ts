import { Component, Input, OnInit } from '@angular/core';
import RRule from 'rrule';

@Component({
  selector: 'app-recurrence-show',
  templateUrl: 'recurrence-show.component.html'
})

export class RecurrenceShowComponent implements OnInit {

  @Input() public rruleStr: string;
  private rrule: RRule;
  protected frequency: string;
  protected interval: number;
  protected weekDaysSelected: string[];
  protected occurrences: number;
  protected endDate: Date;

  private frequencies: string[] = ['intervalYear', 'intervalMonth', 'invervalWeek', 'intervalDay'];
  private weekDays: string[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  public ngOnInit() {
    if (this.rruleStr) {
      this.rrule = RRule.fromString(this.rruleStr);

      this.frequency = this.frequencies[this.rrule.options.freq];

      this.interval = this.rrule.options.interval;

      if (this.rrule.options.byweekday) {
        this.weekDaysSelected = this.rrule.options.byweekday.map((dayNum) => this.weekDays[dayNum]);
      }

      if (this.rrule.options.count) {
        this.occurrences = this.rrule.options.count;
      }

      if (this.rrule.options.until) {
        this.endDate = this.rrule.options.until;
      }

    }
  }

}
