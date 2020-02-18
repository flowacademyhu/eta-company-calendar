import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import timeGrigPlugin from '@fullcalendar/timegrid';

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
    this.calendarComponent.locales = [huLocale];
    this.calendarComponent.locale = 'hu';
    this.calendarComponent.getApi()
    .setOption('locale', 'hu');
  }

}
