import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '~/app/shared/shared.module';
import { MyMeetingsRoutingModule } from '../my-meetings/my-meetings-routing.module';
import { MyMeetingsDescriptionComponent } from './components/my-meetings-description.component';

@NgModule({
  declarations: [
    MyMeetingsDescriptionComponent,
  ],
  imports: [
    SharedModule,
    MyMeetingsRoutingModule,
    TranslateModule.forChild(),
  ]
})
export class UserManagementModule {}