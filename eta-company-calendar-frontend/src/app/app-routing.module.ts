import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '~/app/shared/pages/main-layout.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    component: MainLayoutComponent,
    loadChildren: () => import('./login/login.module')
      .then((m) => m.LoginModule),
    path: 'login',
    pathMatch: 'full',
  },
  {
    canActivate: [AuthGuard],
    component: MainLayoutComponent,
    loadChildren: () => import('./welcome/welcome.module')
      .then((m) => m.WelcomeModule),
    path: '',
    pathMatch: 'full',
  },
  {
    component: MainLayoutComponent,
    loadChildren: () => import('./profil/profil-wiew/profile.module')
      .then((m) => m.ProfileModule),
    path: 'profiles',
    pathMatch: 'full',
  },
  {
    component: MainLayoutComponent,
    loadChildren: () => import('./user-management/user-management.module')
      .then((m) => m.UserManagementModule),
    path: 'usermanagement',
    pathMatch: 'full',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
