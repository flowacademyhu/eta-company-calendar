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
    loadChildren: () => import('./calendar/calendar.module')
      .then((m) => m.CalendarModule),
    path: '',
    pathMatch: 'full',
  },

  {
    component: MainLayoutComponent,
    loadChildren: () => import('./user-management/user-management.module')
      .then((m) => m.UserManagementModule),
    path: 'user-management',
    pathMatch: 'full',
  },
  {
    component: MainLayoutComponent,
    loadChildren: () => import('./my-meetings/my-meetings.module')
      .then((m) => m.MyMeetingsModule),
    path: 'my-meetings',
    pathMatch: 'full',
  },
  {
    component: MainLayoutComponent,
    loadChildren: () => import('./reminder/reminder.module')
      .then((m) => m.ReminderManagerModule),
    path: 'reminders',
    pathMatch: 'full',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
