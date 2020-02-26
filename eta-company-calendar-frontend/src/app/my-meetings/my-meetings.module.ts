import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MeetingDetailsModal } from '~/app/shared/modals/meeting-details.component.ts';
import { SharedModule } from '~/app/shared/shared.module';
import { MyMeetingsRoutingModule } from '../my-meetings/my-meetings-routing.module';
import { MyMeetingsDescriptionComponent } from './components/my-meetings-description.component';
import { MeetingService } from './service/meeting.service';

@NgModule({
  declarations: [
    MyMeetingsDescriptionComponent,
    MeetingDetailsModal,
  ],
  imports: [
    SharedModule,
    MyMeetingsRoutingModule,
    TranslateModule.forChild(),
  ],
  providers: [
    MeetingService,
  ]
})
export class MyMeetingsModule {}
