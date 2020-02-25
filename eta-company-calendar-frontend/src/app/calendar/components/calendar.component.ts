import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput, View } from '@fullcalendar/core';
import enGbLocale from '@fullcalendar/core/locales/en-gb';
import huLocale from '@fullcalendar/core/locales/hu';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGrigPlugin from '@fullcalendar/timegrid';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserResponse } from '~/app/models/user-response.model';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';
import { AuthService } from '~/app/shared/services/auth.service';
import { MeetingCreateComponent } from '../modals/meeting-create.component';
import { MatSelectChange } from '@angular/material';

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
    <mat-card *ngIf="isUserLeader">
      <mat-form-field>
        <mat-label>Select an option</mat-label>
        <mat-select [(value)]="selectedEmployee" (selectionChange)="onSelectChange($event)">
          <mat-option value="loggedInUser">self</mat-option>
          <mat-option
            *ngFor="let employee of (userEmployees$ | async)"
            value="employee"
            >{{ employee.email }}</mat-option>
        </mat-select>
        </mat-form-field>
        <p>{{ selectedEmployee.email }}</p>
    </mat-card>

    <full-calendar
      #calendar
      defaultView="dayGridMonth"
      [header]="{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      }"
      [locales]="locales"
      [firstDay]="1"
      [plugins]="calendarPlugins"
      [events]="calendarEvents"
      [aspectRatio]="1.35"
      (dateClick)="handleDateClick($event)"
      (datesRender)="onDatesRender($event)"
    ></full-calendar>
  </div>
  `
})

export class CalendarComponent implements AfterViewInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild('calendar') public calendarComponent: FullCalendarComponent;

  protected currentView: View;

  public locales: object[] = [enGbLocale, huLocale];

  public calendarPlugins: object[] = [dayGridPlugin, timeGrigPlugin, interactionPlugin];

  private calendarEvents: EventInput[] = [];

  protected loggedInUser: UserResponse;
  protected isUserLeader: boolean;
  protected userEmployees$: Observable<UserResponse[]>;
  protected selectedEmployee: UserResponse;

  constructor(private readonly api: ApiCommunicationService,
              private readonly auth: AuthService,
              private readonly dialog: MatDialog,
              private readonly translate: TranslateService) {
    this.setLoggedInUser();
    this.selectedEmployee = this.loggedInUser;
    this.handleIfLeader();
  }

  public ngAfterViewInit() {
    this.setCalendarLang(this.translate.currentLang);
    this.translate.onLangChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.setCalendarLang(params.lang);
      });

    this.fetchMeetings();

    this.dialog.afterAllClosed
      .pipe(takeUntil(this.destroy$))
      .subscribe((_) => this.fetchMeetings());
  }

  protected handleDateClick(arg: EventInput) {
    this.dialog.open(MeetingCreateComponent, {
      width: '500px',
      data: {startingTime: arg.dateStr}
    });
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
    .getMeetingsByIdAndTimeRange(this.auth.tokenDetails.getValue().id,
                                 this.currentView.activeStart.valueOf(),
                                 this.currentView.activeEnd.valueOf())
    .subscribe((data) => {
      this.calendarEvents = [];
      this.calendarEvents = this.calendarEvents.concat(data.map((meeting) => {
        return {start: meeting.startingTime, end: meeting.finishTime, title: meeting.title};
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

  private handleIfLeader() {
    this.isUserLeader = this.loggedInUser.role === 'LEADER';
    if (this.isUserLeader) {
      this.userEmployees$ = this.api.user()
        .getEmployees(this.loggedInUser.id);
    }
  }

  protected onSelectChange(change: MatSelectChange) {
    console.log('this shit changed yo', change);
    console.log(this.selectedEmployee.email);
  }

  public ngOnDestroy() {
    this.destroy$.next(true);
  }

}

export interface DatesRenderInfo {
  view: View;
  el: HTMLElement;
}
