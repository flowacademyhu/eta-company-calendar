import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '~/app/shared/shared.module';
import { WelcomeDescriptionComponent } from '~/app/welcome/components/welcome-description.component';
import { WelcomeRoutingModule } from '~/app/welcome/welcome-routing.module';
import { NewuserComponent } from './components/newuser/newuser.component';

@NgModule({
  declarations: [
    WelcomeDescriptionComponent,
    NewuserComponent,
  ],
  imports: [
    SharedModule,
    WelcomeRoutingModule,
    TranslateModule.forChild(),
  ]
})
export class WelcomeModule { }
