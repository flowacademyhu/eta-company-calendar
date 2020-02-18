import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '~/app/shared/shared.module';
import { ProfilEditDialog } from '../profil-edit/profil-edit-dialog.component';
import { ProfileRoutingModule } from '../profil-wiew/profile-routing.module';
import { ProfilViewDialog } from './components/profil-view-dialog.component';

@NgModule({
  declarations: [
    ProfilViewDialog,
    ProfilEditDialog,
  ],
  imports: [
    SharedModule,
    ProfileRoutingModule,
    TranslateModule.forChild(),
  ]
})
export class ProfileModule { }
