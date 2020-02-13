import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '~/app/shared/shared.module';
import { ProfileRoutingModule } from '../profil-wiew/profile-routing.module';
import { ProfileDescriptionComponent } from './components/profile-description.component';

@NgModule({
  declarations: [
    ProfileDescriptionComponent,
  ],
  imports: [
    SharedModule,
    ProfileRoutingModule,
    TranslateModule.forChild(),
  ]
})
export class ProfileModule { }
