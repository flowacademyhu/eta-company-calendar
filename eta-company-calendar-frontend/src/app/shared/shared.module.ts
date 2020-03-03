import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '~/app/shared/material.module';
import { MainLayoutComponent } from '~/app/shared/pages/main-layout.component';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';
import { ConfigurationService } from '~/app/shared/services/configuration.service';
import { FooterComponent } from '../footer/components/footer.component';
import { HeaderComponent } from '../header/components/header.component';
import { UserService } from '../user-management/service/user-service';
import { AuthGuard } from './guards/auth.guard';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { DeleteMeetingComponent } from './modals/delete-meeting.component';
import { MeetingDetailsModal } from './modals/meeting-details.component';
import { ProfilViewDialog } from './modals/profil-view-dialog.component';
import { ProfilEditDialog } from './modals/profile-edit-dialog.component';

@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent,
    FooterComponent,
    ProfilViewDialog,
    ProfilEditDialog,
    MeetingDetailsModal,
    DeleteMeetingComponent,
  ],
  entryComponents: [
    ProfilViewDialog,
    MeetingDetailsModal,
    DeleteMeetingComponent,
  ],

  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ProfilViewDialog,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule.forChild(),
    RouterModule,
  ],
  providers: [
    UserService,
    ApiCommunicationService,
    ConfigurationService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true, },
  ],
})
export class SharedModule { }
