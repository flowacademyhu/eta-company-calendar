import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!
import { TranslateModule } from '@ngx-translate/core';
import { MeetingService } from '../my-meetings/service/meeting.service';
import { ReminderService } from '../reminder/service/reminder.service';
import { SharedModule } from '../shared/shared.module';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './components/calendar.component';
import { EventReminderSelectorComponent } from './modals/event-reminder-selector.component';

@NgModule({
  declarations: [
    CalendarComponent,
    EventReminderSelectorComponent,
  ],
  entryComponents: [
    EventReminderSelectorComponent,
  ],
  imports: [
    SharedModule,
    CalendarRoutingModule,
    TranslateModule.forChild(),
    FullCalendarModule,
  ],
  providers: [
    MeetingService,
    ReminderService,
  ]
})
export class CalendarModule { }
