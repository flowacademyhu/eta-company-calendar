import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '~/app/shared/shared.module';
import { UserManagementRoutingModule } from '../user-management/user-management-routing.module';
import { UserListComponent } from './components/user-list.component';
import { UserManagementDescriptionComponent } from './components/user-management-description.component';
import { NewUserComponent } from './modals/new-user.component';
import { UserService } from './service/user-service';

@NgModule({
  declarations: [
    UserManagementDescriptionComponent,
    NewUserComponent,
    UserListComponent,
  ],
  imports: [
    SharedModule,
    UserManagementRoutingModule,
    TranslateModule.forChild(),
  ],
  providers: [
    UserService,
  ]
})
export class UserManagementModule { }
