import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './components/calendar.component';

import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!
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
  ]
})
export class CalendarModule { }
