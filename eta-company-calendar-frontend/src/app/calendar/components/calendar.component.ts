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

import { MatDialog } from '@angular/material/dialog';
import { MeetingCreateComponent } from '../modals/meeting-create.component';

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

  constructor(private readonly translate: TranslateService, private readonly dialog: MatDialog) {}

  public ngAfterViewInit() {
    this.translate.onLangChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.setCalendarLang(params.lang);
      });
  }

  protected handleDateClick(arg: EventInput) {
    this.dialog.open(MeetingCreateComponent, {
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

  public ngOnDestroy() {
    this.destroy$.next(true);
  }

}
