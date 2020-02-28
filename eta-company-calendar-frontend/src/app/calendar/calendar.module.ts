import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!
import { TranslateModule } from '@ngx-translate/core';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MeetingService } from '../my-meetings/service/meeting.service';
import { SharedModule } from '../shared/shared.module';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './components/calendar.component';
import { MeetingCreateComponent } from './modals/meeting-create.component';

@NgModule({
  declarations: [
    CalendarComponent,
    MeetingCreateComponent,
  ],
  entryComponents: [
    MeetingCreateComponent,
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
