import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileDescriptionComponent } from '~/app/profil/components/profile-description.component';
import { ProfileRoutingModule } from '~/app/profil/profile-routing.module';
import { SharedModule } from '~/app/shared/shared.module';

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
