import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!
import { TranslateModule } from '@ngx-translate/core';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { SharedModule } from '../shared/shared.module';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './components/calendar.component';
import { RecurrenceShowComponent } from './components/recurrence-show.component';
import { MeetingCreateComponent } from './modals/meeting-create.component';
import { RecurrenceSelectComponent } from './modals/recurrence-select.component';

@NgModule({
  declarations: [
    CalendarComponent,
    MeetingCreateComponent,
    RecurrenceSelectComponent,
    RecurrenceShowComponent,
  ],
  entryComponents: [
    MeetingCreateComponent,
    RecurrenceSelectComponent,
  ],
  imports: [
    SharedModule,
    CalendarRoutingModule,
    TranslateModule.forChild(),
    FullCalendarModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ]
})
export class CalendarModule { }
