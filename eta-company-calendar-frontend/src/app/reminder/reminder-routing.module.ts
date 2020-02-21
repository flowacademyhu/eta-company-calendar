import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReminderDescriptionComponent } from './components/reminder-description.component';

const routes: Routes = [
  {
    component: ReminderDescriptionComponent,
    path: ''
  },

];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class ReminderRoutingModule {
}
