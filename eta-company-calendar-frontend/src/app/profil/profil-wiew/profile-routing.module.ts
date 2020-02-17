import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '../../shared/pages/main-layout.component';
import { ProfileDescriptionComponent } from './components/profile-description.component';

const routes: Routes = [
  {
    component: ProfileDescriptionComponent,
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
export class ProfileRoutingModule {
}
