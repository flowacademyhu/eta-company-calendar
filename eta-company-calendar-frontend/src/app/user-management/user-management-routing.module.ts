import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementDescriptionComponent } from './components/user-management-description.component';

const routes: Routes = [
  {
    component: UserManagementDescriptionComponent,
    path: ''
  },

];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class UserManagementRoutingModule {
}
