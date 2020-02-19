import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '../shared/pages/main-layout.component';
import { UserManagementDescriptionComponent } from './components/user-management-description.component';

const routes: Routes = [
  {
    component: UserManagementDescriptionComponent,
    path: ''},
  {
    component: MainLayoutComponent,
    path: '/',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class UserManagementRoutingModule {
}
