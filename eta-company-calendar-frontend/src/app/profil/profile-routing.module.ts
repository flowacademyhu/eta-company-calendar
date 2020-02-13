import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileDescriptionComponent } from './components/profile-description.component';

const routes: Routes = [
  {
    component: ProfileDescriptionComponent,
    path: '',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class ProfileRoutingModule {
}
