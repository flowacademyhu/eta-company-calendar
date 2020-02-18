import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '~/app/shared/shared.module';
import { ProfilEditDialog } from './profil-edit-dialog.component';
import { ProfileEditRoutingModule } from './profile-edit-routing.module';

@NgModule({
  declarations: [
    ProfilEditDialog,
  ],
  imports: [
    SharedModule,
    ProfileEditRoutingModule,
    TranslateModule.forChild(),
  ]
})
export class ProfileEditModule { }
