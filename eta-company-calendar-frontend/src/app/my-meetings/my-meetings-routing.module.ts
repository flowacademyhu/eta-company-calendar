import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyMeetingsDescriptionComponent } from './components/my-meetings-description.component';

const routes: Routes = [
  {
    component: MyMeetingsDescriptionComponent,
    path: ''
  },

];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class MyMeetingsRoutingModule {
}