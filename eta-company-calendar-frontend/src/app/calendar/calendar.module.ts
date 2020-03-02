import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!
import { TranslateModule } from '@ngx-translate/core';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MeetingService } from '../my-meetings/service/meeting.service';
import { SharedModule } from '../shared/shared.module';
import { CalendarRoutingModule } from './calendar-routing.module';
import { AttendantsComponent } from './components/attendants.component';
import { CalendarComponent } from './components/calendar.component';
import { RecurrenceShowComponent } from './components/recurrence-show.component';
import { EventReminderSelectorComponent } from './modals/event-reminder-selector.component';
import { MeetingCreateComponent } from './modals/meeting-create.component';
import { RecurrenceSelectComponent } from './modals/recurrence-select.component';

@NgModule({
  declarations: [
    CalendarComponent,
    MeetingCreateComponent,
    RecurrenceSelectComponent,
    RecurrenceShowComponent,
    EventReminderSelectorComponent,
    AttendantsComponent,
  ],
  entryComponents: [
    MeetingCreateComponent,
    RecurrenceSelectComponent,
    EventReminderSelectorComponent,
  ],
  imports: [
    SharedModule,
    CalendarRoutingModule,
    TranslateModule.forChild(),
    FullCalendarModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  providers: [
    MeetingService,
  ]
})
export class CalendarModule { }
