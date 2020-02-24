import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '~/app/shared/shared.module';
import { ReminderRoutingModule } from '../reminder/reminder-routing.module';
import { ReminderDescriptionComponent } from './components/reminder-description.component';
import { ReminderService } from './service/reminder.service';

@NgModule({
  declarations: [
    ReminderDescriptionComponent,
  ],
  imports: [
    SharedModule,
    ReminderRoutingModule,
    TranslateModule.forChild(),
  ],
  providers: [
    ReminderService,
  ]
})
export class ReminderManagerModule { }
