import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { OwlDateTimeIntl, OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MaterialModule } from '~/app/shared/material.module';
import { MainLayoutComponent } from '~/app/shared/pages/main-layout.component';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';
import { ConfigurationService } from '~/app/shared/services/configuration.service';
import { FooterComponent } from '../footer/components/footer.component';
import { HeaderComponent } from '../header/components/header.component';
import { UserService } from '../user-management/service/user-service';
import { AttendantsComponent } from './components/attendants.component';
import { RecurrenceShowComponent } from './components/recurrence-show.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { DeleteMeetingComponent } from './modals/delete-meeting.component';
import { DeleteReminderComponent } from './modals/delete-reminder.component';
import { MeetingCreateComponent } from './modals/meeting-create.component';
import { MeetingDetailsModal } from './modals/meeting-details.component';
import { ProfilViewDialog } from './modals/profil-view-dialog.component';
import { ProfilEditDialog } from './modals/profile-edit-dialog.component';
import { RecurrenceSelectComponent } from './modals/recurrence-select.component';
import { ReminderCreateComponent } from './modals/reminder-create.component';
import { ReminderDetailsModal } from './modals/reminder-details.component';
import { DatetimeButtonText } from './ng-pick-datetime/datetime-button-text';

@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent,
    FooterComponent,
    ProfilViewDialog,
    ProfilEditDialog,
    MeetingDetailsModal,
    ReminderDetailsModal,
    DeleteMeetingComponent,
    DeleteReminderComponent,
    AttendantsComponent,
    RecurrenceShowComponent,
    MeetingCreateComponent,
    RecurrenceSelectComponent,
    ReminderCreateComponent,
  ],
  entryComponents: [
    ProfilViewDialog,
    MeetingDetailsModal,
    ReminderDetailsModal,
    DeleteMeetingComponent,
    MeetingCreateComponent,
    RecurrenceSelectComponent,
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
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  providers: [
    UserService,
    ApiCommunicationService,
    ConfigurationService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true, },
    { provide: OwlDateTimeIntl, useClass: DatetimeButtonText },
  ],
})
export class SharedModule { }
