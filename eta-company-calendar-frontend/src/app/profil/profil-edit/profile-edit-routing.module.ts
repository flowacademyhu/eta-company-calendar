import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '../../shared/pages/main-layout.component';
import { ProfilEditDialog } from './profil-edit-dialog.component';

const routes: Routes = [
  {
    component: ProfilEditDialog,
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
export class ProfileEditRoutingModule {
}
