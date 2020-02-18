import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '~/app/shared/shared.module';
import { UserManagementRoutingModule } from '../user-management/user-management-routing.module';
import { UserManagementDescriptionComponent } from './components/user-management-description.component';

@NgModule({
  declarations: [
    UserManagementDescriptionComponent,
  ],
  imports: [
    SharedModule,
    UserManagementRoutingModule,
    TranslateModule.forChild(),
  ]
})
export class UserManagementModule { }
