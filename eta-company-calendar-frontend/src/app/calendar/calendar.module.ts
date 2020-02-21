import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './components/calendar.component';

import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!
import { MeetingCreateComponent } from './modals/meeting-create.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

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
  ]
})
export class CalendarModule { }
