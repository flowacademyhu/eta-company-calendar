import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput, View } from '@fullcalendar/core';
import enGbLocale from '@fullcalendar/core/locales/en-gb';
import huLocale from '@fullcalendar/core/locales/hu';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import rrulePlugin from '@fullcalendar/rrule';
import timeGrigPlugin from '@fullcalendar/timegrid';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MeetingDetail } from '~/app/models/meeting-detail.model';
import { ReminderDetail } from '~/app/models/reminder-detail.model';
import { UserResponse } from '~/app/models/user-response.model';
// import { MeetingDetailsModal } from '~/app/shared/modals/meeting-details.component';
import { ReminderDetailsModal } from '~/app/shared/modals/reminder-details.component';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';
import { AuthService } from '~/app/shared/services/auth.service';
import { EventReminderSelectorComponent } from '../modals/event-reminder-selector.component';

@Component({
  selector: 'app-calendar',
  styles: [`
    .white-background {
      background-color: white;
    }
    .app-calendar {
      margin: 0 auto;
      max-width: 1000px;
    }
  `],
  template: `
  <div class='app-calendar white-background'>
    <full-calendar
      #calendar
      defaultView="dayGridMonth"
      [header]="{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      }"
      [locales]="locales"
      [plugins]="calendarPlugins"
      [events]="calendarEvents"
      (dateClick)="handleDateClick($event)"
      (eventClick)="handleEventClick($event)"
      (eventMouseover)="handleEventClick($event)"
      (datesRender)="onDatesRender($event)"
    ></full-calendar>
  </div>
  `
})

export class CalendarComponent implements AfterViewInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild('calendar') protected calendarComponent: FullCalendarComponent;
  protected calendarEvents: EventInput[] = [];
  protected calendarPlugins: object[] = [dayGridPlugin, timeGrigPlugin, interactionPlugin, rrulePlugin];
  protected currentView: View;
  protected locales: object[] = [enGbLocale, huLocale];

  protected isUserLeader: boolean;
  protected loggedInUser: UserResponse;
  protected selectedUser: UserResponse;
  protected userEmployees$: Observable<UserResponse[]>;
  protected selectedMeeting: MeetingDetail = {} as MeetingDetail;
  protected selectedReminder: ReminderDetail = {} as ReminderDetail;

  constructor(private readonly api: ApiCommunicationService,
              private readonly auth: AuthService,
              private readonly dialog: MatDialog,
              private readonly translate: TranslateService) {
    this.setLoggedInUser();
    this.selectedUser = this.loggedInUser;
    this.fetchEmployeesIfLeader();
  }

  public ngAfterViewInit() {
    this.translate.onLangChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.setCalendarLang(params.lang);
      });
    this.calendarEvents = [];
    this.fetchReminders();
    this.fetchMeetings();

    this.dialog.afterAllClosed
      .pipe(takeUntil(this.destroy$))
      .subscribe((_) => this.fetchReminders())
      ;
  }

  protected handleDateClick(arg: EventInput) {
    this.dialog.open(EventReminderSelectorComponent, {
      width: '250px',
      data: {
        event: arg,
        user: this.selectedUser,
        isEmployee: this.loggedInUser.id !== this.selectedUser.id
      }
    });
  }

/*    protected handleEventClick(arg: EventClickInfo) {
     this.api.meeting()
    .getMeetingById(arg.event.id)
    .subscribe((meeting) => {this.selectedMeeting = meeting;
                             this.dialog.open(MeetingDetailsModal, {
                              data: this.selectedMeeting,
                              width: '400px' } ); }

    );
  } */

   protected handleEventClick(arg: EventClickInfo) {
    this.api.reminder()
   .getReminderById(arg.event.id)
   .subscribe((reminder) => {this.selectedReminder = reminder;
                             this.dialog.open(ReminderDetailsModal, {
                             data: this.selectedReminder,
                             width: '400px' } ); }

   );
 }

  protected onDatesRender(info: DatesRenderInfo) {
    this.currentView = info.view;
    this.fetchMeetings();
  }

  private setCalendarLang(lang: string) {
    if (lang === 'en') {
      lang = 'en-gb';
    }
    this.calendarComponent.getApi()
      .setOption('locale', lang);
  }

  private fetchMeetings() {
    this.api.meeting()
    .getMeetingsByIdAndTimeRange(1, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
    .subscribe((data) => {
      this.calendarEvents = [];
      this.calendarEvents = this.calendarEvents.concat(data.map((meeting) => {
        return {
          id: meeting.id,
          start: meeting.startingTime,
          end: meeting.finishTime,
          title: meeting.title,
          rrule: meeting.rrule?.rrule,
          duration: meeting.rrule?.duration,
        };
      }));
    });
  }

  private setLoggedInUser() {
    const tokenDetails = this.auth.tokenDetails.getValue();
    this.loggedInUser = {
      email: tokenDetails.user_name,
      id: tokenDetails.id,
      role: tokenDetails.authorities[0]
    };
  }

  private fetchEmployeesIfLeader() {
    this.isUserLeader = this.loggedInUser.role === 'LEADER';
    if (this.isUserLeader) {
      this.userEmployees$ = this.api.user()
        .getEmployees(this.loggedInUser.id);
    }
  }
  private fetchReminders() {
    this.api.reminder()
    .getRemindersByIdAndTimeRange(1, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
    .subscribe((data) => {
      this.calendarEvents = [];
      this.calendarEvents = this.calendarEvents.concat(data.map(((reminder) => {
        return {start: reminder.startingTime, title: reminder.title, backgroundColor: 'red'};
      })));
    });
  }
  public ngOnDestroy() {
    this.destroy$.next(true);
  }

}

export interface DatesRenderInfo {
  view: View;
  el: HTMLElement;
}

export interface EventClickInfo {
  event: {id: number};
}
