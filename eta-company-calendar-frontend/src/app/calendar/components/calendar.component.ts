import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import enGbLocale from '@fullcalendar/core/locales/en-gb';
import huLocale from '@fullcalendar/core/locales/hu';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGrigPlugin from '@fullcalendar/timegrid';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';

import { MatDialog } from '@angular/material/dialog';
// import { MeetingCreateComponent } from '../modals/meeting-create.component';
import { ReminderCreateComponent } from '../modals/reminder-create.component';
// import { ReminderCreateComponent } from '../modals2/reminder-create.component';

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
    ></full-calendar>
  </div>
  `
})

export class CalendarComponent implements AfterViewInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild('calendar') public calendarComponent: FullCalendarComponent;

  public locales: object[] = [enGbLocale, huLocale];

  public calendarPlugins: object[] = [dayGridPlugin, timeGrigPlugin, interactionPlugin];

  private calendarEvents: EventInput[] = [];

  constructor(private readonly translate: TranslateService,
              private readonly api: ApiCommunicationService,
              private readonly dialog: MatDialog) { }

  public ngAfterViewInit() {
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
    this.dialog.open(ReminderCreateComponent, {
      width: '500px',
      data: {startingTime: arg.dateStr}
    });
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
        return {start: meeting.startingTime, end: meeting.finishTime, title: meeting.title};
      }));
    });
  }

  public ngOnDestroy() {
    this.destroy$.next(true);
  }

}
