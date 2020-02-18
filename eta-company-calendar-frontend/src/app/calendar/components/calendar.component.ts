import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import timeGrigPlugin from '@fullcalendar/timegrid';
import { TranslateService } from '@ngx-translate/core';

import enGbLocale from '@fullcalendar/core/locales/en-gb';
import huLocale from '@fullcalendar/core/locales/hu';

@Component({
  selector: 'app-calendar',
  styleUrls: ['calendar.component.css'],
  templateUrl: 'calendar.component.html'
})

export class CalendarComponent implements AfterViewInit {

  @ViewChild('calendar') public calendarComponent: FullCalendarComponent; // the #calendar in the template

  public calendarPlugins: object[] = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  private calendarEvents: EventInput[] = [
    { title: 'Event Now', start: new Date() },
  ];

  constructor(private readonly translate: TranslateService) {}

  protected handleDateClick(arg) {
    if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
      this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
        title: 'New Event',
        start: arg.date,
        allDay: arg.allDay
      })
    }
  }

  public ngAfterViewInit() {
    this.calendarComponent.getApi()
      .setOption('locales', [huLocale, enGbLocale]);
    this.calendarComponent.getApi()
      .setOption('locale', 'en-gb');
    this.translate.onLangChange.subscribe((params) => {
      this.setCalendarLang(params.lang);
    });
  }

  private setCalendarLang(lang: string) {
    if (lang === 'en') {
      lang = 'en-gb';
    }
    this.calendarComponent.getApi()
      .setOption('locale', lang);
  }

}
