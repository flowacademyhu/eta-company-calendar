import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './components/calendar.component';

@NgModule({
  declarations: [
    CalendarComponent,
  ],
  imports: [
    SharedModule,
    CalendarRoutingModule,
    TranslateModule.forChild(),
  ]
})
export class CalendarModule { }
