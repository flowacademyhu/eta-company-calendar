import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '~/app/shared/shared.module';
import { UserManagementRoutingModule } from '../user-management/user-management-routing.module';
import { UserManagementDescriptionComponent } from './components/user-management-description.component';
import { DeleteUserComponent } from './modals/delete-user.component';
import { EditUserComponent } from './modals/edit-user.component';
import { NewUserComponent } from './modals/new-user.component';
import { UserService } from './service/user-service';

@NgModule({
  declarations: [
    UserManagementDescriptionComponent,
    NewUserComponent,
    EditUserComponent,
    DeleteUserComponent,
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
