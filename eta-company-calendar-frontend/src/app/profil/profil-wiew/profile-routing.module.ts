import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '../../shared/pages/main-layout.component';
import { ProfilViewDialog } from './components/profil-view-dialog.component';

const routes: Routes = [
  {
    component: ProfilViewDialog,
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
