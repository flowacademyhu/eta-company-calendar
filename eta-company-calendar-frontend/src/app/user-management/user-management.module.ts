import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '~/app/shared/shared.module';
import { UserManagementRoutingModule } from '../user-management/user-management-routing.module';
import { UserListComponent } from './components/user-list.component';
import { UserManagementDescriptionComponent } from './components/user-management-description.component';
<<<<<<< HEAD
import { DeleteUserComponent } from './modals/delete-user.component';
=======
>>>>>>> cd8320a77a0b393c4f4e7ee7662588d11b258e24
import { EditUserComponent } from './modals/edit-user.component';
import { NewUserComponent } from './modals/new-user.component';
import { UserService } from './service/user-service';

@NgModule({
  declarations: [
    UserManagementDescriptionComponent,
    NewUserComponent,
    EditUserComponent,
    UserListComponent,
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
