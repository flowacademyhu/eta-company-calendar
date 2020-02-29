import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput, View } from '@fullcalendar/core';
import enGbLocale from '@fullcalendar/core/locales/en-gb';
import huLocale from '@fullcalendar/core/locales/hu';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import rrulePlugin from '@fullcalendar/rrule';
import timeGrigPlugin from '@fullcalendar/timegrid';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';
import { AuthService } from '~/app/shared/services/auth.service';
import { MeetingCreateComponent } from '../modals/meeting-create.component';
import { RecurrenceSelectComponent } from '../modals/recurrence-select.component';

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
    <button (click)="getRecurrenceComponent()">recurrence component</button>
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

  public calendarPlugins: object[] = [dayGridPlugin, timeGrigPlugin, interactionPlugin, rrulePlugin];

  private calendarEvents: EventInput[] = [];

  constructor(private readonly api: ApiCommunicationService,
              private readonly auth: AuthService,
              private readonly dialog: MatDialog,
              private readonly translate: TranslateService) { }

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

  // test
  protected getRecurrenceComponent() {
    const dialogRef = this.dialog.open(RecurrenceSelectComponent, {
      width: '500px',
      data: {
        startingDate: new Date(),
        rrule: 'DTSTART:20200201T010000Z\nRRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,TU,FR;UNTIL=20210131T000000Z'
      },
    });
    dialogRef.afterClosed()
    .subscribe((result) => {
      console.log('after dialog close:');
      console.log(result);
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
        return {
          start: meeting.startingTime,
          end: meeting.finishTime,
          title: meeting.title,
          rrule: meeting.rrule?.rrule,
          duration: meeting.rrule?.duration,
        };
      }));
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
